const chalk = require('chalk');
const boxen = require('boxen');
const clearConsole = require('./clearConsole');
const notifier = require('./checkForUpdates');

const boxenOptions = {
  padding: 1,
  margin: 1,
  align: 'left',
  borderColor: 'yellow',
  borderStyle: 'round',
};

function printInstructions({ port, threekitEnv }) {
  const updateMessage = notifier();
  console.log();
  // console.log(`You can now view ${chalk.bold(appName)} in the browser.`);
  console.log(`You can now view your Treble App in the browser.`);
  console.log();

  if (updateMessage) {
    console.log(updateMessage);
  } else {
    console.log(
      boxen(
        `
  ${chalk.bold('Local:')}                    http://localhost:${port}
  ${chalk.bold('Threekit Environment:')}     ${chalk.green(threekitEnv)}
    `,
        boxenOptions
      )
    );
  }

  console.log();
  // console.log(notifier());

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
