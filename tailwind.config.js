/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ['./views/**/*.hbs', './public/**/*.html', './public/**/*.js'],
    options: {
      safelist: [], // Specify patterns of classes that should not be removed.
    }
  },
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}