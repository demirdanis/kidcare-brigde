/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.stories.@(js|jsx,ts,tsx,mdx)",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-comfortaa)", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        comfortaa: ["var(--font-comfortaa)", "system-ui", "sans-serif"],
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          hover: "var(--primary-hover)",
          light: "var(--primary-light)",
          lighter: "var(--primary-lighter)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
          hover: "var(--secondary-hover)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
          hover: "var(--destructive-hover)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
          hover: "var(--muted-hover)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          hover: "var(--accent-hover)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "dui-selector": "1rem",
        "dui-field": "1rem",
        "dui-box": "1rem",
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
      ringWidth: {
        DEFAULT: "1px", // Varsayılan ring genişliği
        thin: "0.5px", // Çok ince
        soft: "1px", // Soft
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px",
      },
      ringOpacity: {
        DEFAULT: "0.1", // Varsayılan opaklık
        soft: "0.05", // Çok soft
        light: "0.1", // Hafif
        medium: "0.2", // Orta
        5: "0.05",
        10: "0.1",
        20: "0.2",
        25: "0.25",
        50: "0.5",
        75: "0.75",
        100: "1",
      },
      ringOffsetWidth: {
        DEFAULT: "0px", // Ring offset kaldır
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px",
      },
    },
    screens: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [tailwindcssAnimate],
};
