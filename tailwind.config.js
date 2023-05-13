/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./appUI/**/*/*.{js,jsx,ts,tsx}",
    "./appUI/components/*.tsx",
    "./appUI/components/*/*.tsx",
    "./appUI/hooks/*.tsx",
    "./appUI/pages/*.tsx",
  ],
  theme: {
    extend: {
      transitionDelay: {
        m1: "1m",
      },
      fontFamily: {
        'saira': 'sairaregular',
        'exo': 'exo_2regular',
      },
      animation: {
        fadeOut: "fadeOut 1s ease-in-out",
        fadeIn: "fadeIn 1s ease-in-out",
        pingOnce: "ping 500ms cubic-bezier(0,0,0.2,1)",
        shake: "shake 1s ease-in-out",
        slideInDown: "slideInDown 1s ease-in-out",
        slideOutUp: "slideOutUp 1s ease-in-out",
        slideOutLeft: "slideOutLeft 1s ease-in-out",
        lightSpeedInRight: "lightSpeedInRight 1s ease-out",
      },
      keyframes: (theme) => ({
        fadeOut: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeIn: {
          "0%": { opacity: 1 },
          "15%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        ping: {
          "75%": { transform: "scale(2)", opacity: 0 },
          "100%": { transform: "scale(2)", opacity: 0 },
        },
        shake: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(0)" },
          "10%": { transform: "translateX(-10px)" },
          "30%": { transform: "translateX(-10px)" },
          "50%": { transform: "translateX(-10px)" },
          "70%": { transform: "translateX(-10px)" },
          "90%": { transform: "translateX(-10px)" },
          "20%": { transform: "translateX(10px)" },
          "40%": { transform: "translateX(10px)" },
          "60%": { transform: "translateX(10px)" },
          "80%": { transform: "translateX(10px)" },
        },
        slideInDown: {
          "0%": { opacity: 0, transform: "translateY(-2000px)" },
          "100%": { transform: "translateY(0)" },
        },
        slideOutUp: {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            opacity: 0,
            transform: "translateY(-2000px)",
          },
        },
        slideOutLeft: {
          "0%": { transform: "translateX(1000px)" },
          "100%": { opacity: 0, transform: "translateX(0)" },
        },
        lightSpeedInRight: {
          from: {
            transform: "translate3d(100%, 0, 0) skewX(-30deg)",
            opacity: 0,
          },
          "60%": {
            transform: "skewX(20deg)",
            opacity: 1,
          },
          "80%": {
            transform: "skewX(-5deg)",
          },
          to: {
            transform: "translate3d(0, 0, 0)",
          },
        },
      }),
    },
  },
  plugins: [],
};
