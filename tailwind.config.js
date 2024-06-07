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
      'yellow': '#ffee31'
    },fontFamily: {
      sans: ['Poppins', 'sans-serif']
    }
  },
  plugins: [],
}