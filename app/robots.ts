import type { MetadataRoute } from "next";

import { siteUrl } from "@/src/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/legacy", "/assets"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
