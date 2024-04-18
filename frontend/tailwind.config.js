/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js, ts, jsx, tsx}",
    "./src/**/*.html",
    "./src/components/**/*.tsx",
    "./src/pages/**/*.tsx",
    "./src/forms/**/*.tsx",
    "./src/layouts/**/*.tsx",
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
