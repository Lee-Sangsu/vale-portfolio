import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // public/ holds static assets and committed third-party/minified JS
    // (e.g. Notion export scripts). Linting it is meaningless and the
    // minified files make `eslint .` hang, so ignore the whole folder.
    "public/**",
  ]),
]);

export default eslintConfig;
