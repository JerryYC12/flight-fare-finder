import { createFileRoute, Link } from "@tanstack/react-router";
import { Radar, BellRing, CalendarX } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flight Price Notifier — 機票降價通知" },
      { name: "description", content: "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops." },
      { property: "og:title", content: "Flight Price Notifier — 機票降價通知" },
      { property: "og:description", content: "Set a route and a target price — we email you when the fare drops." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  { icon: Radar, title: "盯緊熱門航線", en: "Always-on route watching", body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。" },
  { icon: BellRing, title: "達標自動通知", en: "Target-price email alerts", body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。" },
  { icon: CalendarX, title: "隨時取消", en: "Cancel anytime", body: "月訂閱制，不想用隨時停，沒有綁約。" },
];

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-glow" />
      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo />
        <Link to="/auth" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-90">
          Sign in / 登入
        </Link>
      </header>

      <main className="relative">
        <section className="mx-auto max-w-4xl px-6 pb-24 pt-20 text-center md:pt-32">
          <Reveal>
            <p className="mb-6 inline-block rounded-full border px-3 py-1 text-xs text-muted-foreground">台北出發 · 東京 · 首爾</p>
            <h1 className="text-gradient text-5xl font-bold tracking-tight md:text-7xl">Flight Price Notifier</h1>
            <p className="mt-6 text-xl font-medium md:text-2xl">設定航線與目標價，機票降價就通知你</p>
            <p className="mt-3 text-muted-foreground">Set a route and a target price — we email you when the fare drops.</p>
            <Link to="/auth" search={{ mode: "signup" }} className="mt-10 inline-block rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground shadow-glow transition hover:opacity-90">
              開始使用 · Get started
            </Link>
          </Reveal>
        </section>

        <section className="mx-auto grid max-w-6xl gap-5 px-6 pb-28 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 120}>
              <div className="h-full rounded-2xl border bg-card p-7 transition hover:border-primary/50">
                <f.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.en}</p>
                <p className="mt-4 text-sm leading-relaxed text-card-foreground/80">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </section>
      </main>

      <footer className="relative border-t py-8 text-center text-sm text-muted-foreground">© 2026 Flight Price Notifier</footer>
    </div>
  );
}
