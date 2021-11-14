const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      cyan: colors.cyan,
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      blue: colors.blue,
      green: colors.emerald,
      fuschia: colors.fuchsia,
      violet: colors.violet,
      first: '#f8efd4',
      second: '#132743',
      third: '#d7385e',
      fourth: '#edc988',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
