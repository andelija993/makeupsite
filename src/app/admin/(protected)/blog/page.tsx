import { createBlogPost, deleteBlogPost, updateBlogPost } from "@/app/actions";
import { getBlogPosts } from "@/lib/data";
import { ImageUpload } from "@/components/admin/image-upload";

export default async function AdminBlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="space-y-6">
      <h1 className="text-4xl">Blog Management</h1>
      <form action={createBlogPost} className="rounded-2xl border border-line bg-card p-5">
        <h2 className="text-xl">Create blog post</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input name="title" required placeholder="Title" className="rounded-xl border border-line bg-white px-3 py-2 md:col-span-2" />
          <input name="category" required placeholder="Category" className="rounded-xl border border-line bg-white px-3 py-2" />
          <div className="md:col-span-2">
            <ImageUpload name="imageUrl" />
          </div>
          <textarea name="content" required placeholder="Content" rows={8} className="rounded-xl border border-line bg-white px-3 py-2 md:col-span-2" />
        </div>
        <button className="mt-4 rounded-xl bg-foreground px-4 py-2 text-background">Publish Post</button>
      </form>
      <div className="space-y-3">
        {posts.map((post) => (
          <article key={post.id} className="rounded-2xl border border-line bg-card p-4">
            <form action={updateBlogPost} className="space-y-2">
              <input name="id" value={post.id} readOnly hidden />
              <input name="title" defaultValue={post.title} className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm" />
              <input
                name="category"
                defaultValue={post.category}
                className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm"
              />
              <input name="imageUrl" defaultValue={post.imageUrl} className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm" />
              <textarea name="content" defaultValue={post.content} rows={4} className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm" />
              <div className="flex gap-2">
                <button className="rounded-lg border border-line px-3 py-1 text-sm">Save</button>
                <button formAction={deleteBlogPost} className="rounded-lg border border-line px-3 py-1 text-sm">
                  Delete
                </button>
              </div>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
