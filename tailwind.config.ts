import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  content: [
    "./src/app/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    //consider extended instead of overwriting
    screens: {
      sm: "30rem", //480px
      md: "48rem", //768px
      lg: "64rem", //1024px
      xl: "80rem", //1280px
      xxl: "100rem", //1600px
    },
    colors: {
      bg_black: "#0F0F0F",
      primary: "#1F1F21", //dark grey
      secondary: "#8B9093", //light grey
      white: "#E9E9E9",
      link: "#4496F6", //blue
      success: "#77B184", //green
      warning: "#E85959", //red
      info: "#B17E30", //yellow
    },
    extend: {
      backgroundImage: {
        "btn-gradient":
          "linear-gradient(90deg, rgba(85, 85, 97, 0.60) 0%, #2F2F33 90%)",
      },
      fontSize: {
        "2xl": [
          "1.5rem",
          {
            lineHeight: "2rem",
            letterSpacing: "-0.01em",
            fontWeight: "500",
          },
        ],
        display: ["8.5rem", { lineHeight: "normal", fontWeight: "500" }], //136px
        h1: ["3.25rem", { lineHeight: "normal", fontWeight: "500" }], //52px
        h2: ["2rem", { lineHeight: "normal", fontWeight: "500" }], //32px
        h3: ["1.25rem", { lineHeight: "normal", fontWeight: "500" }], //20px
        h4: ["1.25rem", { lineHeight: "normal" }], //20px
        h5: ["1rem", { lineHeight: "normal" }], //16px
      },
    },
  },
  plugins: [],
};
export default config;
