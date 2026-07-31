import { prisma } from "@/lib/prisma";
import { getServices } from "@/lib/data";

export default async function AdminOverviewPage() {
  const hasDatabase = Boolean(process.env.DATABASE_URL);
  const services = await getServices();
  const totalServices = services.length;

  const [upcoming, totalBookings, messages] = hasDatabase
    ? await Promise.all([
        prisma.booking.findMany({
          where: { date: { gte: new Date() } },
          orderBy: { date: "asc" },
          take: 5,
          include: { service: true },
        }),
        prisma.booking.count(),
        prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      ])
    : [[], 0, [] as { id: string; name: string; message: string; createdAt: Date }[]];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl">Admin Overview</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-line bg-card p-5">
          <p className="text-sm text-foreground/70">Upcoming Appointments</p>
          <p className="mt-2 text-3xl font-semibold">{upcoming.length}</p>
        </article>
        <article className="rounded-2xl border border-line bg-card p-5">
          <p className="text-sm text-foreground/70">Total Bookings</p>
          <p className="mt-2 text-3xl font-semibold">{totalBookings}</p>
        </article>
        <article className="rounded-2xl border border-line bg-card p-5">
          <p className="text-sm text-foreground/70">Published Services</p>
          <p className="mt-2 text-3xl font-semibold">{totalServices}</p>
        </article>
      </div>
      <div className="rounded-2xl border border-line bg-card p-6">
        <h2 className="text-2xl">Upcoming appointments</h2>
        <div className="mt-4 space-y-3">
          {upcoming.length === 0 ? <p className="text-sm text-foreground/70">No upcoming bookings yet.</p> : null}
          {upcoming.map((booking) => (
            <div key={booking.id} className="rounded-xl border border-line p-3 text-sm">
              {booking.clientName} • {booking.service.name} • {booking.date.toDateString()} at {booking.time}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-line bg-card p-6">
        <h2 className="text-2xl">Recent messages</h2>
        <div className="mt-4 space-y-3">
          {messages.length === 0 ? <p className="text-sm text-foreground/70">No messages yet.</p> : null}
          {messages.map((message) => (
            <div key={message.id} className="rounded-xl border border-line p-3 text-sm">
              <p className="font-semibold">{message.name}</p>
              <p className="text-foreground/75">{message.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
