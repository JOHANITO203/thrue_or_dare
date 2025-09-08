/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-dice': 'spin-dice 1s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in-left': 'slide-in-left 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-scale-in': 'fade-scale-in 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-in': 'bounce-in 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      perspective: {
        '1000': '1000px',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(255, 255, 255, 0.1)',
        'glass-lg': '0 12px 40px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
};
