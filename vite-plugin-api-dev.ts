import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import { loadEnv } from "vite";
import { handleContactSubmission, handleNewsletterSubmission } from "./api/lib/handlers";

function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function sendJson(res: ServerResponse, status: number, body: Record<string, unknown>) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

export function apiDevPlugin(): Plugin {
  return {
    name: "beautybell-api-dev",
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), "");
      if (env.SLACK_WEBHOOK_URL) {
        process.env.SLACK_WEBHOOK_URL = env.SLACK_WEBHOOK_URL;
      }
      if (env.TURNSTILE_SECRET_KEY) {
        process.env.TURNSTILE_SECRET_KEY = env.TURNSTILE_SECRET_KEY;
      }

      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/")) {
          return next();
        }

        const path = req.url.split("?")[0];

        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== "POST") {
          sendJson(res, 405, { error: "Method not allowed" });
          return;
        }

        try {
          const raw = await readRequestBody(req);
          const body = raw ? JSON.parse(raw) : {};

          if (path === "/api/contact") {
            const result = await handleContactSubmission(body);
            sendJson(res, result.status, result.body);
            return;
          }

          if (path === "/api/newsletter") {
            const result = await handleNewsletterSubmission(body);
            sendJson(res, result.status, result.body);
            return;
          }

          sendJson(res, 404, { error: "Not found" });
        } catch (error) {
          console.error("API dev middleware error:", error);
          sendJson(res, 500, { error: "Server error" });
        }
      });
    },
  };
}
