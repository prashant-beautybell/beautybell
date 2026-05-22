async function parseApiResponse(response: Response) {
  const text = await response.text();
  try {
    return JSON.parse(text) as { ok?: boolean; error?: string };
  } catch {
    if (response.status === 404) {
      return {
        error:
          "Form API unavailable. Restart with npm run dev (ensure .env has SLACK_WEBHOOK_URL).",
      };
    }
    if (text.includes("FUNCTION_INVOCATION_FAILED")) {
      return {
        error:
          "Form service failed to start. Redeploy the site or contact support.",
      };
    }
    return { error: text.trim() || undefined };
  }
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  source?: string;
  captchaToken: string;
}) {
  let response: Response;

  try {
    response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error("Network error. Check your connection and try again.");
  }

  const payload = await parseApiResponse(response);

  if (!response.ok) {
    throw new Error(payload.error ?? "Something went wrong. Please try again.");
  }

  return payload;
}

export async function submitNewsletter(email: string, captchaToken: string) {
  let response: Response;

  try {
    response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, captchaToken }),
    });
  } catch {
    throw new Error("Network error. Check your connection and try again.");
  }

  const payload = await parseApiResponse(response);

  if (!response.ok) {
    throw new Error(payload.error ?? "Something went wrong. Please try again.");
  }

  return payload;
}
