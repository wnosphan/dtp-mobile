/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF385C',
        background: '#F5F5F5',
        foreground: '#1A1A1A',
        secondary: '#5856D6',
      },
    },
  },
  plugins: [],
}; 