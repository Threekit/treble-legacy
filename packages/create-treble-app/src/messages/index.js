import chalk from 'chalk';

export const missingProjectName = () => {
  console.log();
  console.log();
  console.log(chalk.red('App name is missing...'));
  console.log();
  console.log(`Please include a name for your Treble app by entering the `);
  console.log(`command in the following format and replacing the 'app-name'.`);
  console.log();
  console.log(chalk.cyan(`  npx create-treble-app app-name`));
  console.log();
  console.log();
};

export const preCloneTemplate = outputDir => {
  console.log();
  console.log(outputDir);
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
};

export const preInstallDependencies = () => {
  console.log('Installing Treble project dependencies...');
};

export const complete = (outputDir, projectName) => {
  console.log();
  console.log(
    `Success! Created ${chalk.cyan(projectName)} at ${chalk.green(outputDir)}`
  );
  console.log('Inside that directory, you can run the following command:');
  console.log();
  console.log(`  ${chalk.cyan('yarn start')}`);
  console.log(
    `    Starts the local development server on ${chalk.cyan(
      'https://localhost:3000'
    )}.`
  );
  console.log();
  console.log(`  ${chalk.cyan('yarn build')}`);
  console.log(
    `    Bundles the app into a two static files named ${chalk.cyan(
      'treble-app.js'
    )} and ${chalk.cyan('treble-app.css')}, ready for production.`
  );
  console.log();
  console.log('Get started by typing:');
  console.log();
  console.log(`${chalk.cyan('cd')} ${projectName}`);
  console.log(chalk.cyan('yarn start'));
  console.log();
};
