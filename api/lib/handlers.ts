import { readJsonBody, sendSlackMessage } from "./slack";
import { verifyTurnstileToken } from "./turnstile";
import {
  normalizeEmail,
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
} from "./validation";

export type ApiResult = { status: number; body: Record<string, unknown> };

function parseBody(body: unknown): Record<string, unknown> | null {
  if (typeof body === "string") {
    try {
      return JSON.parse(body) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
  return readJsonBody(body);
}

export async function handleContactSubmission(
  rawBody: unknown
): Promise<ApiResult> {
  const body = parseBody(rawBody);
  const captcha = await verifyTurnstileToken(body?.captchaToken);
  if (!captcha.ok) {
    return { status: 400, body: { error: captcha.error } };
  }

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const source =
    typeof body?.source === "string" && body.source.trim()
      ? body.source.trim()
      : "Contact page";

  const nameError = validateName(name);
  if (nameError) return { status: 400, body: { error: nameError } };

  const emailError = validateEmail(email);
  if (emailError) return { status: 400, body: { error: emailError } };

  const phoneError = validatePhone(phone);
  if (phoneError) return { status: 400, body: { error: phoneError } };

  const messageError = validateMessage(message);
  if (messageError) return { status: 400, body: { error: messageError } };

  try {
    await sendSlackMessage("New Beauty Bell contact form submission", {
      Name: name,
      Email: normalizeEmail(email),
      Phone: phone,
      Message: message,
      Source: source,
    });
    return { status: 200, body: { ok: true } };
  } catch (error) {
    console.error("Contact form Slack error:", error);
    const message =
      error instanceof Error && error.message.includes("SLACK_WEBHOOK_URL")
        ? "Slack webhook is not configured on the server."
        : "Unable to send message. Please try again.";
    return { status: 500, body: { error: message } };
  }
}

export async function handleNewsletterSubmission(
  rawBody: unknown
): Promise<ApiResult> {
  const body = parseBody(rawBody);
  const captcha = await verifyTurnstileToken(body?.captchaToken);
  if (!captcha.ok) {
    return { status: 400, body: { error: captcha.error } };
  }

  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const emailError = validateEmail(email);
  if (emailError) return { status: 400, body: { error: emailError } };

  try {
    await sendSlackMessage("New Beauty Bell newsletter signup", {
      Email: normalizeEmail(email),
      Source: "Footer newsletter",
    });
    return { status: 200, body: { ok: true } };
  } catch (error) {
    console.error("Newsletter Slack error:", error);
    const message =
      error instanceof Error && error.message.includes("SLACK_WEBHOOK_URL")
        ? "Slack webhook is not configured on the server."
        : "Unable to subscribe. Please try again.";
    return { status: 500, body: { error: message } };
  }
}
