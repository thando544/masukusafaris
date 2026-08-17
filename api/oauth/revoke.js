import { handleOptions, sendJson } from "../_lib/http.js";

export default function handler(req, res) {
  if (handleOptions(req, res)) return;
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "method_not_allowed" });
    return;
  }
  sendJson(res, 200, { revoked: true });
}
