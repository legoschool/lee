/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lego: {
          red: "#E3000B",
          yellow: "#FFCD00",
          blue: "#006DB7",
          green: "#00963B",
          orange: "#FF7C00",
          lime: "#A5CD39",
          purple: "#923978",
          black: "#1B1B1B",
          white: "#F7F7F2",
          plate: "#3FA34D",
        },
      },
      fontFamily: {
        display: ['"Fredoka"', "system-ui", "sans-serif"],
        body: ['"Baloo 2"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        // 입체 브릭 느낌의 그림자 (아래로 두툼하게)
        brick: "0 6px 0 0 rgba(0,0,0,0.25), 0 10px 18px -6px rgba(0,0,0,0.35)",
        "brick-sm": "0 4px 0 0 rgba(0,0,0,0.22), 0 6px 12px -4px rgba(0,0,0,0.3)",
        stud: "inset 0 2px 2px rgba(255,255,255,0.45), inset 0 -2px 3px rgba(0,0,0,0.25)",
      },
      borderRadius: {
        brick: "12px",
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(0.96) translateY(4px)", opacity: "0" },
          "100%": { transform: "scale(1) translateY(0)", opacity: "1" },
        },
        wiggle: {
          "0%,100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
      animation: {
        pop: "pop 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
        wiggle: "wiggle 0.4s ease-in-out",
      },
    },
  },
  plugins: [],
};
