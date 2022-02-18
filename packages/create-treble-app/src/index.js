#! /usr/bin/env node

import createTrebleApp from './createTrebleApp.js';

const nodeVersion = process.versions.node;
const major = nodeVersion.split('.')[0];

if (major < 14) {
  console.error(
    'You are running Node ' +
      nodeVersion +
      '.\n' +
      'Create React App requires Node 14 or higher. \n' +
      'Please update your version of Node.'
  );
  process.exit(1);
}

createTrebleApp();
