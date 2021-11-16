const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  entry: "./public/assets/js/app.js",
  output: {
    path: __dirname + "/public/dist",
    filename: "bundle.js"
  },



};

module.exports = config;