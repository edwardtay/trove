"use client";

import { useEffect, useState } from "react";
import type { Section } from "./sections";

export default function TableOfContents({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-15% 0% -70% 0%", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto pr-4">
      <div className="mb-4 flex items-baseline gap-2">
        <span className="h-px w-4 bg-rule" aria-hidden />
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
          Contents
        </span>
      </div>
      <ul className="space-y-px text-[13px]">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`group relative flex items-center gap-2.5 py-1.5 pl-4 pr-2 transition-colors ${
                  isActive
                    ? "font-medium text-ink"
                    : "text-ink-subtle hover:text-ink"
                }`}
              >
                <span
                  className={`absolute left-0 top-1/2 h-3 w-px -translate-y-1/2 transition-all ${
                    isActive
                      ? "h-4 bg-emerald-600"
                      : "bg-hairline group-hover:bg-rule"
                  }`}
                  aria-hidden
                />
                {s.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
