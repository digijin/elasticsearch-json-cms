const path = require("path");
module.exports = {
	entry: "./src/client/entry",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
	}
};
