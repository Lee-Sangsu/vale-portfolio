/** @type {import("prettier").Config} */
const config = {
  // Sorts Tailwind utility classes in a consistent order. The plugin is already
  // a devDependency; without this config Prettier never loads it.
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
