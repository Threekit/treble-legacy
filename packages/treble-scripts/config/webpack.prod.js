const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const InterpolateHtmlPlugin = require('./threekit-dev-utils/InterpolateHtmlPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const paths = require('./paths');

module.exports = ({ buildType, threekitEnv }) =>
  merge(commonConfig, {
    mode: 'production',
    stats: 'detailed',
    // Where files should be sent once they are bundled
    output: Object.assign(
      {},
      { path: paths.appBuild, clean: true },
      buildType === 'compact'
        ? {
            filename: 'threekit-embed.js',
            chunkFilename: '[id].js',
          }
        : {
            pathinfo: false,
            filename: 'static/js/[name].[contenthash:8].js',
            chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
          }
    ),
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          // relative path is from src
          { from: `${paths.appPublic}/favicon.ico` }, // <- your path to favicon
        ],
      }),
      new webpack.DefinePlugin({
        'process.env.THREEKIT_ENV': JSON.stringify(threekitEnv),
      }),
      // Makes some environment variables available in index.html.
      // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
      // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
      // It will be an empty string unless you specify "homepage"
      // in `package.json`, in which case it will be the pathname of that URL.
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, process.env),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        // This is only used in production mode
        new TerserPlugin({
          // Use multi-process parallel running to improve the build speed
          parallel: true,
          terserOptions: {
            parse: {
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending further investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            // Added for profiling in devtools
            keep_classnames: false,
            keep_fnames: false,
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true,
            },
          },
        }),
      ],
      // Automatically split vendor and commons
      // https://twitter.com/wSokra/status/969633336732905474
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      splitChunks:
        buildType === 'compact'
          ? undefined
          : {
              chunks: 'all',
              name: 'production',
            },
      // Keep the runtime chunk separated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      // https://github.com/facebook/create-react-app/issues/5358
      runtimeChunk: buildType === 'default' && {
        name: entrypoint => `runtime-${entrypoint.name}`,
      },
    },
  });
