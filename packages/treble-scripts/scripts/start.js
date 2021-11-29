const configFactory = require('../config/webpack.dev');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('../config/threekit-dev-utils/clearConsole');
const {
  createCompiler,
} = require('../config/threekit-dev-utils/WebpackDevServerUtils');
const chalk = require('chalk');
const createDevServerConfig = require('../config/webpackDevServer.config');

//  Variables setup
const argv = process.argv.slice(2);
const portIdx =
  argv.indexOf('--port') !== -1 ? argv.indexOf('--port') : argv.indexOf('-p');
const ENV = argv.includes('--admin-fts') ? 'admin-fts' : 'preview';
const PORT = process.env.PORT || portIdx !== -1 ? argv[portIdx + 1] : 3000;

const config = configFactory({ threekitEnv: ENV });
const serverConfig = createDevServerConfig({ port: PORT });

const compiler = createCompiler({
  // appName,
  config,
  port: serverConfig.port,
  threekitEnv: ENV,
  // urls,
  webpack,
});

const devServer = new WebpackDevServer(serverConfig, compiler);

// Launch WebpackDevServer.
devServer.startCallback(() => {
  clearConsole();
  console.log(
    chalk.cyan('Starting the Threekit Treble development server...\n')
  );
});
['SIGINT', 'SIGTERM'].forEach(function (sig) {
  process.on(sig, function () {
    devServer.stop();
    process.exit();
  });
});

if (process.env.CI !== 'true') {
  // Gracefully exit when stdin ends
  process.stdin.on('end', function () {
    devServer.stop();
    process.exit();
  });
}
