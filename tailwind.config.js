/** @type {import('tailwindcss').Config} */
module.exports = {
  // ✅ Include all files that use className from NativeWind
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],

  // ✅ NativeWind preset adds required defaults (important!)
  presets: [require("nativewind/preset")],

  theme: {
    extend: {},
  },
  plugins: [],
};
