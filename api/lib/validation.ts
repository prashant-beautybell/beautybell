import { BLOCKED_EMAIL_DOMAINS } from "./blocked-domains";

const serverDisposableSet = new Set<string>(BLOCKED_EMAIL_DOMAINS);

const EMAIL_FORMAT =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const NAME_RE = /^[a-zA-Z\u00C0-\u024F\s'.-]{2,80}$/;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function getEmailDomain(email: string): string {
  const at = email.lastIndexOf("@");
  return at === -1 ? "" : email.slice(at + 1).toLowerCase();
}

function isDisposableDomain(domain: string): boolean {
  if (!domain) return false;
  if (serverDisposableSet.has(domain)) return true;
  const parts = domain.split(".");
  for (let i = 1; i < parts.length; i++) {
    const parent = parts.slice(i).join(".");
    if (serverDisposableSet.has(parent)) return true;
  }
  return false;
}

function validateEmailFormat(email: string): string | null {
  const value = email.trim();
  if (!value) return "Email is required.";
  if (value.length > 254) return "Email is too long.";
  if (!EMAIL_FORMAT.test(value)) return "Enter a valid email address.";
  return null;
}

export function validateEmail(email: string): string | null {
  const formatError = validateEmailFormat(email);
  if (formatError) return formatError;
  const domain = getEmailDomain(normalizeEmail(email));
  if (isDisposableDomain(domain)) {
    return "Please use a permanent email address (temporary inboxes are not accepted).";
  }
  return null;
}

export function validateName(name: string): string | null {
  const value = name.trim();
  if (!value) return "Name is required.";
  if (!NAME_RE.test(value)) {
    return "Enter a valid name (letters, spaces, hyphens, and apostrophes only).";
  }
  return null;
}

export function validatePhone(phone: string): string | null {
  const value = phone.trim();
  if (!value) return "Phone number is required.";
  if (!/^[\d\s+().-]+$/.test(value)) {
    return "Enter a valid phone number.";
  }
  const digits = value.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) {
    return "Enter a valid phone number (7–15 digits).";
  }
  return null;
}

export function validateMessage(message: string): string | null {
  const value = message.trim();
  if (!value) return "Message is required.";
  if (value.length < 10) return "Message must be at least 10 characters.";
  if (value.length > 5000) return "Message is too long.";
  return null;
}
