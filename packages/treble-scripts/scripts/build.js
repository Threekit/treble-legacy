const configFactory = require('../config/webpack.config');
const webpack = require('webpack');
const chalk = require('chalk');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const argv = process.argv.slice(2);
const ENV = argv.includes('--admin-fts') ? 'admin-fts' : 'preview';
const INCLUDE_RECIPES = argv.includes('--recipes');

const config = configFactory('production', ENV, {
  useRecipes: INCLUDE_RECIPES,
});
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
