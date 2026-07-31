import { prisma } from "@/lib/prisma";
import { updateBookingStatus } from "@/app/actions";

export default async function AdminBookingsPage() {
  const hasDatabase = Boolean(process.env.DATABASE_URL);
  const bookings = hasDatabase
    ? await prisma.booking.findMany({
        orderBy: [{ date: "asc" }, { time: "asc" }],
        include: { service: true },
      })
    : [];

  return (
    <div className="space-y-5">
      <h1 className="text-4xl">Booking Management</h1>
      <div className="space-y-3">
        {bookings.length === 0 ? <p className="text-sm text-foreground/70">No bookings found.</p> : null}
        {bookings.map((booking) => (
          <article key={booking.id} className="rounded-2xl border border-line bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl">{booking.clientName}</h2>
              <p className="text-xs uppercase tracking-wider text-accent">{booking.status}</p>
            </div>
            <p className="mt-2 text-sm text-foreground/75">
              {booking.service.name} • {booking.date.toDateString()} at {booking.time}
            </p>
            <p className="mt-1 text-sm">{booking.email} • {booking.phone}</p>
            <form action={updateBookingStatus} className="mt-4 flex flex-wrap gap-2">
              <input name="id" value={booking.id} readOnly hidden />
              <button name="status" value="CONFIRMED" className="rounded-xl border border-line px-3 py-1 text-sm">
                Accept
              </button>
              <button name="status" value="REJECTED" className="rounded-xl border border-line px-3 py-1 text-sm">
                Reject
              </button>
              <button name="status" value="CANCELLED" className="rounded-xl border border-line px-3 py-1 text-sm">
                Cancel
              </button>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
