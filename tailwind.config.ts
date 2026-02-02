import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/react/node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          "custom-gradient": "linear-gradient(to bottom, #414442 50%, #EBE9E9 50%)"
      },
    },
  },
  plugins: [
    heroui(),
    //   {
    //   layout: {
    //     dividerWeight: "1.5px",
    //   },
    // }
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
  ],
};
export default config;
