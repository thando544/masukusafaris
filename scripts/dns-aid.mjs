import { SITE, SITE_ORIGIN } from "./site.mjs";

const domain = new URL(SITE_ORIGIN).hostname.replace(/^www\./, "");
const wwwHost = `www.${domain}`;
const ttl = 3600;
const cap = `${SITE_ORIGIN}/.well-known/agent-index.json`;
const mcp = `${SITE_ORIGIN}/api/mcp`;

const svcbParams = `alpn="h2,h3" port=443`;
const txtValue = `v=dnsaid1;alpn=h2,h3;port=443;target=${domain};mcp=${mcp};cap=${cap}`;

export const dnsAidRecords = [
  {
    name: `_index._agents.${domain}`,
    host: "_index._agents",
    type: "SVCB",
    value: `1 ${domain}. ${svcbParams}`,
  },
  {
    name: `_index._agents.${wwwHost}`,
    host: "_index._agents.www",
    type: "SVCB",
    value: `1 ${domain}. ${svcbParams}`,
  },
  {
    name: `_mcp._agents.${domain}`,
    host: "_mcp._agents",
    type: "SVCB",
    value: `1 ${domain}. alpn="h2,h3" port=443`,
  },
  {
    name: `_mcp._agents.${wwwHost}`,
    host: "_mcp._agents.www",
    type: "SVCB",
    value: `1 ${domain}. alpn="h2,h3" port=443`,
  },
  {
    name: `_a2a._agents.${domain}`,
    host: "_a2a._agents",
    type: "HTTPS",
    value: `1 ${domain}. ${svcbParams}`,
  },
  {
    name: `_a2a._agents.${wwwHost}`,
    host: "_a2a._agents.www",
    type: "HTTPS",
    value: `1 ${domain}. ${svcbParams}`,
  },
  {
    name: `_index._agents.${domain}`,
    host: "_index._agents",
    type: "TXT",
    value: txtValue,
  },
  {
    name: `_index._agents.${wwwHost}`,
    host: "_index._agents.www",
    type: "TXT",
    value: txtValue,
  },
];

export function dnsAidZoneFile() {
  const lines = [
    `; DNS for AI Discovery (DNS-AID) — draft-mozleywilliams-dnsop-dnsaid`,
    `; These records must be published at the DNS host for ${domain}.`,
    `; A file on the website cannot satisfy this check.`,
    `;`,
    `; Current nameservers: dns1.registrar-servers.com (Namecheap BasicDNS).`,
    `; Namecheap Advanced DNS often has TXT, and sometimes HTTPS, but not SVCB.`,
    `; The isitagentready scanner queries SVCB, HTTPS, and TXT under _agents.`,
    `;`,
    `; Fastest path that can pass:`,
    `;   1. Cloudflare (free): add the SVCB/HTTPS records below, DNS-only (grey cloud).`,
    `;      Then enable DNSSEC and add the DS record back at Namecheap.`,
    `;   2. Stay on Namecheap: add the TXT records now. If the panel has HTTPS,`,
    `;      add those too. Enable DNSSEC under Domain List → Manage → DNSSEC.`,
    `;`,
    `; Namecheap Advanced DNS fields: Type / Host / Value / TTL ${ttl}`,
    `; Cloudflare: Type SVCB or HTTPS / Name = Host / Priority 1 / Target ${domain} /`,
    `;             Value alpn="h2,h3" port=443 / Proxy DNS only`,
    ``,
    `; Well-known entrypoints (scanner checks www first, then apex)`,
  ];

  for (const record of dnsAidRecords) {
    if (record.type === "TXT") {
      lines.push(
        `${record.name}. ${ttl} IN TXT "${record.value.replaceAll('"', '\\"')}"`
      );
      continue;
    }
    lines.push(`${record.name}. ${ttl} IN ${record.type} ${record.value}`);
  }

  lines.push("");
  lines.push(`; Site HTTPS bindings`);
  lines.push(`${domain}. ${ttl} IN HTTPS 1 . alpn="h2,h3"`);
  lines.push(`${wwwHost}. ${ttl} IN HTTPS 1 ${domain}. alpn="h2,h3"`);
  lines.push("");
  lines.push(`; HTTP index fallback: ${cap}`);
  lines.push(`; ${SITE.name} MCP: ${mcp}`);
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function printInstructions() {
  console.log(`Publish DNS-AID for ${domain} at the registrar (Namecheap).\n`);
  console.log("Add these Advanced DNS records:\n");
  console.log(
    "Type".padEnd(8) + "Host".padEnd(24) + "Value"
  );
  console.log("-".repeat(88));
  for (const record of dnsAidRecords) {
    console.log(
      record.type.padEnd(8) + record.host.padEnd(24) + record.value
    );
  }
  console.log(`
After saving, wait for TTL and check:

  dig +short SVCB _index._agents.${domain} @1.1.1.1
  dig +short HTTPS _a2a._agents.${domain} @1.1.1.1
  dig +short TXT _index._agents.${domain} @1.1.1.1
  dig +short DS ${domain} @1.1.1.1
`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  printInstructions();
}
