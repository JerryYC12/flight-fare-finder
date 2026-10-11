import { Link, useNavigate } from "react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";
import { usePageMeta, type PageMeta } from "@/hooks/use-page-meta";

const pageMeta: PageMeta = {
  title: "Sign in — Flight Price Notifier",
  meta: [
    { name: "description", content: "Sign in or create your Flight Price Notifier account." },
    { property: "og:title", content: "Sign in — Flight Price Notifier" },
    { property: "og:description", content: "Sign in or create your Flight Price Notifier account." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ],
};

export function AuthPage({ mode }: { mode: "signin" | "signup" }) {
  usePageMeta(pageMeta);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isSignup = mode === "signup";

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate("/app", { replace: true });
    });
  }, [navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = isSignup
      ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } })
      : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    navigate("/app", { replace: true });
  }

  const input = "w-full rounded-lg border bg-input/30 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40";

  return (
    <div className="relative grid min-h-screen place-items-center px-6">
      <div className="pointer-events-none absolute inset-0 bg-glow" />
      <div className="relative w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <div className="rounded-2xl border bg-card p-8">
          <h1 className="text-2xl font-semibold">{isSignup ? "建立帳號 · Sign up" : "登入 · Sign in"}</h1>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <input className={input} type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className={input} type="password" required minLength={6} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button disabled={loading} className="w-full rounded-lg bg-primary py-3 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-90 disabled:opacity-50">
              {loading ? "…" : isSignup ? "Sign up" : "Sign in"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignup ? "已經有帳號？" : "還沒有帳號？"}{" "}
            <Link to={isSignup ? "/sign-in" : "/sign-up"} className="text-accent hover:underline">
              {isSignup ? "Sign in" : "Sign up"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
