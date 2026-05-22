import { useId, useState, type FormEvent } from "react";
import { submitContactForm } from "../../lib/forms";
import {
  contactReadyForCaptcha,
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
} from "../../lib/validation";
import { Button } from "../ui/Button";
import { TurnstileWidget } from "./TurnstileWidget";

const inputClass =
  "w-full border border-ink/15 bg-transparent px-4 py-3 font-sans text-sm outline-none focus:border-champagne focus:ring-1 focus:ring-champagne/20";

const fieldErrorClass = "mt-1.5 font-sans text-xs text-brand";

interface ContactFormProps {
  className?: string;
  source?: string;
  idPrefix?: string;
  variant?: "default" | "compact";
}

type FieldKey = "name" | "email" | "phone" | "message";

export function ContactForm({
  className = "",
  source = "Contact page",
  idPrefix: idPrefixProp,
  variant = "default",
}: ContactFormProps) {
  const autoId = useId().replace(/:/g, "");
  const idPrefix = idPrefixProp ?? autoId;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, string>>>(
    {}
  );
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);

  const isCompact = variant === "compact";
  const showCaptcha = contactReadyForCaptcha(fields);
  const canSubmit =
    showCaptcha &&
    !!captchaToken &&
    validateMessage(fields.message) === null &&
    status !== "loading";

  function updateField(key: FieldKey, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function validateField(key: FieldKey): string | null {
    switch (key) {
      case "name":
        return validateName(fields.name);
      case "email":
        return validateEmail(fields.email);
      case "phone":
        return validatePhone(fields.phone);
      case "message":
        return validateMessage(fields.message);
      default:
        return null;
    }
  }

  function handleBlur(key: FieldKey) {
    const error = validateField(key);
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (error) next[key] = error;
      else delete next[key];
      return next;
    });
  }

  function validateAll(): boolean {
    const errors: Partial<Record<FieldKey, string>> = {};
    (["name", "email", "phone", "message"] as const).forEach((key) => {
      const err = validateField(key);
      if (err) errors[key] = err;
    });
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    if (!validateAll()) return;
    if (!showCaptcha) return;
    if (!captchaToken) {
      setErrorMessage("Please complete the captcha.");
      return;
    }

    setStatus("loading");

    try {
      await submitContactForm({
        name: fields.name.trim(),
        email: fields.email.trim(),
        phone: fields.phone.trim(),
        message: fields.message.trim(),
        source,
        captchaToken,
      });
      setStatus("success");
      setFields({ name: "", email: "", phone: "", message: "" });
      setFieldErrors({});
      setCaptchaToken("");
      setCaptchaKey((k) => k + 1);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setCaptchaToken("");
      setCaptchaKey((k) => k + 1);
    }
  }

  if (status === "success") {
    return (
      <p className={`font-sans text-brand ${className}`} role="status">
        Thank you for your message. Our team will respond within 24 hours.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${isCompact ? "grid gap-5 sm:grid-cols-2" : "space-y-6"} ${className}`}
      noValidate
    >
      <div className={isCompact ? "sm:col-span-1" : undefined}>
        <label htmlFor={`${idPrefix}-name`} className="mb-2 block text-sm font-medium">
          Name <span className="text-brand">*</span>
        </label>
        <input
          id={`${idPrefix}-name`}
          name="name"
          type="text"
          required
          autoComplete="name"
          value={fields.name}
          onChange={(e) => updateField("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          disabled={status === "loading"}
          aria-invalid={!!fieldErrors.name}
          aria-describedby={fieldErrors.name ? `${idPrefix}-name-error` : undefined}
          className={inputClass}
        />
        {fieldErrors.name && (
          <p id={`${idPrefix}-name-error`} className={fieldErrorClass} role="alert">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div className={isCompact ? "sm:col-span-1" : undefined}>
        <label htmlFor={`${idPrefix}-email`} className="mb-2 block text-sm font-medium">
          Email <span className="text-brand">*</span>
        </label>
        <input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          value={fields.email}
          onChange={(e) => updateField("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          disabled={status === "loading"}
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? `${idPrefix}-email-error` : undefined}
          className={inputClass}
        />
        {fieldErrors.email && (
          <p id={`${idPrefix}-email-error`} className={fieldErrorClass} role="alert">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div className={isCompact ? "sm:col-span-2" : undefined}>
        <label htmlFor={`${idPrefix}-phone`} className="mb-2 block text-sm font-medium">
          Phone <span className="text-brand">*</span>
        </label>
        <input
          id={`${idPrefix}-phone`}
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          value={fields.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          onBlur={() => handleBlur("phone")}
          disabled={status === "loading"}
          aria-invalid={!!fieldErrors.phone}
          aria-describedby={fieldErrors.phone ? `${idPrefix}-phone-error` : undefined}
          className={inputClass}
        />
        {fieldErrors.phone && (
          <p id={`${idPrefix}-phone-error`} className={fieldErrorClass} role="alert">
            {fieldErrors.phone}
          </p>
        )}
      </div>

      <div className={isCompact ? "sm:col-span-2" : undefined}>
        <label htmlFor={`${idPrefix}-message`} className="mb-2 block text-sm font-medium">
          Message <span className="text-brand">*</span>
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={isCompact ? 4 : 5}
          required
          value={fields.message}
          onChange={(e) => updateField("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          disabled={status === "loading"}
          aria-invalid={!!fieldErrors.message}
          aria-describedby={
            fieldErrors.message ? `${idPrefix}-message-error` : undefined
          }
          className={`${inputClass} resize-none`}
        />
        {fieldErrors.message && (
          <p id={`${idPrefix}-message-error`} className={fieldErrorClass} role="alert">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {showCaptcha && (
        <div className={isCompact ? "sm:col-span-2" : undefined}>
          <TurnstileWidget
            key={captchaKey}
            onToken={setCaptchaToken}
            onExpire={() => setCaptchaToken("")}
          />
        </div>
      )}

      {status === "error" && errorMessage && (
        <p
          className={`font-sans text-sm text-brand ${isCompact ? "sm:col-span-2" : ""}`}
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      <div className={isCompact ? "sm:col-span-2" : undefined}>
        <Button type="submit" disabled={!canSubmit}>
          {status === "loading" ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
