module.exports = {
  mode: 'development',
  entry: "./dist/tsc/app.js",
  devtool: "source-map",
  output: {
    filename: "app.js",
    library: "app"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  }
}
