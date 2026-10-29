import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/features`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/dashboard`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/scenarios`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/markets`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    {
      url: `${base}/time-machine`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${base}/calibration`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    { url: `${base}/world`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
  ];
}
