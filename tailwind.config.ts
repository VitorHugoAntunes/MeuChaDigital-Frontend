import type { Config } from "tailwindcss";


export default {
  darkMode: "class",
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
        background: "var(--background)",
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          light: "var(--primary-light)",
          dark: "var(--primary-dark)",
          extraLight: "var(--primary-extraLight)",
          extraDark: "var(--primary-extraDark)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          light: "var(--secondary-light)",
          dark: "var(--secondary-dark)",
          extraLight: "var(--secondary-extraLight)",
          extraDark: "var(--secondary-extraDark)",
        },
        danger: {
          DEFAULT: "var(--danger)",
          light: "var(--danger-light)",
          dark: "var(--danger-dark)",
          extraLight: "var(--danger-extraLight)",
          extraDark: "var(--danger-extraDark)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          light: "var(--warning-light)",
          dark: "var(--warning-dark)",
          extraLight: "var(--warning-extraLight)",
          extraDark: "var(--warning-extraDark)",
          gray: ""
        },
        success: {
          DEFAULT: "var(--success)",
          light: "var(--success-light)",
          dark: "var(--success-dark)",
          extraLight: "var(--success-extraLight)",
          extraDark: "var(--success-extraDark)",
        },
        purple: {
          DEFAULT: "var(--purple)",
          light: "var(--purple-light)",
          dark: "var(--purple-dark)",
          extraLight: "var(--purple-extraLight)",
          extraDark: "var(--purple-extraDark)",
        },
        gray: {
          DEFAULT: "var(--gray)",
          light: "var(--gray-light)",
          dark: "var(--gray-dark)",
          extraLight: "var(--gray-extraLight)",
          extraDark: "var(--gray-extraDark)",
        },
        input: {
          DEFAULT: "var(--input)",
          border: "var(--input-border)",
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