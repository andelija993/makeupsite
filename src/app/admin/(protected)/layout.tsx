import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-px mx-auto grid max-w-7xl gap-6 py-10 md:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <div>{children}</div>
    </div>
  );
}
