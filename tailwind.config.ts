import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '670px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        background: colors.gray[50],
        text: {
          primary: colors.zinc[900],
          secondary: colors.zinc[500],
        },
        primary: {
          DEFAULT: '#ff769f',
          light: '#ff8fb1',
          dark: '#ff5c8d',
          extraLight: '#ffdce6',
          extraDark: '#ff437c',
        },
        secondary: {
          DEFAULT: colors.blue[500],
          light: colors.blue[400],
          dark: colors.blue[600],
          extraLight: colors.blue[100],
          extraDark: colors.blue[800],
        },
        danger: {
          DEFAULT: colors.red[500],
          light: colors.red[400],
          dark: colors.red[600],
          extraLight: colors.red[100],
          extraDark: colors.red[800],
        },
        warning: {
          DEFAULT: colors.yellow[500],
          light: colors.yellow[400],
          dark: colors.yellow[600],
          extraLight: colors.yellow[100],
          extraDark: colors.yellow[800],
        },
        success: {
          DEFAULT: colors.green[500],
          light: colors.green[400],
          dark: colors.green[600],
          extraLight: colors.green[100],
          extraDark: colors.green[800],
        },
        purple: {
          DEFAULT: colors.purple[500],
          light: colors.purple[400],
          dark: colors.purple[600],
          extraLight: colors.purple[100],
          extraDark: colors.purple[800],
        },
        gray: {
          DEFAULT: colors.gray[500],
          light: colors.gray[400],
          dark: colors.gray[600],
          extraLight: colors.gray[100],
          extraDark: colors.gray[800],
        }
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        satisfy: ["Satisfy", "cursive"],
        parisienne: ["Parisienne", "cursive"],
      },
    },
  },
  plugins: [],

} satisfies Config;
