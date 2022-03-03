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
        'white': "#FFFFFF",
        'sopa-ultra': "#C026D3",
        'sopa-default': "#E98BF9",
        'sopa-accent': "#D946EF",
        'sopa-soft': "#F5D0FE",
        'sopa-pure': "#F0ABFC",
        'sopa-deepDark': "#86198F",
        'sopa-lightDark': "#C026D3",
        'dark-ultra': "#1E1F21",
        'dark-default': "#292A2D",
        'dark-text-color': "#CBD5E1",
        'emphasize': "#F43F5E",
        'form-gray': "#D1D5DB"
      }
    },
  },
  plugins: [
    "@tailwindcss/forms",
    require('@tailwindcss/line-clamp'),
  ],
}
