import { handleOptions, readBody, sendJson } from "./_lib/http.js";

function isEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;
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
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
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
        }
      );
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
