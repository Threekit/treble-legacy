const spawn = require('cross-spawn');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

const COMPONENTS_PACKAGE = '@threekit-tools/treble-components';
const DEFAULT_TEMPLATE = '@threekit-tools/treble-template';

function installDependencies(root, dependencies, isTypescript) {
  return new Promise((resolve, reject) => {
    const command = 'yarnpkg';
    const args = ['add', '--exact'];
    const packages = [COMPONENTS_PACKAGE];
    const devDependencies = [
      'eslint',
      'eslint-config-prettier',
      'eslint-plugin-prettier',
      'eslint-plugin-react',
      'prettier',
    ];
    const typescriptPackages = [
      '@types/node',
      '@types/react',
      '@types/react-dom',
      'typescript',
    ];

    packages.push('tailwindcss');

    if (isTypescript) packages.push(...typescriptPackages);

    args.push(...packages, ...devDependencies, ...dependencies);

    args.push('--cwd');
    args.push(root);

    // if (verbose) {
    //   args.push('--verbose');
    // }

    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('close', code => {
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

function copyTemplate(root, templateName) {
  // const appPath = path.join(root, "src");
  const componentsOutputPath = path.join(root, 'src', 'components');
  const componentsPath = path.dirname(
    require.resolve(`${COMPONENTS_PACKAGE}/package.json`, { paths: [root] })
  );
  const templatePath = path.dirname(
    require.resolve(`${templateName}/package.json`, { paths: [root] })
  );

  const componentsDir = path.join(componentsPath, 'src');
  const templateDir = path.join(templatePath, 'template');

  if (fs.existsSync(templateDir)) {
    fs.copySync(templateDir, root);
  } else {
    console.error(
      `Could not locate supplied template: ${chalk.green(templateName)}`
    );
    return Promise.reject();
  }

  fs.ensureDirSync(componentsOutputPath);

  if (fs.existsSync(componentsDir)) {
    fs.copySync(componentsDir, componentsOutputPath);
  } else {
    console.error(
      `Could not locate components template: ${chalk.green(COMPONENTS_PACKAGE)}`
    );
    return Promise.reject();
  }

  return Promise.resolve();
}

function removeTemplateDependencies(dependencies) {
  const command = 'yarnpkg';
  const remove = 'remove';

  const args = [remove];

  if (Array.isArray(dependencies)) args.push(...dependencies);
  else args.push(dependencies);

  const removeProcess = spawn.sync(command, args, {
    stdio: 'inherit',
  });
  if (removeProcess.status !== 0) {
    console.error(`\`${command} ${args.join(' ')}\` failed`);
    return Promise.reject();
  }
  return Promise.resolve();
}

async function renameGitIgnore(root) {
  // We need to rename the gitignore file to .gitignore
  if (
    !fs.existsSync(path.join(root, '.gitignore')) &&
    fs.existsSync(path.join(root, 'gitignore'))
  ) {
    await fs.move(path.join(root, 'gitignore'), path.join(root, '.gitignore'));
  }
  if (fs.pathExistsSync(path.join(root, 'gitignore'))) {
    fs.removeSync(path.join(root, 'gitignore'));
  }

  return Promise.resolve();
}

function enrichPackageJson(root, isTypescript) {
  const packageJson = require(path.join(root, 'package.json'));

  // const templateScripts = templatePackage.scripts || {};
  (packageJson.main = isTypescript ? 'src/index.tsx' : 'src/index.js'),
    (packageJson.scripts = Object.assign({
      start: 'treble-scripts start',
      build: 'treble-scripts build',
      format: 'prettier --write ./src',
      lint: 'eslint ./src',
    }));

  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  return Promise.resolve();
}

module.exports = async function init([
  name,
  root,
  originalDirectory,
  template,
]) {
  const templateName = template || DEFAULT_TEMPLATE;
  const dependencies = [templateName];
  const isTypescript = false;

  await installDependencies(root, dependencies, isTypescript);
  await copyTemplate(root, templateName);
  await removeTemplateDependencies([templateName, COMPONENTS_PACKAGE]);
  await enrichPackageJson(root, isTypescript);
  await renameGitIgnore(root);
};