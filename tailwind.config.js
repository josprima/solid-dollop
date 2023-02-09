const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {},
    colors: {
      primary: '#6914D8',
      ...colors,
    },
  },
  plugins: [],
};
