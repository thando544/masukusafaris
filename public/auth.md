# auth.md

You are an agent registering with **Masuku Adventure Safaris** so you can browse safari packages, activities, and submit booking inquiries on behalf of a traveler.

This service supports **agentic registration**: discover → register → (claim if needed) → exchange for an access_token → call API → handle revocation. Follow the steps in order.

Public catalog reads (`GET /api/packages`, `GET /api/activities`, `GET /api/health`) do not require a token. Booking and inquiry writes prefer a registered agent identity.

## Audience

- Travel-planning agents booking or researching African safaris
- Concierge agents acting for a named traveler
- Anonymous research agents exploring packages before a traveler claims the session

## Step 1 — Discover

### 1a. Fetch Protected Resource Metadata

```http
GET https://masukusafaris.com/.well-known/oauth-protected-resource
```

```json
{
  "resource": "https://www.masukusafaris.com",
  "authorization_servers": [
    "https://masukusafaris.com",
    "https://www.masukusafaris.com"
  ],
  "scopes_supported": ["packages.read", "activities.read", "inquiries.write", "bookings.write"],
  "bearer_methods_supported": ["header"]
}
```

### 1b. Fetch Authorization Server metadata

```http
GET https://masukusafaris.com/.well-known/oauth-authorization-server
```

Use the `agent_auth` block for `register_uri`, identity types, claim, and revocation URLs.

OpenID Connect discovery is also published at:

```http
GET https://masukusafaris.com/.well-known/openid-configuration
```

## Step 2 — Register

### Dynamic client registration

```http
POST https://masukusafaris.com/api/oauth/register
Content-Type: application/json

{
  "client_name": "Your Agent Name",
  "redirect_uris": ["https://your-agent.example/callback"],
  "grant_types": ["client_credentials", "urn:ietf:params:oauth:grant-type:jwt-bearer"],
  "token_endpoint_auth_method": "client_secret_basic"
}
```

### Agent identity (anonymous)

```http
POST https://masukusafaris.com/api/agent/identity
Content-Type: application/json

{ "type": "anonymous" }
```

### Agent identity (verified email)

```http
POST https://masukusafaris.com/api/agent/identity
Content-Type: application/json

{
  "type": "service_auth",
  "login_hint": "traveler@example.com"
}
```

Show the returned `user_code` and `verification_uri` to the traveler. They confirm by emailing **bookings@masukusafaris.com** with the code, or by completing the claim endpoint.

## Step 3 — Claim (verified email)

```http
POST https://masukusafaris.com/api/agent/identity/claim
Content-Type: application/json

{
  "claim_token": "<claim_token>",
  "email": "traveler@example.com"
}
```

Human confirmation: the traveler emails bookings@masukusafaris.com with subject `Agent claim <user_code>` or WhatsApps +263 78 285 6955.

## Step 4 — Exchange for an access token

```http
POST https://masukusafaris.com/api/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&scope=packages.read activities.read inquiries.write
```

Or JWT bearer:

```
grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=<identity_assertion>
```

Send the token as `Authorization: Bearer <access_token>`.

## Step 5 — Call APIs

- Catalog: `GET https://masukusafaris.com/api/packages`
- Activities: `GET https://masukusafaris.com/api/activities`
- Inquiry: `POST https://masukusafaris.com/api/inquiries`
- MCP tools: `POST https://masukusafaris.com/api/mcp`
- OpenAPI: `GET https://masukusafaris.com/api/openapi.json`
- Docs: `GET https://masukusafaris.com/docs/api`

## Step 6 — Revocation

```http
POST https://masukusafaris.com/api/oauth/revoke
Content-Type: application/x-www-form-urlencoded

token=<access_token>
```

Revocation events (when supported): `https://schemas.workos.com/events/agent/auth/identity/assertion/revoked`

## Credential types

- `access_token` — Bearer token for API calls
- `client_id` / `client_secret` — from dynamic registration
- `identity_assertion` — from `/api/agent/identity`

## Human fallback

If automated registration is not available, email **bookings@masukusafaris.com** with:

- Agent name and callback URL
- Traveler name, email, dates, party size
- Package or activity slug of interest
