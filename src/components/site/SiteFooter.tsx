import { contact } from "@/content/about";
import { EmailIcon, InstagramIcon, LinkedInIcon } from "./SocialIcons";

/** Slim footer below the contact block. */
export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-white px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="font-display text-[22px] text-ink2">Portfolio</span>
        <div className="flex items-center gap-3">
          <a
            href={contact.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="transition-opacity hover:opacity-70"
          >
            <InstagramIcon />
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition-opacity hover:opacity-70"
          >
            <LinkedInIcon />
          </a>
          <a
            href={`mailto:${contact.email}`}
            aria-label="Email"
            className="transition-opacity hover:opacity-70"
          >
            <EmailIcon />
          </a>
        </div>
        <span className="font-inter text-[12px] text-muted">© 2026 Valeria Jiménez</span>
      </div>
    </footer>
  );
}
