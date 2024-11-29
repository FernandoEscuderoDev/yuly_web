/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        catchyMager: ["CarchyMager", "arial"],
        codecPro: ["CodecPro", "arial"],
      },
      colors: {
        fuchsia: {
          50: "#FCE5FF",
          100: "#FACCFF",
          200: "#F599FF",
          300: "#F066FF",
          400: "#EB33FF",
          500: "#E200FD",
          600: "#B800CC",
          700: "#8A0099",
          800: "#5C0066",
          900: "#2E0033",
          950: "#030003",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
