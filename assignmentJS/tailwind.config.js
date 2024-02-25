/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'shantell': ["Shantell Sans", "cursive"],
      },
      width: {
        mainWidth: '700px',
        triangleSize: '100px'
      },
      colors: {
        primary: '#aad8ff',
        secondary: '#b6ffed',
        danger: '#dc4d01',
        'danger-bg': '#f87217',
        warning: '#f4bc1c',
        "warning-bg": '#c49102',
        safe: '#64fcc9',
        'safe-bg': '#008b8b',
        submit: '#69d84f',
        error: '#f02d20'
      },
    },
  },
  plugins: [],
}