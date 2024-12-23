import type { Config } from "tailwindcss";

export default {
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
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#63B3ED",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#63B3ED",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#FC8181",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F7FAFC",
          foreground: "#4A5568",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "progress-fill": {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress-width)" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "text-bloom": {
          "0%": {
            filter: "brightness(1) blur(0)",
            textShadow: "0 0 0 transparent"
          },
          "50%": {
            filter: "brightness(1.2) blur(2px)",
            textShadow: "0 0 10px rgba(255,255,255,0.8)"
          },
          "100%": {
            filter: "brightness(1) blur(0)",
            textShadow: "0 0 0 transparent"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "progress-fill": "progress-fill 1s ease-in-out",
        "gradient-x": "gradient-x 15s ease infinite",
        "text-bloom": "text-bloom 3s ease-in-out infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;