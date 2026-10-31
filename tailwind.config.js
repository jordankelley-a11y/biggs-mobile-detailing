/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0b', // near-black page background
        charcoal: '#131316', // dark section background
        panel: '#1a1a1e', // cards
        line: '#2a2a2f', // dividers / borders
        silver: '#a9acb2', // secondary text
        accent: {
          DEFAULT: '#c1121f', // brand red: booking buttons + small accents
          hover: '#a30f1a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        wider2: '0.18em',
      },
    },
  },
  plugins: [],
};
