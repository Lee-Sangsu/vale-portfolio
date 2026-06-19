/**
 * Thin dark band that separates the hero from the body — the Figma
 * "community strip". Used on most pages.
 */
export function CommunityStrip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#111] py-5 text-center">
      <p className="mx-auto max-w-[1000px] px-5 font-inter text-[14px] font-medium text-white/85 sm:text-[15px]">
        {children}
      </p>
    </div>
  );
}
