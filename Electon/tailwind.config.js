/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'mainBlue':'#003F62',
        'mainOrange':'#EDA415',
        'headingColor':'#185A7D',
        'textColor':'#3A3A3A',
        'textWhite':'#fff',
        'textOrange':'#EDA415',
        'Gray':'#DCDCDC',
        'okvir':'#A9A9A9'

      }
    },
  },
  plugins: [],
}