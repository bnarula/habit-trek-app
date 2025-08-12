/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        trekGreen: "#2a9d8f",   // Completed paths/milestones
        trekOrange: "#f77f00",  // Current milestone marker
        trekGray: "#ccc",       // Incomplete paths
        trekBg: "#f1f1f1",      // Background
      },
    },
  },
  plugins: [],
}
