const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  theme: {
    fontFamily: {
      sans: ['Karla', ...defaultTheme.fontFamily.mono],
    },
    colors: {
      'spring-green': '#00ed64',
      'forest-green': '#00684a',
      'slate-blue': '#001e2b',
      evergreen: '#023430',
      black: '#000000',
      white: '#ffffff',
    },
  },
  plugins: [],
};
