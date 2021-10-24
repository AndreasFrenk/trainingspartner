module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#1F75FC',
      'secondary': '#FCA61F'
    }),
    textColor: theme => ({
      ...theme('colors'),
      'primary': '#1F75FC',
      'secondary': '#FCA61F'

    })
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
