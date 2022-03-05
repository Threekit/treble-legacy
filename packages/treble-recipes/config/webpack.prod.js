const nodeExternals = require("webpack-node-externals");
const paths = require("./paths");

module.exports = {
  // Makes sure errors in console map to the correct file
  // and line number
  // devtool: 'eval',
  // watch: true,
  mode: "production",
  entry: paths.recipesJs,
  //   entry: {
  //     catalog: paths.recipesCatalogJs,
  //     animations: paths.recipesAnimationsJs,
  //   },
  output: {
    path: paths.recipesBuild,
    filename: "threekit-recipes.js",
    // filename: "[name].js",
    clean: true,
  },
  devServer: {
    static: paths.recipesBuild,
    watchFiles: "./src",
    hot: true,
  },
  externalsPresets: { node: true },
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
  // plugins: [
  //   {
  //     apply: (compiler) => {
  //       compiler.hooks.done.tap("DonePlugin", (stats) => {
  //         console.log("Compile is done !");
  //         setTimeout(() => {
  //           process.exit(0);
  //         });
  //       });
  //     },
  //   },
  // ],
};
