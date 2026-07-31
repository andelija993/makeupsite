import { createAvailabilitySlot, deleteAvailabilitySlot } from "@/app/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminAvailabilityPage() {
  const hasDatabase = Boolean(process.env.DATABASE_URL);
  const slots = hasDatabase
    ? await prisma.availabilitySlot.findMany({
        orderBy: [{ date: "asc" }, { startTime: "asc" }],
      })
    : [];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl">Availability Management</h1>
      <form action={createAvailabilitySlot} className="rounded-2xl border border-line bg-card p-5">
        <h2 className="text-xl">Add availability slot</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <input name="date" type="date" required className="rounded-xl border border-line bg-white px-3 py-2" />
          <input name="startTime" type="time" required className="rounded-xl border border-line bg-white px-3 py-2" />
          <input name="endTime" type="time" required className="rounded-xl border border-line bg-white px-3 py-2" />
          <label className="flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-sm">
            <input name="available" type="checkbox" defaultChecked />
            Available
          </label>
        </div>
        <button className="mt-4 rounded-xl bg-foreground px-4 py-2 text-background">Save Slot</button>
      </form>

      <div className="space-y-3">
        {slots.length === 0 ? <p className="text-sm text-foreground/70">No slots created.</p> : null}
        {slots.map((slot) => (
          <article key={slot.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-card p-4">
            <p className="text-sm">
              {slot.date.toDateString()} • {slot.startTime} - {slot.endTime} • {slot.available ? "Available" : "Blocked"}
            </p>
            <form action={deleteAvailabilitySlot}>
              <input name="id" value={slot.id} readOnly hidden />
              <button className="rounded-lg border border-line px-3 py-1 text-sm">Delete</button>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
