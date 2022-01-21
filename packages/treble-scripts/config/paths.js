const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const appBuild = resolveApp('build');
const storybookBuild = resolveApp('build_storybook');
const appPublic = resolveApp('public');
const appIndexHtml = resolveApp('public/index.html');
const appSrc = resolveApp('src');
const appIndexJs = resolveApp('src/index');

const nodeModules = resolveApp('node_modules');
const pkgJson = resolveApp('package.json');
const tsConfig = resolveApp('tsconfig.json');

module.exports = {
  appDirectory,
  appBuild,
  storybookBuild,
  appPublic,
  appIndexHtml,
  appSrc,
  appIndexJs,
  nodeModules,
  pkgJson,
  tsConfig,
};
