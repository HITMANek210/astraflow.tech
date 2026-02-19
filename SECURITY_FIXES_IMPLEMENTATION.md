# Security Fixes - Implementation Guide

This document provides code examples for implementing the critical security fixes identified in the assessment.

## 1. Fix SSL Certificate Validation

**File:** `lib/db.ts`

```typescript
// Replace lines 19-21
ssl: process.env.NODE_ENV === 'production' 
  ? { rejectUnauthorized: true }
  : { rejectUnauthorized: false }
```

**OR** for Railway/Heroku with proper cert:
```typescript
ssl: {
  rejectUnauthorized: process.env.NODE_ENV === 'production',
  // Railway/Heroku use valid certificates, so this should work
}
```

---

## 2. Add Security Headers

**File:** `next.config.mjs`

```javascript
/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.telegram.org",
      "frame-ancestors 'self'",
    ].join('; ')
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
```

---

## 3. Fix Telegram Markdown Injection

**File:** `app/api/contact/route.ts`

Add this function at the top of the file:

```typescript
function escapeMarkdown(text: string): string {
  if (!text) return '';
  return String(text)
    .replace(/\*/g, '\\*')
    .replace(/_/g, '\\_')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/~/g, '\\~')
    .replace(/`/g, '\\`')
    .replace(/>/g, '\\>')
    .replace(/#/g, '\\#')
    .replace(/\+/g, '\\+')
    .replace(/-/g, '\\-')
    .replace(/=/g, '\\=')
    .replace(/\|/g, '\\|')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\./g, '\\.')
    .replace(/!/g, '\\!');
}
```

Then update the `sendTelegramNotification` function (lines 23-33):

```typescript
const text = [
  "📬 *New contact form submission*",
  "",
  `👤 *Name:* ${escapeMarkdown(fields.name)}`,
  `📧 *Email:* ${escapeMarkdown(fields.email)}`,
  fields.companyTitle ? `🏢 *Company / Title:* ${escapeMarkdown(fields.companyTitle)}` : null,
  fields.challenge ? `⚡ *Challenge:* ${escapeMarkdown(fields.challenge)}` : null,
  `💬 *Message:*\n${escapeMarkdown(fields.message)}`,
]
  .filter(Boolean)
  .join("\n");
```

---

## 4. Add Input Length Validation

**File:** `app/api/contact/route.ts`

Add constants after line 72:

```typescript
const MAX_LENGTHS = {
  name: 100,
  email: 255,
  companyTitle: 200,
  challenge: 100,
  message: 5000,
};
```

Add validation after line 116:

```typescript
// Validate field lengths
if (name.length > MAX_LENGTHS.name) {
  return NextResponse.json(
    { error: `Name must be less than ${MAX_LENGTHS.name} characters` },
    { status: 400 }
  );
}
if (email.length > MAX_LENGTHS.email) {
  return NextResponse.json(
    { error: `Email must be less than ${MAX_LENGTHS.email} characters` },
    { status: 400 }
  );
}
if (companyTitle && companyTitle.length > MAX_LENGTHS.companyTitle) {
  return NextResponse.json(
    { error: `Company/Title must be less than ${MAX_LENGTHS.companyTitle} characters` },
    { status: 400 }
  );
}
if (challenge && challenge.length > MAX_LENGTHS.challenge) {
  return NextResponse.json(
    { error: `Challenge must be less than ${MAX_LENGTHS.challenge} characters` },
    { status: 400 }
  );
}
if (message.length > MAX_LENGTHS.message) {
  return NextResponse.json(
    { error: `Message must be less than ${MAX_LENGTHS.message} characters` },
    { status: 400 }
  );
}
```

**File:** `components/contact-form.tsx`

Add `maxLength` attributes to inputs:

```tsx
<input
  type="text"
  id="name"
  name="name"
  value={formData.name}
  onChange={handleChange}
  required
  maxLength={100}
  // ... rest of props
/>

<input
  type="email"
  id="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  required
  maxLength={255}
  // ... rest of props
/>

<input
  type="text"
  id="companyTitle"
  name="companyTitle"
  value={formData.companyTitle}
  onChange={handleChange}
  maxLength={200}
  // ... rest of props
/>

<textarea
  id="message"
  name="message"
  value={formData.message}
  onChange={handleChange}
  required
  rows={6}
  maxLength={5000}
  // ... rest of props
/>
```

---

## 5. Add Input Sanitization

**Install package:**
```bash
npm install isomorphic-dompurify
npm install --save-dev @types/dompurify
```

**File:** `app/api/contact/route.ts`

Add import at top:
```typescript
import DOMPurify from 'isomorphic-dompurify';
```

Add sanitization function:
```typescript
function sanitizeInput(input: string | undefined): string {
  if (!input) return '';
  return DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  }).trim();
}
```

Update validation section (after line 98):
```typescript
const body = await request.json();
let { name, email, companyTitle, challenge, message } = body;

// Sanitize all inputs
name = sanitizeInput(name);
email = sanitizeInput(email);
companyTitle = sanitizeInput(companyTitle);
challenge = sanitizeInput(challenge);
message = sanitizeInput(message);
```

---

## 6. Add Request Size Limiting

**File:** `app/api/contact/route.ts`

Add at the beginning of POST function (after line 75):

```typescript
const MAX_BODY_SIZE = 1024 * 10; // 10KB
const contentLength = request.headers.get('content-length');
if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
  return NextResponse.json(
    { error: "Request body too large" },
    { status: 413 }
  );
}
```

---

## 7. Add Content-Type Validation

**File:** `app/api/contact/route.ts`

Add after request size check:

```typescript
const contentType = request.headers.get('content-type');
if (!contentType?.includes('application/json')) {
  return NextResponse.json(
    { error: "Content-Type must be application/json" },
    { status: 415 }
  );
}
```

---

## 8. Improve Error Handling

**File:** `app/api/contact/route.ts`

Update error handling (lines 137-141, 168-172):

```typescript
} catch (dbError) {
  console.error("Database error:", dbError);
  // Don't expose database errors to client
  // In production, you might want to use a monitoring service
  // Still return success to user to prevent information disclosure
}

// ... and at the bottom:

} catch (error) {
  console.error("Contact form error:", error);
  // Generic error message - don't leak details
  return NextResponse.json(
    { error: "An error occurred while processing your request. Please try again later." },
    { status: 500 }
  );
}
```

---

## 9. Add Honeypot Field (Bot Protection)

**File:** `components/contact-form.tsx`

Add hidden field in form (after line 74, before first visible input):

```tsx
{/* Honeypot field - hidden from users, bots will fill it */}
<input
  type="text"
  name="website"
  tabIndex={-1}
  autoComplete="off"
  style={{ position: 'absolute', left: '-9999px' }}
  aria-hidden="true"
/>
```

**File:** `app/api/contact/route.ts`

Add validation after line 98:

```typescript
const body = await request.json();
const { name, email, companyTitle, challenge, message, website } = body;

// Honeypot check - if filled, it's a bot
if (website) {
  // Log for monitoring but return success to avoid revealing the honeypot
  console.warn("Bot detected via honeypot field");
  return NextResponse.json(
    { message: "Message sent successfully" },
    { status: 200 }
  );
}
```

---

## 10. Improve IP Address Validation

**File:** `lib/rate-limit.ts`

Update `getClientIP` function to be more secure:

```typescript
export function getClientIP(request: Request): string {
  // Priority order for trusted headers
  // Note: In production behind a proxy, configure your proxy to set these correctly
  
  // Cloudflare
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Netlify
  const netlifyIP = request.headers.get("x-nf-client-connection-ip");
  if (netlifyIP) {
    return netlifyIP;
  }

  // Standard proxy headers (be careful - can be spoofed)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    // In production, you should validate this is from a trusted proxy
    const firstIP = forwarded.split(",")[0].trim();
    // Basic IP validation
    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(firstIP)) {
      return firstIP;
    }
  }

  const realIP = request.headers.get("x-real-ip");
  if (realIP && /^(\d{1,3}\.){3}\d{1,3}$/.test(realIP)) {
    return realIP;
  }

  // Fallback - use a default identifier for rate limiting
  // This is not ideal but better than "unknown"
  return "fallback-ip";
}
```

---

## Quick Installation Commands

```bash
# Install sanitization library
npm install isomorphic-dompurify
npm install --save-dev @types/dompurify

# Run security audit
npm audit

# Fix auto-fixable vulnerabilities
npm audit fix
```

---

## Testing Your Fixes

1. **Test SSL:** Verify database connection works with `rejectUnauthorized: true`
2. **Test Headers:** Use browser DevTools → Network → check Response Headers
3. **Test Markdown Injection:** Submit form with `*bold*` in name field, verify it's escaped in Telegram
4. **Test Length Limits:** Try submitting form with very long inputs
5. **Test Honeypot:** Fill the hidden `website` field, verify it's rejected
6. **Test Rate Limiting:** Submit form 4 times quickly, verify 4th is blocked

---

## Additional Recommendations

1. **Set up monitoring:** Use Sentry or similar for error tracking
2. **Regular audits:** Run `npm audit` weekly
3. **Dependency updates:** Keep dependencies up to date
4. **Security headers testing:** Use https://securityheaders.com to test
5. **Rate limiting:** Consider upgrading to Redis-based rate limiting for production
