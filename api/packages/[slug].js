import { handleOptions, sendJson } from "../_lib/http.js";
import { getPackage } from "../_lib/catalog.js";

export default function handler(req, res) {
  if (handleOptions(req, res)) return;
  if (req.method !== "GET") {
    sendJson(res, 405, { error: "method_not_allowed" });
    return;
  }
  const slug = req.query.slug;
  const item = getPackage(slug);
  if (!item) {
    sendJson(res, 404, { error: "not_found", slug });
    return;
  }
  sendJson(res, 200, item);
}
