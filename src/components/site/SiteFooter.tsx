import { contact } from "@/content/about";

/** Slim footer below the contact block. */
export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-white px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="font-display text-[22px] text-ink2">Portfolio</span>
        <div className="flex items-center gap-5 font-inter text-[13px] text-muted">
          <a href={contact.instagram} target="_blank" rel="noreferrer" className="hover:text-ink2">
            Instagram
          </a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink2">
            LinkedIn
          </a>
          <a href={`mailto:${contact.email}`} className="hover:text-ink2">
            Email
          </a>
        </div>
        <span className="font-inter text-[12px] text-muted">© 2026 Valeria Jiménez</span>
      </div>
    </footer>
  );
}
