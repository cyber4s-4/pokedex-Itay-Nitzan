module.exports = {
  mode: "development",
  entry: "./dist/js/app.js",
  devtool: "source-map",
  output: {
    filename: "app.js",
    library: "app",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
};
