import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // Add this line
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: "#484385",
        'primary-tint': "#b179d0",
        secondary: "#f25c54",
        "navy-blue": "#413e65",
      },
      backgroundImage: {
        birthday:
          "linear-gradient(90deg, rgba(72,67,133,0.7315301120448179) 0%, rgba(242,92,84,0.4150035014005602) 100%), url('assets/images/occasions/birthday.jpg')",
        anniversary:
          "linear-gradient(90deg, rgba(72,67,133,0.7315301120448179) 0%, rgba(242,92,84,0.4150035014005602) 100%), url('assets/images/occasions/anniversary.jpg')",
        graduation:
          "linear-gradient(90deg, rgba(72,67,133,0.7315301120448179) 0%, rgba(242,92,84,0.4150035014005602) 100%), url('assets/images/occasions/graduation.jpg')",
        holidays:
          "linear-gradient(90deg, rgba(72,67,133,0.7315301120448179) 0%, rgba(242,92,84,0.4150035014005602) 100%), url('assets/images/occasions/holidays.jpg')",
        "hover-grad":
          "linear-gradient(90deg, rgba(0,0,0,0.7315301120448179) 0%, rgba(124,124,124,0.4150035014005602) 100%)",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
