import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0d0d0d',
          800: '#1a1a1a',
          700: '#262626',
          600: '#333333',
          500: '#404040',
        },
        accent: {
          primary: '#00af7f',
          secondary: '#00c98f',
        },
        rating: {
          gold: '#ffd700',
          silver: '#c0c0c0',
          bronze: '#cd7f32',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
