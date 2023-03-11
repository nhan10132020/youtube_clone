/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
    },
    screens:{
      "2xl":'2180px',
      "xl":"1980px",
      'lg':"1560px",
      'break':'1312px',
      "md":'1024px',
      'sm': '720px',
      'sx':'600px'
    }
  },
  plugins: [require('@tailwindcss/line-clamp')],
}