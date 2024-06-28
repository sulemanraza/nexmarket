import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        brand: "var(--brand)",
        // brand: "#DB4444",
        discount: "var(--discount)",
        placeholder: "var(--placeholder)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        errorD: "var(--errorD)",
        successD: "var(--successD)",
        warningD: "var(--warningD)",

        success: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },
        warning: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        error: {
          50: "#FFF1F2",
          100: "#FFE4E6",
          200: "#FECDD3",
          300: "#FDA4AF",
          400: "#FB7185",
          500: "#F43F5E",
          600: "#E11D48",
          700: "#BE123C",
          800: "#9F1239",
          900: "#881337",
        },
        neutral: {
          0: "#FFFFFF",
          50: "#F4F4F6",
          100: "#E9EAEC",
          200: "#D1D4DB",
          300: "#9096A2",
          400: "#4D566B",
          500: "#202C46",
          600: "#1B253C",
        },
        blue: {
          100: "#F5F7FE",
          200: "#EAEFFD",
          300: "#ADBEF7",
          400: "#5A7DEE",
          500: "#315CEA",
          600: "#2A4EC7",
          700: "#2240A4",
        },
        purple: {
          100: "#F8F5FE",
          200: "#F1ECFC",
          300: "#C9B2F3",
          400: "#9265E8",
          500: "#773FE2",
          600: "#6436BF",
        },
        magenta: {
          100: "#FEF6F8",
          200: "#FCEEF1",
          300: "#F4BAC8",
          400: "#E97591",
          500: "#E35275",
          600: "#C24764",
        },
        green: {
          100: "#F4FDF7",
          200: "#E9FAEF",
          300: "#A9EBBF",
          400: "#52D880",
          500: "#27CE60",
          600: "#21AF52",
        },
        red: {
          100: "#FCE9EC",
          200: "#F9D2D9",
          300: "#F2A6B4",
          400: "#E9677F",
          500: "#DF2648",
          600: "#B71F3B",
        },
        yellow: {
          100: "#FEF3E6",
          200: "#FDE7CD",
          300: "#FCCF9C",
          400: "#FAB261",
          500: "#F89118",
          600: "#C77414",
        },
      },

      backgroundImage: {
        "gradient-primary":
          "linear-gradient(to bottom right, #7433FF, #FFA3FD)",
        "gradient-secondary":
          "linear-gradient(to bottom right, #624AF2, #50DDC3)",
        "gradient-accent": "linear-gradient(to bottom right, #EB0055, #FFFA80)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
