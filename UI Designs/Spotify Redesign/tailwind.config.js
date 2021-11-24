module.exports = {
  mode: 'jit', 
  purge: [
    './src/**/*.html'
   ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "primary": "#49e12e",
        "alt": "#8f8f8f",
        "alt2": "#b1b1b1",
        "alt3": "#c5c5c5",
        "alt4": "#cecece",
        "border": "#373737",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
