/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#A259FF", // Vibrant purple
          dark: "#7A3BFF", // Darker shade
          light: "#B280FF", // Lighter shade
        },
        secondary: {
          main: "#808080", // Gray
          dark: "#555555", // Dark gray
          light: "#A9A9A9", // Light gray
        },
        background: {
          primary: "#2B2B2B", // Dark gray background
          secondary: "#3B3B3B", // Secondary background color
        },
        text: "#2c3e50", // Text color
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  // plugins:[]
};
