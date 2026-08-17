# Masuku Adventure Safaris API

Public JSON API for safari packages, Victoria Falls activities, and booking inquiries.

- OpenAPI: https://masukusafaris.com/api/openapi.json
- Catalog: https://masukusafaris.com/.well-known/api-catalog
- Health: https://masukusafaris.com/api/health

## Read

- `GET /api/packages`
- `GET /api/packages/{slug}`
- `GET /api/activities`
- `GET /api/activities/{slug}`

## Write

`POST /api/inquiries` with JSON:

```json
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

## Agents

See [auth.md](/auth.md) for registration. MCP is at `/api/mcp`.
