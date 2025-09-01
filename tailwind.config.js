/**
 * @type {import('tailwindcss').Config}
 */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // all your React components
  ],
  theme: {
    extend: {
      colors: {
        // 🌟 NC News brand palette
        nc: {
          primary: "#4B9CD3",   // soft blue
          secondary: "#3A425F", // slate
          accent: "#F6AD55",    // orange for buttons/accent
          success: "#38A169",   // green
          danger: "#E53E3E",    // red
          light: "#F7FAFC",     // gray-50 equivalent
          dark: "#1A202C",      // gray-900
        },
      },
      fontFamily: {
        sans: ["'Segoe UI'", "Arial", "sans-serif"],
        heading: ["'Merriweather'", "serif"],
      },
      boxShadow: {
        card: "0 4px 10px rgba(0,0,0,0.1)",
        hover: "0 6px 12px rgba(0,0,0,0.15)",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};

export default config;

