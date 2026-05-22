export async function sendSlackMessage(text: string, fields: Record<string, string>) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("SLACK_WEBHOOK_URL is not configured");
  }

  const fieldLines = Object.entries(fields)
    .map(([key, value]) => `*${key}:* ${value}`)
    .join("\n");

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*${text}*\n\n${fieldLines}`,
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Slack webhook failed: ${response.status}`);
  }
}

export function readJsonBody<T extends Record<string, unknown>>(
  body: unknown
): T | null {
  if (!body || typeof body !== "object") return null;
  return body as T;
}
