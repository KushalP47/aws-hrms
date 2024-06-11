/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#1c212d',
      'yellow': '#ffee31',
      'green': '#e9fffe',
      'green-dark': '#2d6a4f',
      'gray': '#f5f6f9',
      'red': '#eb9f9f',
      'red-dark': '#e74c3c',
    },fontFamily: {
      sans: ['Poppins', 'sans-serif']
    }
  },
  plugins: [],
}