const updateNotifier = require('update-notifier');
const boxen = require('boxen');
const chalk = require('chalk');
const paths = require('../paths');

const {
  dependencies,
  // engines: { node: requiredVersion },
} = require(paths.pkgJson);

const packageToCheck = [
  '@threekit-tools/treble',
  '@threekit-tools/treble-scripts',
];

const packagesToUpdate = [];

const trblScripts = updateNotifier({
  pkg: {
    name: packageToCheck[1],
    version: dependencies[packageToCheck[1]].replace('^', ''),
  },
  shouldNotifyInNpmScript: true,
  // Check is in background so it's fine to use a small value like 1h
  // Use 0 for debugging
  // updateCheckInterval: 1000 * 60 * 60,
  updateCheckInterval: 0,
});

if (trblScripts.update) packagesToUpdate.push(trblScripts.update);

const trblReact = updateNotifier({
  pkg: {
    name: packageToCheck[0],
    version: dependencies[packageToCheck[0]].replace('^', ''),
  },
  shouldNotifyInNpmScript: true,
  // Check is in background so it's fine to use a small value like 1h
  // Use 0 for debugging
  // updateCheckInterval: 1000 * 60 * 60,
  updateCheckInterval: 0,
});

if (trblReact.update) packagesToUpdate.push(trblReact.update);

const boxenOptions = {
  padding: 1,
  margin: 1,
  align: 'center',
  borderColor: 'yellow',
  borderStyle: 'round',
};

const upgradeCommand = packagesToUpdate.reduce((output, package) => {
  return `${output} ${package.name}@latest`;
}, 'yarn upgrade');
const upgradePackages = packagesToUpdate.reduce((output, package) => {
  return `${output}${chalk.bold(package.name)} ${chalk.dim(
    package.current
  )}${chalk.reset(' → ')}${chalk.green(package.latest)}\n`;
}, '');

const updateMessage = () =>
  boxen(
    `Update available

  ${upgradePackages}
  \nTo upgrade Treble packages with the latest version, run the following command:\n${chalk.cyan(
    `${upgradeCommand}`
  )}`,
    boxenOptions
  );

module.exports = () => (packagesToUpdate.length ? updateMessage() : undefined);
