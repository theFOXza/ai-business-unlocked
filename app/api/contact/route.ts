/**
 * Contact API Route — Next.js 15 App Router (TypeScript)
 *
 * Required environment variables:
 * RESEND_API_KEY=<your Resend API key>
 * RESEND_FROM_EMAIL=noreply@system.aibusinessunlock.com
 */

import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY!);
  return _resend;
}

const INTERNAL_TO = "foxinnovationsllc@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "noreply@system.aibusinessunlock.com";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ContactBody {
  name: string;
  email: string;
  phone?: string;
  business?: string;
  issue: string;
}

// ─── In-memory rate limiter ───────────────────────────────────────────────────
interface SubmitEntry {
  count: number;
  start: number;
}
const submitMap = new Map<string, SubmitEntry>();
const MAX_SUBMITS = 3;
const WINDOW_MS = 60 * 60 * 1000;

function checkSubmitLimit(ip: string): boolean {
  const now = Date.now();
  const entry = submitMap.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    submitMap.set(ip, { count: 1, start: now });
    return true;
  }
  entry.count++;
  return entry.count <= MAX_SUBMITS;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sanitize(s: unknown, maxLen = 500): string {
  return String(s ?? "")
    .replace(/<[^>]*>/g, "")
    .trim()
    .slice(0, maxLen);
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(request: Request): Promise<Response> {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (!checkSubmitLimit(ip)) {
      return Response.json({ ok: false, error: "Too many submissions" }, { status: 429 });
    }

    const body: ContactBody = await request.json();
    const { name, email, phone, business, issue } = body;

    if (
      !name || sanitize(name).length < 1 ||
      !email || !isValidEmail(sanitize(email)) ||
      !issue || sanitize(issue).length < 1
    ) {
      return Response.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const safeName = sanitize(name);
    const safeEmail = sanitize(email).toLowerCase();
    const safePhone = sanitize(phone);
    const safeBusiness = sanitize(business);
    const safeIssue = sanitize(issue);

    const htmlBody = `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#111827">
      <div style="background:linear-gradient(135deg,#7C3AED,#4C1D95);padding:24px 28px;border-radius:12px 12px 0 0">
        <h2 style="color:#fff;margin:0;font-size:20px">New Workshop Inquiry</h2>
        <p style="color:rgba(255,255,255,.8);margin:4px 0 0;font-size:14px">
          via AI for Business Unlocked chat widget
        </p>
      </div>
      <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-top:none;border-radius:0 0 12px 12px;padding:24px 28px">
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:8px 0;font-weight:700;color:#6D28D9;width:130px;vertical-align:top">Name</td>
            <td style="padding:8px 0;color:#111827">${escHtml(safeName)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-weight:700;color:#6D28D9;vertical-align:top">Email</td>
            <td style="padding:8px 0">
              <a href="mailto:${escHtml(safeEmail)}" style="color:#7C3AED">${escHtml(safeEmail)}</a>
            </td>
          </tr>
          ${safePhone ? `
          <tr>
            <td style="padding:8px 0;font-weight:700;color:#6D28D9;vertical-align:top">Phone</td>
            <td style="padding:8px 0;color:#111827">${escHtml(safePhone)}</td>
          </tr>` : ""}
          ${safeBusiness ? `
          <tr>
            <td style="padding:8px 0;font-weight:700;color:#6D28D9;vertical-align:top">Business</td>
            <td style="padding:8px 0;color:#111827">${escHtml(safeBusiness)}</td>
          </tr>` : ""}
          <tr>
            <td style="padding:8px 0;font-weight:700;color:#6D28D9;vertical-align:top">Question</td>
            <td style="padding:8px 0;color:#111827;white-space:pre-wrap">${escHtml(safeIssue)}</td>
          </tr>
        </table>
        <div style="margin-top:20px;padding-top:16px;border-top:1px solid #E5E7EB;font-size:12px;color:#9CA3AF">
          Submitted via aibusinessunlock.com chat widget
        </div>
      </div>
    </div>`;

    const textBody = [
      "New Workshop Inquiry — AI for Business Unlocked",
      "",
      `Name: ${safeName}`,
      `Email: ${safeEmail}`,
      safePhone ? `Phone: ${safePhone}` : null,
      safeBusiness ? `Business: ${safeBusiness}` : null,
      "",
      "Question / Issue:",
      safeIssue,
    ]
      .filter((l): l is string => l !== null)
      .join("\n");

    const { error: sendError } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: [INTERNAL_TO],
      replyTo: safeEmail,
      subject: `Workshop Inquiry from ${safeName}`,
      html: htmlBody,
      text: textBody,
    });

    if (sendError) {
      console.error("[contact-api] Resend error:", sendError);
      return Response.json({ ok: false, error: "Email failed to send" }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact-api]", err);
    return Response.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}
