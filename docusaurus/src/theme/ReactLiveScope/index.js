/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import * as Treble from '@threekit-tools/treble';

const threekitEnv = 'preview';
const project = {
  products: {
    preview: {
      assetId: 'b6740d58-e077-4997-8a63-ceb2086ceb0b',
    },
  },
  credentials: {
    preview: {
      assetId: 'b6740d58-e077-4997-8a63-ceb2086ceb0b',
      orgId: 'dc454d74-5bfe-4bd9-b6da-ee6cb029562a',
      publicToken: 'c37e4b54-523f-4cbe-9994-0c5fb424f5ab',
    },
  },
};

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...Treble,
  threekitConfig: { project },
  threekitEnv,
};

export default ReactLiveScope;
