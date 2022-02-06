module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        first: '#f8efd4',
        second: '#132743',
        third: '#d7385e',
        fourth: '#edc988',
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
