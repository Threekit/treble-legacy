const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const InterpolateHtmlPlugin = require('./threekit-dev-utils/InterpolateHtmlPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = ({ threekitEnv }) =>
  merge(commonConfig, {
    mode: 'development',
    stats: 'none',
    plugins: [
      new webpack.DefinePlugin({
        'process.env.THREEKIT_ENV': JSON.stringify(threekitEnv),
      }),
      // Makes some environment variables available in index.html.
      // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
      // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
      // It will be an empty string unless you specify "homepage"
      // in `package.json`, in which case it will be the pathname of that URL.
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
        PUBLIC_URL: '',
        ...process.env,
      }),
    ],
  });
