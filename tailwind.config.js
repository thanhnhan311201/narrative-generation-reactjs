/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // for theme config
        'main-bg': "rgba(20, 23, 24)",
        'content-bg': "rgba(35, 38, 39)",
        'main-text-color': "rgba(254, 254, 254)",
        'border-color': "rgba(52, 56, 57)",
        'overlay-color': "rgba(35, 38, 39, 0.9)",
    
        // for modal
        'modal': "rgba(20, 23, 24)",
        'modal__close-btn-fill-color': "rgba(108, 114, 117)",
        'modal__close-btn-fill-hover-color': "rgba(254, 254, 254)",
        'modal__close-btn-bg-color': "rgba(108, 114, 117, 0.25)",
    
        // general config
        'primary-color': "rgba(20 23 24)",
        'secondary-color': "rgba(35, 38, 39)",
        'white': "rgba(254, 254, 254)",
        'white--1': "rgba(232, 236, 239)",
        'grey': "rgba(108, 114, 117)",
        'accent-color-1': "rgba(216 76 16)",
        'accent-color-2': "rgba(0, 132, 255)",
    
        'primary-btn-color': "rgba(2, 121, 232)",
        'border-btn-color-selected': "rgba(0, 132, 255)",
      },
    },
  },
  plugins: [],
}

