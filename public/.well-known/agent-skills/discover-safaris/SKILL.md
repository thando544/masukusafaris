---
name: discover-safaris
description: Discover Masuku Adventure Safaris packages and Victoria Falls activities. Use when a traveler is researching African safari itineraries, destinations, or day trips.
license: Proprietary
metadata:
  author: Masuku Adventure Safaris
  version: "1.0"
---

# Discover Masuku safaris

Use this skill to research trips before booking.

## Catalog

- Packages (multi-day itineraries): `GET https://masukusafaris.com/api/packages`
- One package: `GET https://masukusafaris.com/api/packages/{slug}`
- Activities (day trips): `GET https://masukusafaris.com/api/activities`
- One activity: `GET https://masukusafaris.com/api/activities/{slug}`
- OpenAPI: `https://masukusafaris.com/api/openapi.json`

Prefer `Accept: text/markdown` on HTML pages for a compact summary.

## Destinations commonly offered

Victoria Falls, Chobe, Okavango Delta, Hwange, Matobo, Great Zimbabwe, Serengeti/Ngorongoro, Amboseli, Masai Mara, Kruger, Namibia (Sossusvlei, Etosha).

## Next step

When the traveler is ready, follow the `book-safari` skill or send them to https://masukusafaris.com/book
