module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Dongle: ['Dongle', "sans-serif"],
        NotoSans: ['Noto Sans KR', "sans-serif"]
      },
      colors: {
        'sopa-default': "#E98BF9",
        'sopa-accent': "#D946EF",
        'sopa-soft': "#F5D0FE",
        'sopa-pure': "#F0ABFC",
        'error': "#F43F5E"
      }
    },
  },
  plugins: ["@tailwindcss/forms"],
}
