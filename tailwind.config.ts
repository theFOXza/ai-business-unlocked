import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1B3A5C',
        blue: '#2B7BD5',
        accent: '#4FC3F7',
        text: '#1A1A2E',
        success: '#22C55E',
        urgent: '#EF4444',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(27, 58, 92, 0.35)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(79,195,247,0.25), transparent 55%)',
      },
    },
  },
  plugins: [],
};

export default config;
