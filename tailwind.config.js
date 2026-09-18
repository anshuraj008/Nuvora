/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fdf4f5',
          100: '#fbe8ea',
          200: '#f7d5d8',
          300: '#f0b3b9',
          400: '#e4858f',
          500: '#ff4d67', // Primary vibrant Nuvora brand coral/pink
          600: '#e63956',
          700: '#c22340',
          800: '#a12038',
          900: '#861f33',
          950: '#4a0b17',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          800: '#1e293b',
          900: '#0f172a',
          950: '#090d16',
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'float': '0 10px 30px -4px rgba(255, 77, 103, 0.25)',
        'glow': '0 0 20px rgba(255, 77, 103, 0.35)',
      }
    },
  },
  plugins: [],
}
