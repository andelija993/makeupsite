import { createPortfolioItem, deletePortfolioItem, updatePortfolioItem } from "@/app/actions";
import { getPortfolio } from "@/lib/data";
import { ImageUpload } from "@/components/admin/image-upload";

const categories = ["BRIDAL", "EVENING", "NATURAL", "PHOTOSHOOT", "BEFORE_AFTER"];

export default async function AdminPortfolioPage() {
  const items = await getPortfolio();

  return (
    <div className="space-y-6">
      <h1 className="text-4xl">Portfolio Management</h1>
      <form action={createPortfolioItem} className="rounded-2xl border border-line bg-card p-5">
        <h2 className="text-xl">Add portfolio item</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input name="title" required placeholder="Title" className="rounded-xl border border-line bg-white px-3 py-2" />
          <select name="category" required className="rounded-xl border border-line bg-white px-3 py-2">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.replace("_", " ")}
              </option>
            ))}
          </select>
          <textarea name="description" required placeholder="Description" className="rounded-xl border border-line bg-white px-3 py-2 md:col-span-2" />
          <div className="md:col-span-2">
            <ImageUpload name="imageUrl" />
          </div>
        </div>
        <button className="mt-4 rounded-xl bg-foreground px-4 py-2 text-background">Add Item</button>
      </form>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-line bg-card p-4">
            <form action={updatePortfolioItem} className="space-y-2">
              <input name="id" value={item.id} readOnly hidden />
              <input name="title" defaultValue={item.title} className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm" />
              <select name="category" defaultValue={item.category} className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm">
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.replace("_", " ")}
                  </option>
                ))}
              </select>
              <input name="imageUrl" defaultValue={item.imageUrl} className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm" />
              <textarea
                name="description"
                defaultValue={item.description}
                className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm"
              />
              <div className="flex gap-2">
                <button className="rounded-lg border border-line px-3 py-1 text-sm">Save</button>
                <button formAction={deletePortfolioItem} className="rounded-lg border border-line px-3 py-1 text-sm">
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
