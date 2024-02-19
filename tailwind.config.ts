import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        tiny: '1.125rem',
        base: '2rem',
        large: '4rem'
      },
      colors: {
        primary: '#C1DCDC',
        black: 'rgba(30, 30, 30, 1)',
        content: 'rgba(30, 30, 30, 0.75)',
        gray: 'rgba(30, 30, 30, 0.5)'
      }
    },
  },
  plugins: [],
}
export default config
