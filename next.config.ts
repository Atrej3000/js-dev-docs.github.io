import fs from "node:fs";
import path from "node:path";

import type { NextConfig } from "next";

type LegacyRedirect = {
  alias: string;
  destination: string;
};

const legacyAliasPath = path.join(
  process.cwd(),
  "content",
  "generated",
  "legacy-route-aliases.json",
);

function readLegacyRedirects(): LegacyRedirect[] {
  if (!fs.existsSync(legacyAliasPath)) {
    return [];
  }

  return JSON.parse(fs.readFileSync(legacyAliasPath, "utf8")) as LegacyRedirect[];
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  async redirects() {
    const legacyRedirects = readLegacyRedirects().map((entry) => ({
      source: entry.alias,
      destination: entry.destination,
      permanent: true,
    }));

    return [
      {
        source: "/index.html",
        destination: "/uk",
        permanent: true,
      },
      {
        source: "/:locale/index.html",
        destination: "/:locale",
        permanent: true,
      },
      ...legacyRedirects,
    ];
  },
};

export default nextConfig;
