export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This should already cover components
    "./src/components/**/*.{js,ts,jsx,tsx}", // Explicitly add components
  ],
  theme: {
    extend: {
      fontFamily: {
        atkinson: ["Atkinson Hyperlegible", "sans-serif"],
        spartan: ["League Spartan", "sans-serif"],
        libre: ["Libre Baskerville", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        sourceCode: ["Source Code Pro", "monospace"],
      },
    },
  },
  plugins: [],
};
