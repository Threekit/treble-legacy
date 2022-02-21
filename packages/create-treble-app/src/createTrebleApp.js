import spawn from 'cross-spawn';
import path from 'path';
import chalk from 'chalk';
import fs from 'fs-extra';
import enquirer from 'enquirer';

const TREBLE_SCRIPTS_PACKAGE = '@threekit-tools/treble-scripts';

const argv = process.argv.slice(2);
const preppedArgs = argv.reduce(
  (output, arg) => {
    if (arg.startsWith('--')) {
      let [key, val] = arg.replace('--', '').split('=');
      output.flags[key] = val || undefined;
    } else if (!output.appName) {
      output.appName = arg;
    }
    return output;
  },
  {
    flags: {},
    appName: undefined,
  }
);

function createAppDir(name, root) {
  console.log();
  console.log(`Creating a new Treble app in ${chalk.green(root)}.`);
  console.log();
  fs.ensureDirSync(name);
  return Promise.resolve();
}

function installTreble(root) {
  return new Promise((resolve, reject) => {
    const command = 'yarnpkg';
    const args = ['add', '--exact'];
    const packages = [
      'react',
      'react-dom',
      '@threekit-tools/treble',
      '@threekit-tools/treble-scripts',
    ];

    args.push(...packages);

    args.push('--cwd');
    args.push(root);

    console.log();
    console.log(root);
    console.log();
    console.log('Installing dependencies. This will take a couple of minutes.');
    console.log(
      `Installing ${chalk.cyan(`react`)}, ${chalk.cyan(
        `react-dom`
      )}, ${chalk.cyan(`@threekit-tools/treble`)} and ${chalk.cyan(
        `@threekit-tools/treble-scripts`
      )}...`
    );
    console.log();

    const installProcess = spawn(command, args, { stdio: 'inherit' });
    installProcess.on('close', code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`,
        });
        return;
      }
      resolve();
    });
  });
}

function createPackageJson(root) {
  const appName = path.basename(root);

  const packageJson = {
    name: appName,
    version: '0.1.0',
  };

  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  return Promise.resolve();
}

function initTreble(name, root, originalDirectory, templateName) {
  const data = [name, root, originalDirectory, templateName];
  const nodeScript = `
  const init = require('${TREBLE_SCRIPTS_PACKAGE}/scripts/init.js');
  init(JSON.parse(process.argv[1]));
`;

  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      ['-e', nodeScript, '--', JSON.stringify(data)],
      { cwd: process.cwd(), stdio: 'inherit' }
    );

    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: `node`,
        });
        return;
      }
      resolve();
    });
  });
}

export default async function createTrebleApp() {
  const templateName = preppedArgs.flags?.template || undefined;
  let name = preppedArgs.appName;
  const originalDirectory = process.cwd();

  if (!name) {
    const response = await enquirer.prompt({
      type: 'input',
      name: 'name',
      initial: 'treble-app',
      message: 'Please provide a name for your project.',
    });
    name = response.name.replace(/ /g, '-').toLowerCase();
  }

  const root = path.resolve(name);

  if (name === '.') {
    name = undefined;
  } else {
    await createAppDir(name, root);
    await createPackageJson(root);
  }

  await installTreble(root);
  process.chdir(root);

  initTreble(name, root, originalDirectory, templateName);
}
