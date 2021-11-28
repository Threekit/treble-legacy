#! /usr/bin/env node

import cloneTemplate from "./scripts/clone-template.js";
import { TEMPLATES } from "./constants.js";
import { prepProcessArgs } from "./utils.js";
import { missingProjectName } from "./messages/index.js";

const argv = process.argv.slice(2);
const preppedArgs = prepProcessArgs(argv);

const template = preppedArgs.flags.template
  ? TEMPLATES[preppedArgs.flags.template]
  : TEMPLATES.basic;

if (!preppedArgs.appName) {
  missingProjectName();
} else {
  cloneTemplate(preppedArgs.appName, template);
}
