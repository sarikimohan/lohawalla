const path = require("path");

module.exports = {
	webpack: {
		alias: {
			"@src": path.resolve(__dirname, "src/"),
		},
	},
	style: {
		css: {
			loaderOptions: {
				modules: {
					localIdentName: "[name]__[local]___[hash:base64:5]",
				},
			},
		},
		postcss: {
			plugins: [require("tailwindcss"), require("autoprefixer")],
		},
	},
};
