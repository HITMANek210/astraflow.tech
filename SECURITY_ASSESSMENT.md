# Security Assessment Report
**Project:** Astraflow.tech Portfolio  
**Date:** 2024  
**Assessment Type:** Security Review & Penetration Testing Analysis

---

## Executive Summary

This Next.js portfolio application with a contact form API has several security vulnerabilities that need immediate attention. While the application uses parameterized queries (preventing SQL injection) and implements basic rate limiting, there are critical issues with input validation, security headers, SSL configuration, and potential injection attacks.

**Risk Level:** **MEDIUM-HIGH**

---

## Critical Issues (Fix Immediately)

### 1. **SSL Certificate Validation Disabled** 🔴 CRITICAL
**Location:** `lib/db.ts:20`
```typescript
ssl: {
  rejectUnauthorized: false, // ⚠️ SECURITY RISK
}
```

**Issue:** Disabling SSL certificate validation makes the application vulnerable to Man-in-the-Middle (MITM) attacks.

**Impact:** Attackers could intercept database connections and steal credentials.

**Recommendation:**
```typescript
ssl: process.env.NODE_ENV === 'production' 
  ? { rejectUnauthorized: true }
  : { rejectUnauthorized: false }
```

**OR** Use proper certificate validation:
```typescript
ssl: {
  rejectUnauthorized: true,
  ca: process.env.DATABASE_CA_CERT, // If using custom CA
}
```

---

### 2. **Missing Security Headers** 🔴 CRITICAL
**Location:** `next.config.mjs`

**Issue:** No security headers configured, leaving the application vulnerable to:
- XSS attacks
- Clickjacking
- MIME type sniffing
- Protocol downgrade attacks

**Recommendation:** Add security headers in `next.config.mjs`:
```javascript
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
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.telegram.org;"
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

### 3. **Telegram Markdown Injection** 🔴 CRITICAL
**Location:** `app/api/contact/route.ts:23-33`

**Issue:** User input is directly inserted into Telegram Markdown without escaping, allowing:
- Formatting manipulation
- Potential command injection if Telegram bot has additional commands
- Message spoofing

**Example Attack:**
```
Name: *Admin*
Message: *This is a fake admin message*
```

**Recommendation:** Escape Markdown special characters:
```typescript
function escapeMarkdown(text: string): string {
  return text
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

---

### 4. **No Input Length Validation** 🟠 HIGH
**Location:** `app/api/contact/route.ts`, `components/contact-form.tsx`

**Issue:** No maximum length limits on form fields, allowing:
- Database DoS (storing extremely long strings)
- Memory exhaustion
- Telegram API payload limits

**Recommendation:** Add length validation:
```typescript
const MAX_LENGTHS = {
  name: 100,
  email: 255,
  companyTitle: 200,
  challenge: 100,
  message: 5000,
};

// In route.ts validation
if (name.length > MAX_LENGTHS.name) {
  return NextResponse.json({ error: "Name too long" }, { status: 400 });
}
// ... repeat for other fields
```

And add `maxLength` attributes to form inputs.

---

### 5. **In-Memory Rate Limiting (Not Production-Ready)** 🟠 HIGH
**Location:** `lib/rate-limit.ts`

**Issue:** 
- Rate limiting resets on server restart
- Doesn't work across multiple server instances (serverless)
- IP can be spoofed via headers
- Memory can be exhausted with many unique IPs

**Recommendation:** Use Redis or Upstash for distributed rate limiting:
```typescript
// Use @upstash/ratelimit or similar
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "15 m"),
});
```

---

## High Priority Issues

### 6. **Missing CSRF Protection** 🟠 HIGH
**Location:** `app/api/contact/route.ts`

**Issue:** No CSRF token validation, allowing attackers to submit forms on behalf of users.

**Recommendation:** Next.js 13+ has built-in CSRF protection for API routes, but ensure:
- Only POST requests are accepted
- Origin/Referer header validation for additional protection
- Consider adding explicit CSRF tokens for extra security

---

### 7. **IP Address Spoofing Vulnerability** 🟠 HIGH
**Location:** `lib/rate-limit.ts:89-110`

**Issue:** Trusting `x-forwarded-for` header without validation allows attackers to bypass rate limiting by spoofing IPs.

**Recommendation:**
- Only trust headers from known proxies (Netlify, Cloudflare, etc.)
- Use a combination of headers and validate against known proxy IPs
- Consider using a service that provides real IP (e.g., Cloudflare Workers)

---

### 8. **No Input Sanitization** 🟠 HIGH
**Location:** `app/api/contact/route.ts`

**Issue:** User input is stored directly without sanitization, potentially allowing:
- XSS if data is displayed later
- Database corruption
- Injection attacks

**Recommendation:** Sanitize all inputs:
```typescript
import DOMPurify from 'isomorphic-dompurify';

const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  }).trim();
};
```

---

### 9. **Error Information Disclosure** 🟡 MEDIUM
**Location:** `app/api/contact/route.ts:137-141, 168-172`

**Issue:** Error messages might leak sensitive information:
- Database errors could reveal schema
- Stack traces in production
- Internal error details

**Recommendation:**
- Use generic error messages in production
- Log detailed errors server-side only
- Don't expose database errors to clients

---

### 10. **No Request Size Limiting** 🟡 MEDIUM
**Location:** `app/api/contact/route.ts:98`

**Issue:** No limit on request body size, allowing DoS attacks.

**Recommendation:** Add body size validation:
```typescript
const MAX_BODY_SIZE = 1024 * 10; // 10KB
const contentLength = request.headers.get('content-length');
if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
  return NextResponse.json({ error: "Request too large" }, { status: 413 });
}
```

---

## Medium Priority Issues

### 11. **Weak Email Validation** 🟡 MEDIUM
**Location:** `app/api/contact/route.ts:110-116`

**Issue:** Simple regex doesn't validate email properly (RFC 5322).

**Recommendation:** Use a proper email validation library:
```typescript
import validator from 'validator';

if (!validator.isEmail(email)) {
  return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
}
```

---

### 12. **No Honeypot Field** 🟡 MEDIUM
**Location:** `components/contact-form.tsx`

**Issue:** No bot protection beyond rate limiting.

**Recommendation:** Add a hidden honeypot field:
```tsx
<input
  type="text"
  name="website"
  style={{ display: 'none' }}
  tabIndex={-1}
  autoComplete="off"
/>
```

Reject submissions if this field is filled.

---

### 13. **Missing Content-Type Validation** 🟡 MEDIUM
**Location:** `app/api/contact/route.ts:98`

**Issue:** No validation that request is actually JSON.

**Recommendation:**
```typescript
const contentType = request.headers.get('content-type');
if (!contentType?.includes('application/json')) {
  return NextResponse.json({ error: "Invalid content type" }, { status: 415 });
}
```

---

### 14. **Database Connection Pool Security** 🟡 MEDIUM
**Location:** `lib/db.ts`

**Issue:** 
- No connection timeout
- No max connections limit
- Error handling could leak connection info

**Recommendation:**
```typescript
pool = new Pool({
  connectionString,
  max: 20, // Maximum pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: { rejectUnauthorized: true },
});
```

---

### 15. **No Dependency Vulnerability Scanning** 🟡 MEDIUM
**Location:** `package.json`

**Issue:** No automated security scanning for known vulnerabilities.

**Recommendation:**
- Add `npm audit` to CI/CD
- Use Dependabot or Snyk
- Regularly update dependencies

---

## Low Priority / Best Practices

### 16. **Environment Variable Validation**
Add runtime validation for required environment variables:
```typescript
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  TELEGRAM_TOKEN: z.string().min(1),
  TELEGRAM_CHAT_ID: z.string().min(1),
});

export const env = envSchema.parse(process.env);
```

### 17. **Logging Security**
- Don't log sensitive data (passwords, tokens, full request bodies)
- Use structured logging
- Implement log rotation

### 18. **Database Indexes**
Consider adding indexes for:
- Rate limiting lookups
- Email searches (already exists ✓)
- Created_at queries (already exists ✓)

### 19. **API Versioning**
Consider versioning API routes (`/api/v1/contact`) for future changes.

### 20. **Monitoring & Alerting**
- Set up error monitoring (Sentry, etc.)
- Monitor rate limit violations
- Alert on suspicious patterns

---

## Testing Recommendations

1. **Penetration Testing:**
   - Test SQL injection (should be safe with parameterized queries)
   - Test XSS in stored data
   - Test CSRF attacks
   - Test rate limit bypass
   - Test input validation bypass

2. **Automated Security Scanning:**
   - OWASP ZAP
   - Burp Suite
   - npm audit
   - Snyk

3. **Code Review Checklist:**
   - ✅ All user inputs validated
   - ✅ All user inputs sanitized
   - ✅ SQL injection prevented
   - ✅ XSS prevented
   - ✅ CSRF protection
   - ✅ Rate limiting
   - ✅ Security headers
   - ✅ Error handling
   - ✅ Secrets management

---

## Priority Action Plan

### Week 1 (Critical)
1. Fix SSL certificate validation
2. Add security headers
3. Fix Telegram Markdown injection
4. Add input length validation

### Week 2 (High Priority)
5. Implement distributed rate limiting
6. Add CSRF protection
7. Fix IP spoofing vulnerability
8. Add input sanitization

### Week 3 (Medium Priority)
9. Improve error handling
10. Add request size limiting
11. Improve email validation
12. Add honeypot field

---

## Conclusion

The application has a solid foundation with parameterized queries and basic rate limiting, but requires immediate attention to security headers, input validation, and SSL configuration. Implementing the critical and high-priority fixes will significantly improve the security posture.

**Overall Security Score:** 6/10

**Recommendation:** Address all Critical and High Priority issues before production deployment.
