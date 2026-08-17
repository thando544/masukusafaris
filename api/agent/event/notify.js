import { handleOptions, sendJson } from "../../_lib/http.js";

export default function handler(req, res) {
  if (handleOptions(req, res)) return;
  sendJson(res, 202, { accepted: true });
}
