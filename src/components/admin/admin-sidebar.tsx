import Link from "next/link";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/availability", label: "Availability" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/services", label: "Services" },
];

export function AdminSidebar() {
  return (
    <aside className="h-fit rounded-2xl border border-line bg-card p-5">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/70">Dashboard</p>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="block rounded-xl px-3 py-2 text-sm hover:bg-muted">
            {link.label}
          </Link>
        ))}
        <form action="/admin/logout" method="post">
          <button className="mt-3 block w-full rounded-xl border border-line px-3 py-2 text-left text-sm">Logout</button>
        </form>
      </nav>
    </aside>
  );
}
