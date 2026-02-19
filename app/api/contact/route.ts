import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";
import { insertContactSubmission, initializeDatabase } from "@/lib/db";

// ── Telegram notification ────────────────────────────────────────────────────
async function sendTelegramNotification(fields: {
  name: string;
  email: string;
  companyTitle?: string;
  challenge?: string;
  message: string;
}) {
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn(
      "Telegram notification skipped: TELEGRAM_TOKEN or TELEGRAM_CHAT_ID is not set."
    );
    return;
  }

  const text = [
    "📬 *New contact form submission*",
    "",
    `👤 *Name:* ${fields.name}`,
    `📧 *Email:* ${fields.email}`,
    fields.companyTitle ? `🏢 *Company / Title:* ${fields.companyTitle}` : null,
    fields.challenge ? `⚡ *Challenge:* ${fields.challenge}` : null,
    `💬 *Message:*\n${fields.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Telegram API error:", err);
  }
}
// ────────────────────────────────────────────────────────────────────────────

// Lazy database initialization (better for serverless environments)
let dbInitializationPromise: Promise<void> | null = null;

async function ensureDatabaseInitialized() {
  if (!dbInitializationPromise) {
    dbInitializationPromise = initializeDatabase().catch((error) => {
      console.error("Failed to initialize database:", error);
      dbInitializationPromise = null; // Reset on error so we can retry
      throw error;
    });
  }
  return dbInitializationPromise;
}

// Rate limit configuration: 3 submissions per 15 minutes per IP
const RATE_LIMIT_CONFIG = {
  maxRequests: 3,
  windowMs: 15 * 60 * 1000, // 15 minutes
};

export async function POST(request: NextRequest) {
  try {
    // Check rate limit before processing
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP, RATE_LIMIT_CONFIG);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimitResult.retryAfter?.toString() || "900",
            "X-RateLimit-Limit": RATE_LIMIT_CONFIG.maxRequests.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": new Date(rateLimitResult.resetTime).toISOString(),
          },
        }
      );
    }

    const body = await request.json();
    const { name, email, companyTitle, challenge, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Ensure database is initialized before saving
    await ensureDatabaseInitialized();

    // Save to PostgreSQL database
    try {
      const submission = await insertContactSubmission({
        name,
        email,
        companyTitle: companyTitle || undefined,
        challenge: challenge || undefined,
        message,
      });
      
      console.log("Contact form submission saved to database:", {
        id: submission.id,
        name,
        email,
        createdAt: submission.created_at,
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      // Still return success to user, but log the error
      // In production, you might want to handle this differently
    }

    // Send Telegram notification (non-blocking - errors are logged, not thrown)
    try {
      await sendTelegramNotification({
        name,
        email,
        companyTitle: companyTitle || undefined,
        challenge: challenge || undefined,
        message,
      });
    } catch (tgError) {
      console.error("Telegram notification error:", tgError);
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": RATE_LIMIT_CONFIG.maxRequests.toString(),
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": new Date(rateLimitResult.resetTime).toISOString(),
        },
      }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
