/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px', // => @media (min-width: 640px) { ... }
      'sm-max': '639px', // => @media (max-width: 639px) { ... }

      md: '768px', // => @media (min-width: 768px) { ... }
      'md-max': '767px', // => @media (max-width: 767px) { ... }

      lg: '1024px', // => @media (min-width: 1024px) { ... }
      'lg-max': '1023px', // => @media (max-width: 1023px) { ... }

      xl: '1280px', // => @media (min-width: 1280px) { ... }
      'xl-max': '1279px', // => @media (max-width: 1279px) { ... }

      '2xl': '1536px', // => @media (min-width: 1536px) { ... }
      '2xl-max': '1535px', // => @media (max-width: 1535px) { ... }
    },

    extend: {},
  },
  plugins: [],
}
