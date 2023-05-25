/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        main: "1030px",
      },
      minWidth: {
        main: "1030px",
      },

      dropShadow: {
        "button-ok": "0 0 6px rgba(52, 211, 153, 0.8)",
        "button-alert": "0 0 6px rgba(220, 38, 38, 0.9)",
        "button-default": "0 0 6px rgba(226, 232, 240, 0.9)",
      },

      keyframes: {
        "newMessage": {
          "0%": { opacity: "0", top: 12 },
          "20%": { opacity: "1", top: -27 },
          "100%": { opacity: "0"},
        },
        "opacity": {
          "0%": {opacity: "0"},
          "100%": {opacity: '1'}
        },
        "topDown": {
          "0%": {transform: "translateY(-50px)"},
          "100%": {transform: "translateY(0)"}
        }
      },

      animation: {
        "btn": "newMessage 2s ease-in-out",
        "opacity": "opacity 700ms ease-in-out",
        "top-down": "topDown 500ms ease-in-out",
      },

      
    },
  },
  plugins: [],
};
