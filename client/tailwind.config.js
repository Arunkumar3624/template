/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        smoke: {
          50: '#F9F9F7',
          100: '#F3F3F0',
          200: '#E7E6E1',
          300: '#D7D5CE',
          400: '#B4B1A7',
          500: '#8C897E',
          600: '#67645A',
          700: '#4A4842',
          800: '#302E2A',
          900: '#1C1B18',
        },
        accent: {
          DEFAULT: '#2F6F4E',
          light: '#3F8A63',
          dark: '#255838',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
