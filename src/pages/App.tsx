import { useNavigate, useRouteLoaderData } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";
import { usePageMeta, type PageMeta } from "@/hooks/use-page-meta";
import type { AuthenticatedData } from "@/app/routes";

const pageMeta: PageMeta = {
  title: "Dashboard — Flight Price Notifier",
  meta: [
    { name: "description", content: "Your Flight Price Notifier dashboard." },
    { property: "og:title", content: "Dashboard — Flight Price Notifier" },
    { property: "og:description", content: "Your Flight Price Notifier dashboard." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ],
};

export function AppPage() {
  usePageMeta(pageMeta);
  // Provided by the `requireUser` loader on the "authenticated" route, which redirects
  // signed-out visitors before this component renders.
  const { user } = useRouteLoaderData("authenticated") as AuthenticatedData;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate("/sign-in", { replace: true });
  }

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 bg-glow" />
      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo />
        <button onClick={signOut} className="rounded-lg border px-4 py-2 text-sm transition hover:border-primary/60 hover:bg-secondary">
          Sign out / 登出
        </button>
      </header>
      <main className="relative mx-auto max-w-3xl px-6 py-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl font-bold md:text-4xl">Hi <span className="text-gradient">{user.email}</span></h1>
        <div className="mt-8 rounded-2xl border bg-card p-8">
          <p className="text-lg">你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。</p>
          <p className="mt-3 text-sm text-muted-foreground">Your dashboard is coming soon. Route-subscription will be added in the next milestone.</p>
        </div>
      </main>
    </div>
  );
}
