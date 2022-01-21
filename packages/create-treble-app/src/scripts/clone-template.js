import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import * as messages from '../messages/index.js';
import spawn from 'cross-spawn';
import { TEMPLATES } from '../constants.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

function copyDir(srcDir, destDir, skipFiles = []) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile, skipFiles);
  }
}

function copy(src, dest, skipFiles = []) {
  // if (skipFiles.some((file) => src.includes(file))) return;

  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    copyDir(src, dest, skipFiles);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function updatePackageJson(outputDir, projectName) {
  const pkgPath = path.resolve(outputDir, 'package.json');
  const pkg = fs.readFileSync(pkgPath);
  const pkgPrepped = JSON.parse(pkg);
  pkgPrepped.name = projectName;
  fs.writeFileSync(pkgPath, JSON.stringify(pkgPrepped, null, 2));
}

function installDependencies(dir, config) {
  return new Promise((resolve, reject) => {
    let command = 'yarnpkg';
    let args = ['add'];
    const isTypeScript = config;

    let packages = [
      'react',
      'react-dom',
      '@threekit-tools/treble',
      '@threekit-tools/treble-scripts',
    ];

    if (isTypeScript)
      packages.push(
        '@types/node',
        '@types/react',
        '@types/react-dom',
        'typescript'
      );

    let flag = ['--cwd', dir];

    args = args.concat(packages, flag);

    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`,
        });
        return;
      }
      return resolve();
    });
  });
}

async function renameGitIgnore(outputDir) {
  // We need to rename the gitignore file to .gitignore
  if (
    !fs.existsSync(path.join(outputDir, '.gitignore')) &&
    fs.existsSync(path.join(outputDir, 'gitignore'))
  ) {
    await fs.move(
      path.join(outputDir, 'gitignore'),
      path.join(outputDir, '.gitignore')
    );
  }
  if (fs.pathExistsSync(path.join(outputDir, 'gitignore'))) {
    fs.removeSync(path.join(outputDir, 'gitignore'));
  }
}

export default async function cloneTemplate(
  projectName,
  templateName = TEMPLATES.basic
) {
  const templatePath = path.resolve(__dirname, '../../templates', templateName);
  const outputDir = path.resolve(process.cwd(), projectName);
  const skipFiles = ['node_modules', 'dist', 'build'];
  const isTypeScript = templateName === TEMPLATES.typescript;

  messages.preCloneTemplate(outputDir);

  fs.mkdirSync(outputDir, { recursive: true });
  copy(templatePath, outputDir, skipFiles);

  try {
    updatePackageJson(outputDir, projectName);
    messages.preInstallDependencies();
    await installDependencies(outputDir, { isTypeScript });
    await renameGitIgnore(outputDir);
    messages.complete(outputDir, projectName);
  } catch (e) {
    console.log(e);
  }
}
