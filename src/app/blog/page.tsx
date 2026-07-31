import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/data";
import { BlogCard } from "@/components/shared/blog-card";
import { getPreferences } from "@/lib/preferences";
import { getDictionary } from "@/lib/i18n";

type SearchParams = Promise<{ search?: string; category?: string }>;

export const metadata: Metadata = {
  title: "Beauty Blog",
  description: "Beauty education, bridal prep tips, and luxury makeup trends.",
};

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const { locale } = await getPreferences();
  const t = getDictionary(locale);
  const isSr = locale === "sr";
  const params = await searchParams;
  const q = (params.search || "").toLowerCase();
  const category = (params.category || "").toLowerCase();
  const posts = await getBlogPosts();

  const filtered = posts.filter((post) => {
    const matchesQuery = q ? post.title.toLowerCase().includes(q) || post.content.toLowerCase().includes(q) : true;
    const matchesCategory = category ? post.category.toLowerCase() === category : true;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="section container-px mx-auto max-w-7xl">
      <p className="text-xs uppercase tracking-[0.25em] text-accent">Blog</p>
      <h1 className="mt-3 text-5xl">
        {isSr ? "Beauty saveti i znanje za pripremu mlada." : "Beauty insights and bridal prep knowledge."}
      </h1>
      <form className="mt-8 grid gap-3 rounded-2xl border border-line bg-card p-4 md:grid-cols-[1fr_220px_auto]">
        <input
          name="search"
          placeholder={isSr ? "Pretraži članke..." : "Search articles..."}
          className="rounded-xl border border-line bg-white px-3 py-2"
        />
        <select name="category" className="rounded-xl border border-line bg-white px-3 py-2">
          <option value="">{isSr ? "Sve kategorije" : "All categories"}</option>
          <option value="bridal">{isSr ? "Bridal" : "Bridal"}</option>
          <option value="trends">{isSr ? "Trendovi" : "Trends"}</option>
          <option value="tips">{isSr ? "Saveti" : "Tips"}</option>
        </select>
        <button className="rounded-xl bg-foreground px-5 py-2 text-background">{isSr ? "Filtriraj" : "Filter"}</button>
      </form>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <BlogCard key={post.id} post={post} readMoreLabel={t.common.readArticle} />
        ))}
      </div>
    </div>
  );
}
