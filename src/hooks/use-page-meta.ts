import { useEffect } from "react";

export type PageMeta = {
  title?: string;
  meta?: Array<{ name: string; content: string } | { property: string; content: string }>;
};

/**
 * Sets document.title and <meta> tags for the current page, and restores the
 * previous values when the page unmounts (replaces TanStack Router's `head`).
 */
export function usePageMeta({ title, meta = [] }: PageMeta) {
  const key = JSON.stringify({ title, meta });

  useEffect(() => {
    const previousTitle = document.title;
    if (title !== undefined) document.title = title;

    const restore = meta.map((entry) => {
      const [attr, value] = "name" in entry ? ["name", entry.name] : ["property", entry.property];
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${value}"]`);
      const created = !el;
      const previousContent = el?.getAttribute("content") ?? null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
      el.setAttribute("content", entry.content);
      const target = el;
      return () => {
        if (created) target.remove();
        else if (previousContent !== null) target.setAttribute("content", previousContent);
      };
    });

    return () => {
      document.title = previousTitle;
      restore.forEach((fn) => fn());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
