import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          950: '#0a0a12',
          900: '#0f0f1a',
          850: '#161628',
          800: '#1e1e32',
          700: '#252540',
        },
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        playfair: ['var(--font-playfair)'],
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
