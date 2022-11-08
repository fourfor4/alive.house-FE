/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white: "#E8ECE2",
      green: "#53E1AD",
      yellow: "#FBD200",
      red: "#ff665c",
      gray: "#242430",
      black: "#000",
    },
  },
  extend: {
    fontFamily: {
      sans: ["Nuform Sans"],
    },
    backgroundImage: {
      'hero': "url('./public/Images/background.png')",
    }
  },
  plugins: [],
};
