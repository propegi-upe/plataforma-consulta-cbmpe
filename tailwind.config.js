// tailwind.config.js ou tailwind.config.ts

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "var(--white)",
        gray: "var(--gray)",
        graySecondary: "var(--graySecondary)",
        dark: "var(--dark)",

        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        neutral: "var(--neutral)",

        danger: "var(--danger)",
        success: "var(--success)",
        warning: "var(--warning)",

        selagem: "var(--selagem)",
        juridico: "var(--juridico)",
        cadSocial: "var(--cadSocial)",

        pending: "var(--pending)",
        notStarted: "var(--notStarted)",
        waiting: "var(--waiting)",

        requirement: "var(--requirement)",

        statusValidade1: "var(--statusValidade1)",
        statusValidade10: "var(--statusValidade10)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        geist: ["var(--font-geist-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
