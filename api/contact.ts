import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleContactSubmission } from "./lib/handlers";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const result = await handleContactSubmission(req.body);
  return res.status(result.status).json(result.body);
}
