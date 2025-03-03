/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}", "node_modules/flowbite/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'purplewinkle': '#6A4C9C', 
        'gray-transparent': 'rgba(255, 255, 255, 0.2)',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}

