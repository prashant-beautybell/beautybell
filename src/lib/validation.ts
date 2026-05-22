import {
  COMMON_DISPOSABLE_DOMAINS,
  normalizeEmail,
  validateEmailNotDisposable,
  validateMessage,
  validateName,
  validatePhone,
} from "../../lib/validation.shared";

const clientDisposableSet = new Set<string>(COMMON_DISPOSABLE_DOMAINS);

export { normalizeEmail, validateMessage, validateName, validatePhone };

export function contactReadyForCaptcha(fields: {
  name: string;
  email: string;
  phone: string;
}): boolean {
  return (
    validateName(fields.name) === null &&
    validatePhone(fields.phone) === null &&
    validateEmail(fields.email) === null
  );
}

export function validateEmail(email: string): string | null {
  return validateEmailNotDisposable(email, clientDisposableSet);
}

export function validateEmailForNewsletter(email: string): string | null {
  return validateEmail(email);
}
