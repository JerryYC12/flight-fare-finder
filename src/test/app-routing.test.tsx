import { matchRoutes } from "react-router";
import { describe, expect, it } from "vitest";

import { routes } from "@/app/routes";

// Match routes without running loaders or rendering: loaders need Supabase/network.
describe("App routing", () => {
  const leafPath = (url: string) => {
    const matches = matchRoutes(routes, url);
    return matches?.at(-1)?.route.path ?? (matches?.at(-1)?.route.index ? "(index)" : undefined);
  };

  it("matches a page for / instead of falling back to not found", () => {
    expect(leafPath("/")).toBe("(index)");
  });

  it.each(["/app", "/sign-in", "/sign-up"])("matches a page for %s", (url) => {
    expect(leafPath(url)).toBe(url.slice(1));
  });

  it("protects /app with the auth loader", () => {
    const matches = matchRoutes(routes, "/app") ?? [];
    expect(matches.some((m) => m.route.id === "authenticated" && m.route.loader)).toBe(true);
  });

  it("falls back to not found for unknown paths", () => {
    expect(leafPath("/does-not-exist")).toBe("*");
  });
});
