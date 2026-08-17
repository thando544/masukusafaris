---
name: book-safari
description: Book a Masuku Adventure Safaris package or Victoria Falls activity via the public API. Use when a traveler wants to reserve a safari, request a quote, or send an inquiry.
license: Proprietary
metadata:
  author: Masuku Adventure Safaris
  version: "1.0"
---

# Book a safari with Masuku Adventure Safaris

Help a traveler request a booking. Human staff confirm availability, pricing, and payment.

## When to use

- The user wants to book a safari package or activity
- The user has dates, party size, and contact details
- The user asks you to contact Masuku Adventure Safaris

## Steps

1. Discover options:
   - `GET https://masukusafaris.com/api/packages`
   - `GET https://masukusafaris.com/api/activities`
   - Or MCP `list_packages` / `list_activities` at `https://masukusafaris.com/api/mcp`
2. Confirm the slug, travel dates, guest count, and contact email with the user.
3. Submit:

```http
POST https://masukusafaris.com/api/inquiries
Content-Type: application/json

{
  "type": "package",
  "slug": "okavango-delta-safari",
  "fullName": "Ada Traveler",
  "email": "ada@example.com",
  "phone": "+1 555 0100",
  "guests": 2,
  "checkIn": "2026-09-10",
  "checkOut": "2026-09-17",
  "message": "Please quote a private room."
}
```

4. Tell the user that Masuku will reply at **bookings@masukusafaris.com** or WhatsApp **+263 78 285 6955**.
5. Optional: register as an agent first using https://masukusafaris.com/auth.md

Do not invent prices that are listed as "Custom Quote". Ask Masuku for a quote.
