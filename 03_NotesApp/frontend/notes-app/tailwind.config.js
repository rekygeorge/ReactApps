/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Colors used in the project.
      colors: {
        'primary': '#2B85FF',
        'secondary': '#EF863E',
        'dark-purple': '#081A51',
        'light-white': 'rgba(255, 255, 255, 0.15)',
        slate: {
          400: '#94a3b8', // Example hex value
        },
      },
    },
  },
  plugins: [],
}

