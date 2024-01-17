import type { Config } from 'tailwindcss'

type CSSProperties = {
  [property: string]: string | number | CSSProperties;
};
type Utility = {
  [className: string]: CSSProperties;
};
type AddUtilities = (utilities: Utility) => void;

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: AddUtilities }) {
      const newUtilities: Utility = {
        '.shadow-red': {
          boxShadow: '0 4px 6px -1px rgba(255, 0, 0, 0.1), 0 2px 4px -1px rgba(255, 0, 0, 0.06)',
        },
        '.shadow-white': {
          boxShadow: '0 4px 6px 4px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
        },
        '.shadow-big-white': {
          boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.5)',
        },
      }
      addUtilities(newUtilities)
    },
    require("daisyui"), require('tailwindcss-animated')
  ],

}
export default config
