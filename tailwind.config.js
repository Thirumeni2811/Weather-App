/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary : '#6118BF',
        primarybg : '#6118BF1A',
        primarysec : "#8F53FF",
        secondary : '#FFFFFF3D',
        text :'#FFD55F',
        border: '#3D3D3D',
        borderHalf : '#3D3D3D80',
        email : '#0D0D0D',
        faq : '#8F53FF17',
        price : '#747474',
        profile : '#202224',
        event : '#FAF9F9',
        create : '#F6F2FF' ,
        buttonbg: '#FAFAFA',
        quilborder: '#8D8D8D',
      },
      screens: {
        'xs': {'max': '576px'},          // Extra small devices (phones, 576px and down)
        'sm': {'min': '576px'},          // Small devices (portrait tablets and large phones, 576px and up)
        'md': {'min': '768px'},          // Medium devices (landscape tablets, 768px and up)
        'lg': {'min': '1024px'},          // Large devices (laptops/desktops, 992px and up)
        'xl': {'min': '1200px'},         // Extra large devices (large laptops and desktops, 1200px and up)
      },
    },
  },
  plugins: [],
}