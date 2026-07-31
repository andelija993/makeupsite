import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

type BlogCardProps = {
  post: {
    slug: string;
    title: string;
    imageUrl: string;
    category: string;
    createdAt: Date;
    content: string;
  };
  readMoreLabel?: string;
};

export function BlogCard({ post, readMoreLabel = "Read article" }: BlogCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-line bg-card elevated">
      <div className="relative h-64 w-full">
        <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-accent">{post.category}</p>
        <h3 className="mt-2 text-2xl">{post.title}</h3>
        <p className="mt-3 text-sm text-foreground/75">
          {post.content.slice(0, 130)}
          ...
        </p>
        <div className="mt-5 flex items-center justify-between text-sm text-foreground/70">
          <span>{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
          <Link href={`/blog/${post.slug}`} className="font-semibold hover:text-accent">
            {readMoreLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
