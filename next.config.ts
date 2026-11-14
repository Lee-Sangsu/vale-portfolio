import type { NextConfig } from "next";
import { withLocalFeedbacker } from "local-feedbacker/next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // The parent folder also has a package-lock.json. Without an explicit root,
  // Turbopack picks that parent as its workspace and looks for Tailwind there.
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Next 16 only serves the qualities listed here and rounds any `quality` prop to the nearest one. Keeping a
    // single, high value makes every photo on the site (including the ones without an explicit `quality`) come out
    // at 92 instead of the default 75.
    qualities: [92],
  },
};

export default withNextIntl(withLocalFeedbacker(nextConfig));
