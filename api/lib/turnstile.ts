type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export async function verifyTurnstileToken(
  token: unknown
): Promise<{ ok: true } | { ok: false; error: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return { ok: false, error: "Captcha is not configured on the server." };
  }

  if (typeof token !== "string" || !token.trim()) {
    return { ok: false, error: "Please complete the captcha." };
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token.trim(),
      }),
    }
  );

  const data = (await response.json()) as TurnstileVerifyResponse;

  if (!data.success) {
    console.error("Turnstile verification failed:", data["error-codes"]);
    return { ok: false, error: "Captcha verification failed. Please try again." };
  }

  return { ok: true };
}
