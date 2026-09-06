import { contact } from "@/content/about";

function InstagramIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="8" fill="#2a2a2a" />
      <circle cx="14" cy="14" r="5.5" stroke="white" strokeWidth="2" />
      <circle cx="20.75" cy="7.25" r="1.75" fill="white" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="8" fill="#2a2a2a" />
      <circle cx="9.5" cy="9.5" r="1.4" fill="white" />
      <rect x="8.3" y="12" width="2.4" height="9" rx="1" fill="white" />
      <rect x="13" y="12" width="2.4" height="9" rx="1" fill="white" />
      <path
        d="M15.4 14.5C15.4 13.1193 16.5193 12 17.9 12C19.2807 12 20.4 13.1193 20.4 14.5V21H18V15C18 14.4477 17.5523 14 17 14C16.4477 14 16 14.4477 16 15V14.5H15.4Z"
        fill="white"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="8" fill="#2a2a2a" />
      <rect x="6" y="9" width="16" height="11" rx="2" stroke="white" strokeWidth="1.8" />
      <path
        d="M6.5 9.5L14 15L21.5 9.5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
