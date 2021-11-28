#! /usr/bin/env node

import cloneTemplate from "./scripts/clone-template.js";
import { TEMPLATES } from "./constants.js";
import { prepProcessArgs } from "./utils.js";
import { missingProjectName } from "./messages/index.js";
import enquirer from "enquirer";

const argv = process.argv.slice(2);
const preppedArgs = prepProcessArgs(argv);

const templateName = preppedArgs.flags.template
  ? TEMPLATES[preppedArgs.flags.template]
  : TEMPLATES.basic;

let projectName = preppedArgs.appName;

const init = async () => {
  if (!projectName) {
    const response = await enquirer.prompt({
      type: "input",
      name: "projectName",
      message: "Please provide a name for your project?",
    });
    projectName = response.projectName.replace(/ /g, "-").toLowerCase();
  }
  cloneTemplate(projectName, templateName);
};

init();
