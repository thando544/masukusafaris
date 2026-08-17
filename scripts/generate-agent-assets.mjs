import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import packages from "../src/data/packages.js";
import activities from "../src/data/activities.js";
import { SITE, SITE_ORIGIN } from "./site.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const today = new Date().toISOString().slice(0, 10);

function write(relPath, contents) {
  const full = join(publicDir, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, contents);
}

function xmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function sha256File(relPath) {
  const bytes = readFileSync(join(publicDir, relPath));
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function publicPackage(item) {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle || "",
    price: item.price,
    priceLabel: item.priceLabel,
    unit: item.unit,
    shortDescription: item.shortDescription,
    description: item.description,
    location: item.location,
    checkIn: item.checkIn,
    checkOut: item.checkOut,
    bestFor: item.bestFor,
    included: item.included || [],
    excluded: item.excluded || [],
    itinerary: item.itinerary || [],
    url: `${SITE_ORIGIN}/packages/${item.slug}`,
  };
}

function publicActivity(item) {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    price: item.price,
    maxPrice: item.maxPrice,
    priceLabel: item.priceLabel,
    unit: item.unit,
    category: item.category,
    shortDescription: item.shortDescription,
    description: item.description,
    location: item.location,
    duration: item.duration,
    bestFor: item.bestFor,
    included: item.included || [],
    excluded: item.excluded || [],
    url: `${SITE_ORIGIN}/activities/${item.slug}`,
  };
}

const packageList = packages.map(publicPackage);
const activityList = activities.map(publicActivity);

const staticPages = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/packages", changefreq: "weekly", priority: "0.9" },
  { path: "/activities", changefreq: "weekly", priority: "0.9" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/book", changefreq: "monthly", priority: "0.8" },
  { path: "/docs/api", changefreq: "monthly", priority: "0.5" },
  { path: "/auth.md", changefreq: "monthly", priority: "0.4" },
];

const urls = [
  ...staticPages,
  ...packageList.map((item) => ({
    path: `/packages/${item.slug}`,
    changefreq: "weekly",
    priority: "0.8",
  })),
  ...activityList.map((item) => ({
    path: `/activities/${item.slug}`,
    changefreq: "weekly",
    priority: "0.8",
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (item) => `  <url>
    <loc>${xmlEscape(`${SITE_ORIGIN}${item.path}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

write("sitemap.xml", sitemap);

write(
  "api/health.json",
  JSON.stringify(
    {
      status: "ok",
      service: SITE.name,
      time: new Date().toISOString(),
    },
    null,
    2
  ) + "\n"
);

write("api/packages.json", JSON.stringify({ packages: packageList }, null, 2) + "\n");
write("api/activities.json", JSON.stringify({ activities: activityList }, null, 2) + "\n");

write(
  "index.md",
  `# ${SITE.name}

${SITE.description}

Based in ${SITE.location}.

- Packages: ${SITE_ORIGIN}/packages
- Activities: ${SITE_ORIGIN}/activities
- Book: ${SITE_ORIGIN}/book
- Contact: ${SITE.email} · ${SITE.phone}
- WhatsApp: ${SITE.whatsapp}

## Featured packages

${packageList.map((item) => `- [${item.title}](${SITE_ORIGIN}/packages/${item.slug}) — ${item.priceLabel}. ${item.shortDescription}`).join("\n")}

## Activities

${activityList.map((item) => `- [${item.title}](${SITE_ORIGIN}/activities/${item.slug}) — ${item.priceLabel}`).join("\n")}

## For agents

Request this page with \`Accept: text/markdown\`. API catalog: ${SITE_ORIGIN}/.well-known/api-catalog
`
);

write(
  "about.md",
  `# About ${SITE.name}

Masuku Adventure Safaris was built around one idea: travel in Africa should feel inspiring, seamless, and memorable. Whether a guest is exploring Victoria Falls, cruising through Chobe, witnessing the Great Migration, or heading into the Masai Mara, every journey deserves thoughtful planning.

We help guests mix accommodation, activities, transfers, and multi-day safari packages from the first inquiry to the last day of the trip.

- Location: ${SITE.location}
- Contact: ${SITE.email}
- Phone: ${SITE.phone}
`
);

write(
  "contact.md",
  `# Contact ${SITE.name}

- Phone: ${SITE.phone}
- Email: ${SITE.email}
- WhatsApp: ${SITE.whatsapp}
- Location: ${SITE.location}

Send inquiries at ${SITE_ORIGIN}/contact or POST ${SITE_ORIGIN}/api/inquiries
`
);

write(
  "book.md",
  `# Book with ${SITE.name}

Request a safari package or activity. Staff confirm availability and pricing.

- Form: ${SITE_ORIGIN}/book
- API: POST ${SITE_ORIGIN}/api/inquiries
- Email: ${SITE.email}
- Phone: ${SITE.phone}

Packages: ${SITE_ORIGIN}/packages
Activities: ${SITE_ORIGIN}/activities
`
);

write(
  "packages.md",
  `# Safari packages

${packageList
    .map(
      (item) => `## [${item.title}](${SITE_ORIGIN}/packages/${item.slug})

${item.shortDescription}

- Location: ${item.location}
- Price: ${item.priceLabel}
- Best for: ${item.bestFor || "Safari travelers"}
`
    )
    .join("\n")}
`
);

write(
  "activities.md",
  `# Activities and experiences

${activityList
    .map(
      (item) => `## [${item.title}](${SITE_ORIGIN}/activities/${item.slug})

${item.shortDescription}

- Location: ${item.location}
- Duration: ${item.duration}
- Price: ${item.priceLabel}
`
    )
    .join("\n")}
`
);

for (const item of packageList) {
  const itinerary = (item.itinerary || [])
    .map(
      (day) => `### ${day.day}: ${day.title}

Stay: ${day.stay}

${(day.details || []).map((line) => `- ${line}`).join("\n")}`
    )
    .join("\n\n");

  write(
    `packages/${item.slug}.md`,
    `# ${item.title}

${item.description}

- Location: ${item.location}
- Price: ${item.priceLabel} ${item.unit}
- Check-in: ${item.checkIn}
- Check-out: ${item.checkOut}
- Best for: ${item.bestFor}
- Book: ${SITE_ORIGIN}/book
- JSON: ${SITE_ORIGIN}/api/packages/${item.slug}

## Included

${(item.included || []).map((line) => `- ${line}`).join("\n")}

## Excluded

${(item.excluded || []).map((line) => `- ${line}`).join("\n")}

## Itinerary

${itinerary}
`
  );
}

for (const item of activityList) {
  write(
    `activities/${item.slug}.md`,
    `# ${item.title}

${item.description}

- Location: ${item.location}
- Duration: ${item.duration}
- Price: ${item.priceLabel}
- Best for: ${item.bestFor}
- Book: ${SITE_ORIGIN}/book
- JSON: ${SITE_ORIGIN}/api/activities/${item.slug}

## Included

${(item.included || []).map((line) => `- ${line}`).join("\n")}

## Excluded

${(item.excluded || []).map((line) => `- ${line}`).join("\n")}
`
  );
}

const skills = [
  {
    name: "book-safari",
    type: "skill-md",
    description:
      "Book a Masuku Adventure Safaris package or Victoria Falls activity via the public API. Use when a traveler wants to reserve a safari, request a quote, or send an inquiry.",
    url: `${SITE_ORIGIN}/.well-known/agent-skills/book-safari/SKILL.md`,
    path: ".well-known/agent-skills/book-safari/SKILL.md",
  },
  {
    name: "discover-safaris",
    type: "skill-md",
    description:
      "Discover Masuku Adventure Safaris packages and Victoria Falls activities. Use when a traveler is researching African safari itineraries, destinations, or day trips.",
    url: `${SITE_ORIGIN}/.well-known/agent-skills/discover-safaris/SKILL.md`,
    path: ".well-known/agent-skills/discover-safaris/SKILL.md",
  },
];

write(
  ".well-known/agent-skills/index.json",
  JSON.stringify(
    {
      $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
      skills: skills.map(({ path, ...skill }) => ({
        ...skill,
        digest: sha256File(path),
      })),
    },
    null,
    2
  ) + "\n"
);

console.log(
  `Generated sitemap (${urls.length} URLs), markdown pages, API catalogs, and agent-skills index.`
);
