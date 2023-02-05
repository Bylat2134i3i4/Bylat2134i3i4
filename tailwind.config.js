/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#0A092D',
        'black-blue': '#2E3856',
      },
      screens: {
        'MinBlock': { 'raw': '(max-width: 560px)' },
        'MiddleBlock': { 'raw': '(min-width: 541px)' },
        'LargeBlock': { 'raw': '(max-width: 1500px)' },
        'sm': '501px'
      }
    },
  },
  plugins: [],
}