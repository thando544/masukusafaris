import packages from "./data/packages";
import activities from "./data/activities";
import { SITE } from "./config/site";

const tools = [
  {
    name: "list_safari_packages",
    description:
      "List Masuku Adventure Safaris multi-day safari packages with prices and locations.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    execute: async () =>
      JSON.stringify(
        packages.map((item) => ({
          slug: item.slug,
          title: item.title,
          priceLabel: item.priceLabel,
          location: item.location,
          url: `${SITE.origin}/packages/${item.slug}`,
        })),
        null,
        2
      ),
  },
  {
    name: "get_safari_package",
    description: "Get details for one safari package by slug.",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string", description: "Package URL slug" },
      },
      required: ["slug"],
      additionalProperties: false,
    },
    execute: async ({ slug }) => {
      const item = packages.find((entry) => entry.slug === slug);
      if (!item) return JSON.stringify({ error: "Package not found", slug });
      return JSON.stringify({
        slug: item.slug,
        title: item.title,
        description: item.shortDescription,
        priceLabel: item.priceLabel,
        location: item.location,
        bestFor: item.bestFor,
        url: `${SITE.origin}/packages/${item.slug}`,
        book: `${SITE.origin}/book`,
      });
    },
  },
  {
    name: "list_activities",
    description: "List Victoria Falls and Chobe day activities.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    execute: async () =>
      JSON.stringify(
        activities.map((item) => ({
          slug: item.slug,
          title: item.title,
          priceLabel: item.priceLabel,
          duration: item.duration,
          url: `${SITE.origin}/activities/${item.slug}`,
        })),
        null,
        2
      ),
  },
  {
    name: "get_contact_info",
    description: "Get Masuku Adventure Safaris phone, email, WhatsApp, and location.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    execute: async () =>
      JSON.stringify({
        name: SITE.name,
        email: SITE.email,
        phone: SITE.phone,
        whatsapp: SITE.whatsapp,
        location: SITE.location,
        book: `${SITE.origin}/book`,
        contact: `${SITE.origin}/contact`,
      }),
  },
  {
    name: "start_booking",
    description:
      "Open the booking page for a package or activity. Provide slug and type.",
    inputSchema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: ["package", "activity"],
        },
        slug: { type: "string" },
      },
      required: ["type", "slug"],
      additionalProperties: false,
    },
    execute: async ({ type, slug }) => {
      const path = type === "activity" ? `/activities/${slug}` : `/packages/${slug}`;
      if (typeof window !== "undefined") {
        window.location.assign(`${path}`);
      }
      return JSON.stringify({
        ok: true,
        bookingForm: `${SITE.origin}/book`,
        item: `${SITE.origin}${path}`,
      });
    },
  },
];

function getModelContext() {
  if (typeof navigator !== "undefined" && navigator.modelContext) {
    return navigator.modelContext;
  }
  if (typeof document !== "undefined" && document.modelContext) {
    return document.modelContext;
  }
  return null;
}

async function registerTools(modelContext) {
  if (typeof modelContext.registerTool === "function") {
    for (const tool of tools) {
      await modelContext.registerTool(tool);
    }
  }
  if (typeof modelContext.provideContext === "function") {
    await modelContext.provideContext({
      tools,
      instructions: `Help travelers explore and book safaris with ${SITE.name}.`,
    });
  }
}

export function initWebMcp() {
  if (typeof window === "undefined") return;
  if (window.__masukuWebMcpStarted) return;
  window.__masukuWebMcpStarted = true;

  let attempts = 0;
  const tryRegister = async () => {
    const modelContext = getModelContext();
    if (!modelContext) {
      attempts += 1;
      if (attempts < 20) window.setTimeout(tryRegister, 100);
      return;
    }
    try {
      await registerTools(modelContext);
    } catch (error) {
      console.warn("WebMCP registration failed", error);
    }
  };

  tryRegister();
}
