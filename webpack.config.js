const path = require("path");
module.exports = {
	entry: "./src/client/entry",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js/,
				loader: "babel-loader"
			}
		]
	},
	resolve: {
		modules: ["node_modules", path.resolve(__dirname, "src", "client")]
	}
};
