/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './components/**/*.{vue,js,ts}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './app.vue',
    ],
    theme: {
      extend: {
        colors: {
          pink: {
            50: '#fdf2f8',
            100: '#fce7f3',
            200: '#fbcfe8',
            300: '#f9a8d4',
            400: '#f472b6',
            500: '#E91E63',
            600: '#db2777',
            700: '#be185d',
            800: '#9d174d',
            900: '#831843',
          },
        },
        fontFamily: {
          satoshi: ['Satoshi', 'sans-serif'],
          playfair: ['Playfair Display', 'serif'],
        },
        spacing: {
          '25': '6.25rem',
          '30': '7.5rem',
          '40': '10rem',
        },
      },
    },
    plugins: [],
  }