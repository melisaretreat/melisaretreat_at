/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        `./src/pages/**/*.{js,jsx,ts,tsx}`,
        `./src/components/**/*.{js,jsx,ts,tsx}`,
        `./src/layouts/**/*.{js,jsx,ts,tsx}`,
    ],
    plugins: [
        require("daisyui"),
        require('@tailwindcss/typography')
    ],

}
