module.exports = {
  mode: "development",
  entry: "./dist/app.js",
  devtool: "source-map",
  output: {
    filename: "app.js",
    library: "app",
  },
  resolve: {
    fallback: {
      fs: false,
      path: false,
    },
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
