/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#f0f7f4',
          100: '#d9ede6',
          200: '#b3dbcd',
          300: '#7dbfab',
          400: '#4d9e87',
          500: '#2f7d65',
          600: '#246350',
          700: '#1f5042',
          800: '#1c4038',
          900: '#1a372f',
          950: '#2D4A3E',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'fade-in':   'fadeIn 0.4s ease-out',
        'slide-up':  'slideUp 0.4s ease-out',
        'spin-slow': 'spin 1.2s linear infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        keenkeeper: {
          primary:    '#2D4A3E',
          secondary:  '#4d9e87',
          accent:     '#246350',
          neutral:    '#1f2937',
          'base-100': '#ffffff',
          info:       '#3abff8',
          success:    '#2D4A3E',
          warning:    '#f59e0b',
          error:      '#ef4444',
        },
      },
    ],
  },
}
