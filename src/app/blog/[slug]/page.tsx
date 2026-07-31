import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { getBlogPost, getBlogPosts } from "@/lib/data";
import { BlogCard } from "@/components/shared/blog-card";
import { getPreferences } from "@/lib/preferences";
import { getDictionary } from "@/lib/i18n";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.content.slice(0, 150),
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { locale } = await getPreferences();
  const t = getDictionary(locale);
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const posts = await getBlogPosts();
  const related = posts.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <div className="section container-px mx-auto max-w-5xl">
      <p className="text-xs uppercase tracking-[0.25em] text-accent">{post.category}</p>
      <h1 className="mt-3 text-5xl">{post.title}</h1>
      <p className="mt-2 text-sm text-foreground/65">{format(new Date(post.createdAt), "MMMM d, yyyy")}</p>
      <div className="relative mt-8 h-[420px] overflow-hidden rounded-3xl border border-line">
        <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
      </div>
      <article
        className="mt-8 max-w-none rounded-3xl border border-line bg-card p-8 leading-8 text-foreground/85"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <section className="mt-14">
        <h2 className="text-3xl">{t.common.relatedPosts}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {related.map((item) => (
            <BlogCard key={item.id} post={item} readMoreLabel={t.common.readArticle} />
          ))}
        </div>
      </section>
    </div>
  );
}
