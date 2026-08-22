import { useEffect } from "react";
import { SITE, SITE_NAME, SITE_ORIGIN } from "../../config/site";

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dnqjax5ut/image/upload/q_auto/f_auto/v1775294136/masukusafaris.com8_kjougq.jpg";

function upsertMeta(selector, attributes) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function SEO({
  title,
  description,
  path = "/",
  image,
  type = "website",
  robots = "index, follow",
  jsonLd,
}) {
  const pageTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_ORIGIN}${path}`;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_ORIGIN}${image}`
    : DEFAULT_IMAGE;
  const jsonLdText = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    document.title = pageTitle;
    upsertMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: robots,
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: pageTitle,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: url,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: ogImage,
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: type,
    });
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: pageTitle,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    upsertLink("canonical", url);

    const existing = document.getElementById("page-jsonld");
    if (existing) existing.remove();
    if (jsonLdText) {
      const script = document.createElement("script");
      script.id = "page-jsonld";
      script.type = "application/ld+json";
      script.text = jsonLdText;
      document.head.appendChild(script);
    }

    return () => {
      const leftover = document.getElementById("page-jsonld");
      if (leftover) leftover.remove();
    };
  }, [pageTitle, description, url, ogImage, type, robots, jsonLdText]);

  return null;
}

export function travelAgencyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE.name,
    url: SITE.origin,
    email: SITE.email,
    telephone: SITE.phoneE164,
    image: DEFAULT_IMAGE,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Victoria Falls",
      addressCountry: "ZW",
    },
    areaServed: [
      "Zimbabwe",
      "Botswana",
      "Zambia",
      "Tanzania",
      "Kenya",
      "Namibia",
      "South Africa",
    ],
    sameAs: [SITE.facebook, SITE.whatsapp, SITE.safariBookings, SITE.googleMaps].filter(
      Boolean
    ),
  };
}

export function tourJsonLd(item, kind) {
  const url = `${SITE_ORIGIN}/${kind === "activity" ? "activities" : "packages"}/${item.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: item.title,
    description: item.shortDescription || item.description,
    url,
    image: item.image?.startsWith("http")
      ? item.image
      : `${SITE_ORIGIN}${item.image}`,
    touristType: item.bestFor,
    itinerary: {
      "@type": "Place",
      name: item.location,
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "USD",
      price: item.price || undefined,
      availability: "https://schema.org/InStock",
    },
    provider: {
      "@type": "TravelAgency",
      name: SITE.name,
      url: SITE.origin,
    },
  };
}
