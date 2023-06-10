/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				iris: "#4B4DED",
				subtitle: "#9797AA",
				fuschia: "#2A333E",
				offWhite: "#fafafa",
			},
			padding: {
				"80%": "80%",
				"20%": "20%",
			},
		},
	},
	plugins: [],
};
