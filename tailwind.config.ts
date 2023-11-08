import type { Config } from "tailwindcss";

const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {
      backgroundImage: {
        "orange-gradient": "var(--orange-gradient)",
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
      minHeight: { "screen-main": "calc(100vh - 72px)!important" },

    },
  },
  plugins: [],
});
export default config;