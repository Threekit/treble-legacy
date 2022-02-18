#! /usr/bin/env node

import createApp from './createTrebleApp.js';
import { nodeVersionError } from './messages.js';

const nodeVersion = process.versions.node;
const major = nodeVersion.split('.')[0];

if (major < 14) {
  nodeVersionError(nodeVersion);
  process.exit(1);
}

createApp();
