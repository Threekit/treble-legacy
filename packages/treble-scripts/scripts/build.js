const configFactory = require('../config/webpack.prod');
const webpack = require('webpack');
const chalk = require('chalk');

const argv = process.argv.slice(2);
const ENV = argv.includes('--admin-fts') ? 'admin-fts' : 'preview';

const config = configFactory({ buildType: 'compact', threekitEnv: ENV });
const compiler = webpack(config);

compiler.run(async (err, stats) => {
  if (err) {
    console.log('Errors:', err);
    return;
  }
  if (stats.hasErrors()) {
    const info = stats.toJson();
    console.log('Compile Errors: ', info.errors);
    return;
  }

  console.log(
    chalk.green(`Compiled successfully in ${stats.toJson().time / 1000}s.\n`)
  );
});
