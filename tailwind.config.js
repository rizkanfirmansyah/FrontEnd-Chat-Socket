const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({addUtilities}) {
      const utilities = {
        ".hides" : {
          "visibility" : "hidden",
          "opacity" : 0,
          "transition" : "visibility 0s, opacity 5s linear"
        },
        ".hides:hover" : {
          "visibility" : "visible",
          "opacity" :1
        }
      };

      addUtilities(utilities);
    })
  ],
}
