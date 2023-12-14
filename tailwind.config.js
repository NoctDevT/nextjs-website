

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    typography: (theme) => ({}),
    extend: {
      animation: {
        'bounce-slow': 'bounce 5s linear infinite',
        'animation-hover': 'bounce 5s linear infinite hover',
        'bounce-item': 'ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'
      }
    },
  },
  plugins: [require('@tailwindcss/typography')]
}

