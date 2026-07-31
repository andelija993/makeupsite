import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/data";
import { siteConfig } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/about", "/portfolio", "/services", "/booking", "/blog", "/contact"];
  const posts = await getBlogPosts();

  return [
    ...routes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.createdAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
