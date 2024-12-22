/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        catchyMager: ["CarchyMager", "arial"],
        codecPro: ["CodecPro", "arial"],
        rasputin: ["Rasputin", "arial"],
      },
      backgroundImage:{
        'bg-image': "url('https://cdn.sanity.io/images/1q969eeu/production/833cbdf0d8b7e6fe41939e206cda1c3887710778-4000x2000.png?w=1920&h=960&fm=webp&q=80')"
      },
      colors: {
        fuchsia: {
          50: "#FFE5FA",
          100: "#FFCCF5",
          200: "#FF99EB",
          300: "#FF66E0",
          400: "#FF33D6",
          500: "#FF00CC",
          600: "#CC00A3",
          700: "#99007A",
          800: "#660052",
          900: "#330029",
          950: "#000003",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
