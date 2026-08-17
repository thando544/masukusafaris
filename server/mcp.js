import { readBody, sendJson, setCors } from "./http.js";
import { getActivity, getPackage, listActivities, listPackages } from "./catalog.js";

const SERVER_INFO = {
  name: "masuku-safaris",
  title: "Masuku Adventure Safaris",
  version: "1.0.0",
};

const TOOLS = [
  {
    name: "list_packages",
    description: "List safari packages with prices, locations, and summaries.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_package",
    description: "Get one safari package by slug.",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string" } },
      required: ["slug"],
      additionalProperties: false,
    },
  },
  {
    name: "list_activities",
    description: "List Victoria Falls and Chobe activities.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_activity",
    description: "Get one activity by slug.",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string" } },
      required: ["slug"],
      additionalProperties: false,
    },
  },
  {
    name: "create_inquiry",
    description: "Submit a booking or contact inquiry for human follow-up.",
    inputSchema: {
      type: "object",
      properties: {
        type: { type: "string" },
        slug: { type: "string" },
        fullName: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        guests: { type: "integer" },
        checkIn: { type: "string" },
        checkOut: { type: "string" },
        message: { type: "string" },
      },
      required: ["fullName", "email"],
      additionalProperties: false,
    },
  },
  {
    name: "get_contact",
    description: "Return Masuku Adventure Safaris contact details.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
];

function textResult(data) {
  return {
    content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
  };
}

function rpcError(id, code, message) {
  return { jsonrpc: "2.0", id: id ?? null, error: { code, message } };
}

async function callTool(name, args = {}) {
  switch (name) {
    case "list_packages":
      return textResult({ packages: listPackages() });
    case "get_package": {
      const item = getPackage(args.slug);
      if (!item) throw new Error(`Unknown package slug: ${args.slug}`);
      return textResult(item);
    }
    case "list_activities":
      return textResult({ activities: listActivities() });
    case "get_activity": {
      const item = getActivity(args.slug);
      if (!item) throw new Error(`Unknown activity slug: ${args.slug}`);
      return textResult(item);
    }
    case "create_inquiry":
      return textResult({
        ok: true,
        message:
          "Inquiry captured for human follow-up at bookings@masukusafaris.com",
        next: "POST https://masukusafaris.com/api/inquiries with the same fields to persist it.",
        received: args,
      });
    case "get_contact":
      return textResult({
        name: "Masuku Adventure Safaris",
        email: "bookings@masukusafaris.com",
        phone: "+263 78 285 6955",
        whatsapp: "https://wa.me/263782856955",
        location: "Victoria Falls, Zimbabwe",
        bookingUrl: "https://masukusafaris.com/book",
      });
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function handleRpc(message) {
  if (message.method === "initialize") {
    return {
      jsonrpc: "2.0",
      id: message.id,
      result: {
        protocolVersion: "2025-06-18",
        capabilities: { tools: {} },
        serverInfo: SERVER_INFO,
        instructions:
          "Use list_packages and list_activities to explore trips, then create_inquiry to request a booking.",
      },
    };
  }

  if (message.method === "notifications/initialized" || message.method === "ping") {
    return null;
  }

  if (message.method === "tools/list") {
    return { jsonrpc: "2.0", id: message.id, result: { tools: TOOLS } };
  }

  if (message.method === "tools/call") {
    const name = message.params?.name;
    const args = message.params?.arguments || {};
    try {
      const result = await callTool(name, args);
      return { jsonrpc: "2.0", id: message.id, result };
    } catch (error) {
      return {
        jsonrpc: "2.0",
        id: message.id,
        result: {
          isError: true,
          content: [{ type: "text", text: error.message }],
        },
      };
    }
  }

  if (message.method === "resources/list") {
    return { jsonrpc: "2.0", id: message.id, result: { resources: [] } };
  }

  if (message.method === "prompts/list") {
    return { jsonrpc: "2.0", id: message.id, result: { prompts: [] } };
  }

  return rpcError(message.id, -32601, `Method not found: ${message.method}`);
}

export async function handleMcp(req, res) {
  if (req.method === "GET") {
    sendJson(res, 200, {
      serverInfo: SERVER_INFO,
      transport: { type: "streamable-http", endpoint: "/api/mcp" },
      protocolVersion: "2025-06-18",
    });
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { error: "method_not_allowed" });
    return;
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    sendJson(res, 400, rpcError(null, -32700, "Parse error"));
    return;
  }

  const messages = Array.isArray(body) ? body : [body];
  const responses = [];
  for (const message of messages) {
    if (message?.method?.startsWith("notifications/") && message.id == null) {
      await handleRpc(message);
      continue;
    }
    const response = await handleRpc(message);
    if (response) responses.push(response);
  }

  if (responses.length === 0) {
    setCors(res);
    res.statusCode = 202;
    res.end();
    return;
  }

  sendJson(res, 200, Array.isArray(body) ? responses : responses[0]);
}
