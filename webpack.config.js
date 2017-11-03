const webpack = require("webpack");
const path = require("path");

const BUILD_DIR = path.resolve(__dirname, "dist-redux");
const APP_DIR = path.resolve(__dirname, "src-redux");

const config = {
	entry: `${APP_DIR}/index.jsx`,
	output: {
		path: BUILD_DIR,
		filename: "bundle.js",
	},
	module: {
		loaders: [
			{
				test: /\.jsx?/,
				include: APP_DIR,
				loader: "babel-loader",
			},
		],
	},
};

module.exports = config;
