import { handleOptions, sendJson } from "../_lib/http.js";

export default function handler(req, res) {
  if (handleOptions(req, res)) return;
  sendJson(res, 200, {
    authorization_endpoint: "https://masukusafaris.com/api/oauth/authorize",
    instruction:
      "Agents should use client_credentials or the auth.md claim flow instead of an interactive login.",
    auth_md: "https://masukusafaris.com/auth.md",
    token_endpoint: "https://masukusafaris.com/api/oauth/token",
  });
}
