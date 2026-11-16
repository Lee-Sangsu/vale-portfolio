"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

/** Strips tracking parameters and keeps the canonical post or reel URL Instagram's embed script expects. */
function canonical(url: string) {
  const m = url.match(/instagram\.com\/(?:[A-Za-z0-9_.]+\/)?(p|reel|reels)\/([A-Za-z0-9_-]+)/);
  return m ? `https://www.instagram.com/${m[1] === "reels" ? "reel" : m[1]}/${m[2]}/` : url;
}

export type EmbedGroup = { title?: string; urls: string[] };

/**
 * Live Instagram posts, rendered with Instagram's official embed: caption, likes and the carousel, straight from the account.
 * Only public posts render; a private or deleted post shows Instagram's own placeholder.
 * Groups with a title become sub-rows (one program, one edition...).
 */
export function InstagramEmbeds({ groups, title, note }: { groups: EmbedGroup[]; title: string; note?: string }) {
  const all = groups.flatMap((g) => g.urls).join("|");
  useEffect(() => {
    const run = () => window.instgrm?.Embeds.process();
    if (window.instgrm) {
      run();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://www.instagram.com/embed.js"]');
    if (existing) {
      existing.addEventListener("load", run, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.addEventListener("load", run, { once: true });
    document.body.appendChild(script);
  }, [all]);

  if (!groups.some((g) => g.urls.length)) return null;
  return (
    <section className="bg-white py-24 sm:py-36">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="text-center">
          <h2 className="font-inter text-ink2 text-[32px] leading-tight font-semibold">{title}</h2>
          {note ? <p className="font-inter mt-2 text-[14px] text-[#9aa09a]">{note}</p> : null}
        </div>
        {groups.map((group, gi) => (
          <div key={gi} className={gi === 0 ? "mt-12" : "mt-20"}>
            {group.title ? (
              <h3 className="font-inter text-ink2 mb-8 text-center text-[20px] font-semibold">{group.title}</h3>
            ) : null}
            <div className="flex flex-wrap items-start justify-center gap-6">
              {group.urls.map((url) => {
                const href = canonical(url);
                return (
                  <blockquote
                    key={href}
                    className="instagram-media w-full max-w-[400px] min-w-[300px] rounded-[16px] border border-[#e2e2dd] bg-white lg:w-[calc((100%-3rem)/3)] lg:max-w-none"
                    data-instgrm-permalink={href}
                    data-instgrm-version="14"
                    style={{ margin: 0 }}
                  >
                    <a href={href} target="_blank" rel="noreferrer" className="font-inter block p-6 text-[14px] text-[#555]">
                      {href}
                    </a>
                  </blockquote>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
