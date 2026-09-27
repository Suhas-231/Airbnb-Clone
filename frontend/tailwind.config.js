/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        airbnb: {
          coral: '#FF385C',
          hover: '#E00B41',
          active: '#D90B63',
          dark: '#222222',
          muted: '#717171',
          secondary: '#717171',
          border: '#DDDDDD',
          'border-light': '#EBEBEB',
          'border-dark': '#B0B0B0',
          light: '#F7F7F7',
        }
      },
      fontFamily: {
        sans: [
          '"Airbnb Cereal VF"',
          'Circular',
          '-apple-system',
          'BlinkMacSystemFont',
          '"system-ui"',
          'Roboto',
          '"Helvetica Neue"',
          'sans-serif'
        ]
      },
      maxWidth: {
        'content': '1120px',
        'header': '1760px'
      },
      screens: {
        'airbnb-mobile': {'max': '743px'},
        'airbnb-tablet': {'max': '1128px'},
      }
    },
  },
  plugins: [],
}
