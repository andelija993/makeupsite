import { loginAction } from "@/app/actions";

type SearchParams = Promise<{ next?: string; error?: string }>;

export default async function AdminLoginPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const nextPath = params.next || "/admin";
  const error = params.error || "";

  return (
    <div className="container-px mx-auto grid min-h-[75vh] max-w-lg place-items-center py-12">
      <form action={loginAction} className="w-full rounded-3xl border border-line bg-card p-7">
        <h1 className="text-3xl">Admin Login</h1>
        <p className="mt-2 text-sm text-foreground/70">Sign in to manage bookings, availability, and content.</p>
        <input name="next" value={nextPath} readOnly hidden />
        <div className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input name="email" type="email" required className="mt-2 w-full rounded-xl border border-line bg-white px-3 py-2" />
          </div>
          <div>
            <label className="text-sm font-semibold">Password</label>
            <input name="password" type="password" required className="mt-2 w-full rounded-xl border border-line bg-white px-3 py-2" />
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button className="w-full rounded-xl bg-foreground px-4 py-2 text-background">Sign in</button>
        </div>
      </form>
    </div>
  );
}
