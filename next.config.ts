import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Next 16 defaults the allowed-quality list to [75] and silently coerces
    // any other `quality` prop to the nearest allowed value. The home hero
    // portrait requests quality={92}, so 92 must be in the allowlist for that
    // higher fidelity to actually be served.
    qualities: [75, 92],
  },
};

export default withNextIntl(nextConfig);
