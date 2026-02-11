/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#effef4',
          100: '#dafce6',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#064e3b',
          950: '#03291f',
        },
        accent: {
          50: '#f4fff6',
          100: '#ddfbe7',
          200: '#bef6cf',
          300: '#88e7a8',
          400: '#52ce7f',
          500: '#2daf63',
          600: '#1f8e4f',
          700: '#1a7141',
          800: '#175937',
          900: '#144a2f',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        brand: {
          darkGreen: '#064e3b',
          lightGreen: '#bbf7d0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        'soft': '0 2px 8px 0 rgba(6, 78, 59, 0.06), 0 1px 2px 0 rgba(6, 78, 59, 0.04)',
        'soft-lg': '0 10px 40px 0 rgba(6, 78, 59, 0.1), 0 2px 8px 0 rgba(6, 78, 59, 0.08)',
        'soft-xl': '0 20px 60px 0 rgba(6, 78, 59, 0.12), 0 4px 16px 0 rgba(6, 78, 59, 0.08)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(6, 78, 59, 0.08)',
        'glow': '0 0 20px rgba(34, 197, 94, 0.35)',
        'glow-lg': '0 0 40px rgba(34, 197, 94, 0.28)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(at 20% 20%, rgba(187,247,208,0.45) 0px, transparent 50%), radial-gradient(at 80% 10%, rgba(34,197,94,0.3) 0px, transparent 50%), radial-gradient(at 30% 80%, rgba(6,78,59,0.25) 0px, transparent 50%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.4s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'fade-in-down': 'fadeInDown 0.4s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'scale-in': 'scaleIn 0.35s ease-out forwards',
        'slide-in-right': 'slideInRight 0.45s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'slide-in-left': 'slideInLeft 0.45s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'float': 'float 7s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient-shift': 'gradientShift 10s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
