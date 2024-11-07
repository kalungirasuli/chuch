import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors:{
        white:'#ffffff',
        black:'#2f1b07',
        yellow:'#f4c828',
        red1:'#d51515',
        brown:'#b27b45'
      },
      screens:{
        sm:'375px',
        md:'764px',
        lg:'1024px',
        xl:'1280px',
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}