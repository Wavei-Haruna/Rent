/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*{jsx, html, js}"],
  theme: {
    extend: {
      colors: {
        primary: "#222b3a",
        second: "084dbe",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
