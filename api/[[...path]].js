import { handleOptions, readBody, sendJson } from "../server/http.js";
import {
  getActivity,
  getPackage,
  listActivities,
  listPackages,
} from "../server/catalog.js";
import { handleMcp } from "../server/mcp.js";
import {
  oauthProtectedResourceMetadata,
  requestOrigin,
} from "../server/oauth-metadata.js";

function routePath(req) {
  const raw = req.query?.path;
  if (!raw) return "";
  return (Array.isArray(raw) ? raw.join("/") : String(raw)).replace(/^\/+|\/+$/g, "");
}

function isEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function handleInquiry(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "method_not_allowed" });
    return;
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    sendJson(res, 400, { error: "invalid_json" });
    return;
  }

  const fullName = String(body.fullName || body.full_name || "").trim();
  const email = String(body.email || body.user_email || "").trim();
  if (!fullName || !isEmail(email)) {
    sendJson(res, 400, {
      error: "invalid_request",
      hint: "fullName and a valid email are required",
    });
    return;
  }

  const inquiry = {
    id: `inq_${Date.now()}`,
    type: body.type || "contact",
    slug: body.slug || null,
    fullName,
    email,
    phone: body.phone || "",
    guests: body.guests || null,
    checkIn: body.checkIn || body.check_in || null,
    checkOut: body.checkOut || body.check_out || null,
    message: body.message || body.requests || "",
    receivedAt: new Date().toISOString(),
  };

  const serviceId =
    process.env.EMAILJS_SERVICE_ID || process.env.VITE_EMAILJS_SERVICE_ID;
  const templateId =
    process.env.EMAILJS_BOOKING_TEMPLATE_ID ||
    process.env.VITE_EMAILJS_BOOKING_TEMPLATE_ID ||
    process.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
  const publicKey =
    process.env.EMAILJS_PUBLIC_KEY || process.env.VITE_EMAILJS_PUBLIC_KEY;

  let emailed = false;
  if (serviceId && templateId && publicKey) {
    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            booking_type: inquiry.type,
            item_name: inquiry.slug || "General inquiry",
            full_name: inquiry.fullName,
            user_email: inquiry.email,
            phone: inquiry.phone,
            guests: inquiry.guests || "",
            check_in: inquiry.checkIn || "",
            check_out: inquiry.checkOut || "",
            special_requests: inquiry.message || "None",
            reply_to: inquiry.email,
          },
        }),
      });
      emailed = response.ok;
    } catch {
      emailed = false;
    }
  }

  sendJson(res, 201, {
    ok: true,
    inquiry: {
      id: inquiry.id,
      type: inquiry.type,
      slug: inquiry.slug,
      receivedAt: inquiry.receivedAt,
    },
    emailed,
    followUp: {
      email: "bookings@masukusafaris.com",
      phone: "+263 78 285 6955",
      whatsapp: "https://wa.me/263782856955",
    },
  });
}

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  const path = routePath(req);
  const method = req.method;

  if (path === "well-known/oauth-protected-resource" || path.startsWith("well-known/oauth-protected-resource/")) {
    const extra = path.slice("well-known/oauth-protected-resource".length);
    sendJson(res, 200, oauthProtectedResourceMetadata(requestOrigin(req), extra));
    return;
  }

  if (path === "health" && method === "GET") {
    sendJson(res, 200, {
      status: "ok",
      service: "Masuku Adventure Safaris",
      time: new Date().toISOString(),
    });
    return;
  }

  if (path === "packages" && method === "GET") {
    sendJson(res, 200, { packages: listPackages() });
    return;
  }

  if (path.startsWith("packages/") && method === "GET") {
    const slug = path.slice("packages/".length);
    const item = getPackage(slug);
    if (!item) {
      sendJson(res, 404, { error: "not_found", slug });
      return;
    }
    sendJson(res, 200, item);
    return;
  }

  if (path === "activities" && method === "GET") {
    sendJson(res, 200, { activities: listActivities() });
    return;
  }

  if (path.startsWith("activities/") && method === "GET") {
    const slug = path.slice("activities/".length);
    const item = getActivity(slug);
    if (!item) {
      sendJson(res, 404, { error: "not_found", slug });
      return;
    }
    sendJson(res, 200, item);
    return;
  }

  if (path === "inquiries") {
    await handleInquiry(req, res);
    return;
  }

  if (path === "mcp") {
    await handleMcp(req, res);
    return;
  }

  if (path === "oauth/jwks" && method === "GET") {
    sendJson(res, 200, { keys: [] });
    return;
  }

  if (path === "oauth/authorize" && method === "GET") {
    sendJson(res, 200, {
      authorization_endpoint: "https://masukusafaris.com/api/oauth/authorize",
      instruction:
        "Agents should use client_credentials or the auth.md claim flow instead of an interactive login.",
      auth_md: "https://masukusafaris.com/auth.md",
      token_endpoint: "https://masukusafaris.com/api/oauth/token",
    });
    return;
  }

  if (path === "oauth/userinfo" && method === "GET") {
    sendJson(res, 200, {
      sub: "agent",
      name: "Masuku Adventure Safaris agent",
      email: "bookings@masukusafaris.com",
    });
    return;
  }

  if (path === "oauth/token" && method === "POST") {
    let body;
    try {
      body = await readBody(req);
    } catch {
      sendJson(res, 400, { error: "invalid_request" });
      return;
    }
    const allowed = [
      "client_credentials",
      "authorization_code",
      "refresh_token",
      "urn:ietf:params:oauth:grant-type:jwt-bearer",
      "urn:workos:agent-auth:grant-type:claim",
    ];
    if (!allowed.includes(body.grant_type)) {
      sendJson(res, 400, {
        error: "unsupported_grant_type",
        error_description: `Supported: ${allowed.join(", ")}`,
      });
      return;
    }
    sendJson(res, 200, {
      token_type: "Bearer",
      expires_in: 3600,
      scope:
        body.scope ||
        "packages.read activities.read inquiries.write bookings.write",
      access_token: `msa_${Math.floor(Date.now() / 1000)}_${crypto.randomUUID()}`,
    });
    return;
  }

  if (path === "oauth/register" && method === "POST") {
    let body;
    try {
      body = await readBody(req);
    } catch {
      sendJson(res, 400, { error: "invalid_client_metadata" });
      return;
    }
    sendJson(res, 201, {
      client_id: `msa_client_${crypto.randomUUID()}`,
      client_secret: `msa_secret_${crypto.randomUUID()}`,
      client_id_issued_at: Math.floor(Date.now() / 1000),
      client_secret_expires_at: 0,
      client_name: body.client_name || "Unnamed agent",
      redirect_uris: body.redirect_uris || [],
      grant_types: body.grant_types || ["client_credentials"],
      token_endpoint_auth_method:
        body.token_endpoint_auth_method || "client_secret_basic",
      registration_client_uri:
        "https://masukusafaris.com/.well-known/oauth-authorization-server",
    });
    return;
  }

  if (path === "oauth/revoke" && method === "POST") {
    sendJson(res, 200, { revoked: true });
    return;
  }

  if (path === "agent/identity" && method === "POST") {
    let body;
    try {
      body = await readBody(req);
    } catch {
      sendJson(res, 400, { error: "invalid_request" });
      return;
    }
    const type = body.type || "anonymous";
    const claimToken = `claim_${crypto.randomUUID()}`;
    const userCode = String(Math.floor(100000 + Math.random() * 900000));
    if (type === "anonymous") {
      sendJson(res, 200, {
        type: "anonymous",
        identity_assertion: `assert_${crypto.randomUUID()}`,
        claim_token: claimToken,
        credential_types_supported: ["access_token"],
        token_endpoint: "https://masukusafaris.com/api/oauth/token",
      });
      return;
    }
    sendJson(res, 200, {
      type,
      claim_token: claimToken,
      claim: {
        user_code: userCode,
        verification_uri: "https://masukusafaris.com/contact",
        verification_uri_complete: `https://masukusafaris.com/contact?code=${userCode}`,
        interval: 5,
        expires_in: 1800,
      },
      instruction:
        "Ask the traveler to email bookings@masukusafaris.com with the user_code, then exchange at /api/oauth/token.",
    });
    return;
  }

  if (path === "agent/identity/claim" && method === "POST") {
    let body;
    try {
      body = await readBody(req);
    } catch {
      sendJson(res, 400, { error: "invalid_request" });
      return;
    }
    sendJson(res, 200, {
      status: "pending",
      claim_token: body.claim_token || null,
      email: body.email || null,
      verification_uri: "https://masukusafaris.com/contact",
      instruction:
        "The traveler should confirm by emailing bookings@masukusafaris.com. Then exchange the claim_token at /api/oauth/token.",
    });
    return;
  }

  if (path === "agent/event/notify") {
    sendJson(res, 202, { accepted: true });
    return;
  }

  sendJson(res, 404, { error: "not_found", path });
}
