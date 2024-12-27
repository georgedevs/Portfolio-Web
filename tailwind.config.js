/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'departure': ['Departure Mono', 'monospace'],
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      colors: {
        // Dark theme colors
        dark: {
          DEFAULT: '#000000',
          accent: '#18181b',
          hover: '#27272a'
        },
        // Navy theme colors
        navy: {
          DEFAULT: '#0A192F',
          accent: '#112240',
          hover: '#1B2C4F'
        },
        // Forest theme colors
        forest: {
          DEFAULT: '#0B3B2F',
          accent: '#124B3E',
          hover: '#1A5A4C'
        },
        // Purple theme colors
        royal: {
          DEFAULT: '#2D1B69',
          accent: '#382180',
          hover: '#432796'
        }
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}