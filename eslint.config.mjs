// ESLint flat config (ESLint 9 + eslint-config-next 16).
// Next 16 removed the built-in `next lint`, so linting now runs ESLint directly
// via `npm run lint` (`eslint .`).
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

export default [
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // Apostrophes/quotes in body copy read fine and don't need HTML entities.
      "react/no-unescaped-entities": "off",
      // Reading a persisted preference in an effect is a valid SSR-safe hydration
      // pattern here (default on the server, hydrate the stored value on the client).
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "lib/generated/**",
      "next-env.d.ts",
    ],
  },
];
