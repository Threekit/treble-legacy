const chalk = require('chalk');
const clearConsole = require('./clearConsole');

function printInstructions({ port, appName, threekitEnv, urls }) {
  console.log();
  // console.log(`You can now view ${chalk.bold(appName)} in the browser.`);
  console.log(`You can now view your Treble App in the browser.`);
  console.log();

  console.log(
    `  ${chalk.bold('Local:')}                    http://localhost:${port}`
  );
  console.log(
    `  ${chalk.bold('Threekit Environment:')}     ${chalk.green(threekitEnv)}`
  );

  // if (urls.lanUrlForTerminal) {
  //   console.log(
  //     `  ${chalk.bold('Local:')}            ${urls.localUrlForTerminal}`
  //   );
  //   // console.log(
  //   //   `  ${chalk.bold('On Your Network:')}  ${urls.lanUrlForTerminal}`
  //   // );
  // } else {
  //   console.log(`  ${urls.localUrlForTerminal}`);
  // }

  // console.log();
  // console.log('Note that the development build is not optimized.');
  // console.log(
  //   `To create a production build, use ` +
  //     `${chalk.cyan(`yarn build`)}.`
  // );
  // console.log();
}

module.exports.createCompiler = ({ config, port, threekitEnv, webpack }) => {
  // "Compiler" is a low-level interface to webpack.
  // It lets us listen to some events and provide our own custom messages.
  let compiler;
  try {
    compiler = webpack(config);
  } catch (err) {
    console.log(chalk.red('Failed to compile.'));
    console.log();
    console.log(err.message || err);
    console.log();
    process.exit(1);
  }

  compiler.hooks.done.tap('done', async stats => {
    clearConsole();

    const statsData = stats.toJson({
      all: true,
      // warnings: true,
      // errors: true,
    });

    printInstructions({ port, threekitEnv, time: statsData.time });
  });

  return compiler;
};
