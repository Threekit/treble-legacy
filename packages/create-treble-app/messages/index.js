import chalk from "chalk";

export const missingProjectName = () => {
  console.log();
  console.log();
  console.log(chalk.red("App name is missing..."));
  console.log();
  console.log(`Please include a name for your Treble app by entering the `);
  console.log(`command in the following format and replacing the 'app-name'.`);
  console.log();
  console.log(chalk.cyan(`  npx create-treble-app app-name`));
  console.log();
  console.log();
};
