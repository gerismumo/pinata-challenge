import type { Config } from "tailwindcss";

const colors = require('tailwindcss/colors');
const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: '#ffffff',
      darkBlue: '#222831',
      lightDark: '#31363F',
      dark: '#121212',
      lightRed: '#FF5F5F',
      lightGrey: '#F5F5F5',
      grey: 'grey',
      lightOrange: '#DC5F00',
      sBlue: '#13afe7',
      ...colors,
      sky: require('tailwindcss/colors').sky,
      stone: require('tailwindcss/colors').stone,
      neutral: require('tailwindcss/colors').neutral,
      gray: require('tailwindcss/colors').gray,
      slate: require('tailwindcss/colors').slate,
    },
    screens: {
      xs: '350px',
      xs1: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
