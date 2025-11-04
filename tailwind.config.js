/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Barbie theme colors
        'pink': {
          50: '#FFF0F5',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843',
        },
        'purple': {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7C3AED',
          800: '#6B21A8',
          900: '#581C87',
        },
        // Horror theme colors
        'horror-purple': '#4B0082',
        'horror-red': '#8B0000',
        'horror-dark': '#1A0B2E',
        
        // Theme colors
        primary: '#EC4899',
        'primary-hover': '#DB2777',
        secondary: '#A855F7',
        accent: '#F472B6',
      },
      fontFamily: {
        'sans': ['Nunito', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        'container': '12px',
      },
      spacing: {
        'section': '2rem',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'spooky-glow': 'spookyGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(244, 194, 194, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(244, 194, 194, 0.8), 0 0 30px rgba(203, 170, 203, 0.6)' },
        },
        spookyGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(139, 0, 0, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(139, 0, 0, 0.8), 0 0 30px rgba(75, 0, 130, 0.6)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
