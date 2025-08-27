import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
};

export default config;