/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js, ts, jsx, tsx}",
    "./src/**/*.html",
    "./src/components/**/*.tsx",
  ],
  theme: {
    extend: {},
    container:{
      padding:{
        md:"8rem"
      },
    },
  },
  plugins: [],
};
