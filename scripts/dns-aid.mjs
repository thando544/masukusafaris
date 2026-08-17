import { SITE, SITE_ORIGIN } from "./site.mjs";

const domain = new URL(SITE_ORIGIN).hostname.replace(/^www\./, "");
const wwwHost = `www.${domain}`;
const ttl = 3600;
const cap = `${SITE_ORIGIN}/.well-known/agent-index.json`;
const mcp = `${SITE_ORIGIN}/api/mcp`;
const httpsParams = `alpn="h2,h3" port=443 mandatory=alpn,port`;
const txtValue = `v=dnsaid1;alpn=h2,h3;port=443;target=${domain};mcp=${mcp};cap=${cap}`;

function hosts() {
  return [
    { suffix: domain, host: "" },
    { suffix: wwwHost, host: ".www" },
  ];
}

export const dnsAidRecords = [];

for (const { suffix, host } of hosts()) {
  for (const [typeName, rrType] of [
    ["_index._agents", "HTTPS"],
    ["_mcp._agents", "HTTPS"],
    ["_a2a._agents", "HTTPS"],
  ]) {
    dnsAidRecords.push({
      name: `${typeName}.${suffix}`,
      host: `${typeName}${host}`,
      type: rrType,
      value: `1 ${domain}. ${httpsParams}`,
    });
  }
  dnsAidRecords.push({
    name: `_index._agents.${suffix}`,
    host: `_index._agents${host}`,
    type: "TXT",
    value: txtValue,
  });
}

export function dnsAidJson() {
  return {
    version: "1.0",
    domain,
    draft: "draft-mozleywilliams-dnsop-dnsaid",
    nameservers: ["dns1.registrar-servers.com", "dns2.registrar-servers.com"],
    httpIndex: cap,
    records: dnsAidRecords.map((record) => ({
      name: record.name,
      type: record.type,
      ttl,
      rdata: record.value,
    })),
    publish: {
      registrar: "Namecheap Advanced DNS",
      dnssec: `Enable DNSSEC for ${domain}, then publish the DS record`,
      note: "These records must exist in public DNS. Serving this JSON does not satisfy DNS-AID.",
    },
  };
}

export function dnsAidZoneFile() {
  const lines = [
    `; DNS for AI Discovery (DNS-AID) — draft-mozleywilliams-dnsop-dnsaid`,
    `; Publish at the DNS host. A file on the website cannot satisfy the scanner.`,
    `;`,
    `; Nameservers today: dns1.registrar-servers.com (Namecheap BasicDNS).`,
    `;`,
    `; Namecheap: Domain List → Manage → Advanced DNS → Add New Record`,
    `;   Type HTTPS | Host _index._agents | Value 1 masukusafaris.com. alpn="h2,h3" port=443 mandatory=alpn,port | TTL 3600`,
    `; Repeat for _mcp._agents, _a2a._agents, and the .www hosts below.`,
    `; Also add the TXT records. Then enable DNSSEC.`,
    `;`,
    `; If HTTPS is missing from the Type dropdown, use Cloudflare DNS (free),`,
    `; DNS-only / grey cloud, Type HTTPS or SVCB, then enable DNSSEC.`,
    ``,
    `; Scanner queries HTTPS and SVCB at _index._agents, _mcp._agents, _a2a._agents`,
    `; for both www.${domain} and ${domain}.`,
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
  lines.push(`; HTTP index: ${cap}`);
  lines.push(`; MCP: ${mcp}`);
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function printInstructions() {
  console.log(`DNS-AID for ${domain} — add these at Namecheap Advanced DNS.\n`);
  console.log("Type".padEnd(8) + "Host".padEnd(24) + "Value");
  console.log("-".repeat(96));
  for (const record of dnsAidRecords) {
    console.log(record.type.padEnd(8) + record.host.padEnd(24) + record.value);
  }
  console.log(`
Then: Domain List → Manage → DNSSEC → Enable.

Check:
  dig +short HTTPS _index._agents.${domain} @1.1.1.1
  dig +short HTTPS _index._agents.${wwwHost} @1.1.1.1
  dig +short TXT _index._agents.${domain} @1.1.1.1
  dig +short DS ${domain} @1.1.1.1
`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  printInstructions();
}
