import { createService, deleteService, updateService } from "@/app/actions";
import { getServices } from "@/lib/data";
import { currency } from "@/lib/utils";

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-6">
      <h1 className="text-4xl">Services Management</h1>
      <form action={createService} className="rounded-2xl border border-line bg-card p-5">
        <h2 className="text-xl">Create service</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input name="name" required placeholder="Service name" className="rounded-xl border border-line bg-white px-3 py-2" />
          <input name="duration" type="number" required placeholder="Duration in minutes" className="rounded-xl border border-line bg-white px-3 py-2" />
          <input name="price" type="number" step="0.01" required placeholder="Price" className="rounded-xl border border-line bg-white px-3 py-2" />
          <textarea name="description" required placeholder="Description" className="rounded-xl border border-line bg-white px-3 py-2 md:col-span-2" />
        </div>
        <button className="mt-4 rounded-xl bg-foreground px-4 py-2 text-background">Add Service</button>
      </form>
      <div className="space-y-3">
        {services.map((service) => (
          <article key={service.id} className="rounded-2xl border border-line bg-card p-4">
            <form action={updateService} className="grid gap-3 md:grid-cols-4">
              <input name="id" value={service.id} readOnly hidden />
              <input
                name="name"
                defaultValue={service.name}
                className="rounded-xl border border-line bg-white px-3 py-2 text-sm"
              />
              <input
                name="duration"
                type="number"
                defaultValue={service.duration}
                className="rounded-xl border border-line bg-white px-3 py-2 text-sm"
              />
              <input
                name="price"
                type="number"
                step="0.01"
                defaultValue={Number(service.price)}
                className="rounded-xl border border-line bg-white px-3 py-2 text-sm"
              />
              <div className="flex items-center gap-2 md:justify-end">
                <button className="rounded-lg border border-line px-3 py-1 text-sm">Save</button>
                <button formAction={deleteService} className="rounded-lg border border-line px-3 py-1 text-sm">
                  Delete
                </button>
              </div>
              <textarea
                name="description"
                defaultValue={service.description}
                className="rounded-xl border border-line bg-white px-3 py-2 text-sm md:col-span-4"
              />
              <p className="text-xs text-foreground/70 md:col-span-4">
                Current: {service.duration} min • {currency(Number(service.price))}
              </p>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
