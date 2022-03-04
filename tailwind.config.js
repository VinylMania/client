module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // background: '#fff', //'#55423d',
        // headline: '#000', //'#fffffe',
        // paragraph: '#000', // '#fff3ec',
        // button: '#000', // '#ffc0ad',
        // buttonText: '#fff', // '#271c19',

        background: '#55423d',
        headline: '#fffffe',
        paragraph: '#fff3ec',
        button: '#ffc0ad',
        buttonText: '#271c19',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
