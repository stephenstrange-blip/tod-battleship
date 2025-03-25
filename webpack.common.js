const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|gif|jpg|jpeg|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(?:.js|mjs|cjs)$/,
        exclude: {
          and: [/node-modules/],
          // not: [ /someModules in node-modules that need to be transpiled/]
        },
        use: {
          loader: "babel-loader",
          options: {
            targets: "defaults",
            presets: [["@esling-preset-env"]],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  stats: {
    loggingDebug: ["babel-loader"],
  },
};
