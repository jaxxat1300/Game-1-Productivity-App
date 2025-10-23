/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#F5F9F6',
          100: '#E8F3EB',
          200: '#C8E6D0',
          300: '#A8D5BA',
          400: '#8FBC8F',
          500: '#6FA76F',
          600: '#5A8B5A',
        },
        lavender: {
          50: '#FAF8FF',
          100: '#F0EBFF',
          200: '#DCD0FF',
          300: '#C7B4F0',
          400: '#B4A7D6',
          500: '#9B8BC7',
          600: '#7E6BA8',
        },
        peace: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#B0E0E6',
          300: '#87CEEB',
          400: '#5FB9D1',
          500: '#3A9DB7',
          600: '#2B7A8F',
        },
        coral: {
          50: '#FFF5F2',
          100: '#FFE8E1',
          200: '#FFDAB9',
          300: '#FFC4A3',
          400: '#FFB6A3',
          500: '#FF9B7A',
          600: '#E07856',
        },
      },
      fontFamily: {
        'display': ['Poppins', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'hover': '0 12px 40px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-soft': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

