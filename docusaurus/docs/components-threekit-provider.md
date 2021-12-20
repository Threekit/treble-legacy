---
id: components-threekit-provider
title: Threekit Provider
sidebar_label: Threekit Provider
---

# Threekit Provider

:::info Multi-products

You **do not** need to use the ThreekitProvider if you are using the `<PlayerLayouts>` component to defined multiple products. The PlayerLayout component will setup the ThreekitProvider for you internally.

:::

```jsx
<ThreekitProvider />
```

## Overview

The `<ThreekitProvider />` is the engine of a Treble App. It is responsible for initializing the Threekit API and connecting the various components and hooks to the API through a central store.

Treble React follows a **provider pattern**, with the `<ThreekitProvider />` as our provider component. This design choice has a few implications:

- **Using the Threekit Provider is required** as it initializes the Threekit API. **NOTE:** The Threekit Provider is added internally if you are using a ProductLayout as part of a multi-product workflow. You do not have to add it in.
- **There can only be one Threekit Provider** in your app. This also means that there can be only one instance of the Threekit Player running.
- **All credentials and setup parameters go into the Threekit Provider**. By default the provider will look for all the relevant credentials and parameters in `threekit.config.js` and `.treble` respectively.
- **The Threekit Provider defines the context for a Treble App**, where all components and hooks that you use must be inside/descendants of the ThreekitProvider component.

By default, the ThreekitProvider gets the **project** (`threekit.config.js`), **playerConfig**, and **trebleConfig** (`.treble`) from their respective files itself. It's recommended that you update these files to your project requirements. However, the ThreekitProvider supports receiving all the data as props as well. Any data passed in as a prop will override the data read from the config files.

## Code Examples

#### Default use

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

import { ThreekitProvider } from '@threekit-tools/treble';
import App from './App';

ReactDOM.render(
  <ThreekitProvider>
    <App />
  </ThreekitProvider>,
  document.getElementById('root')
);
```

#### Providing over-ride credentials and parameters

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

import { ThreekitProvider } from '@threekit-tools/treble';
import App from './App';

const projects = {
  credentials: {
    preview: {
      //  These credentials are just examples and DO NOT
      //  point to a real org
      publicToken: '3fb4asd5d-ea38-4a05-a2g3-6cf9d8dd3d48',
      orgId: '20df501b-1ef8-4bh0-sfda-2l59426624de',
    },
  },
  products: {
    preview: {
      assetId: 'a9a66218-bkid-4106-96fe-a0359fdc3dc1',
    },
  },
};

const playerConfig = {
  allowMobileVerticalOrbit: true,
};

const threekitEnv = 'preview';

ReactDOM.render(
  <ThreekitProvider
    project={project}
    threekitEnv={threekitEnv}
    playerConfig={playerConfig}
  >
    <App />
  </ThreekitProvider>,
  document.getElementById('root')
);
```

## Props

| Property         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Type                     | Default   |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | --------- |
| **threekitEnv**  | The Threekit Platform Environment to use. This environment must have its relevant credentials and products included in the respective objects.                                                                                                                                                                                                                                                                                                                                                                   | `preview` \| `admin-fts` | `preview` |
| **project**      | The project contains both the `credentials` and the `products`. The credentials for the relevant Threekit Environment. To learn more about the credentials object [click here](main-concepts-threekit-config#credentials) or for information on getting your project's credentials [click here](main-concepts-credentials). The products object specifies the product to use for the relevant Threekit Environment. To learn more about the products object [click here](main-concepts-threekit-config#products) | `ThreekitCredentials`    | `-`       |
| **playerConfig** | The Threekit Player initialization config object. By default, this is the file `.treble/player.config.js`. It is recommended that you edit the file to your project needs, however, you can also pass in an override as this prop. You can find more information about the playerConfig by [clicking here](main-concepts-player-config).                                                                                                                                                                         | `ThreekitPlayerConfig`   | `-`       |
| **theme**        | The theme override. To learn more about using the theme, [click here](main-concepts-theme). overrides.                                                                                                                                                                                                                                                                                                                                                                                                           | `Theme`                  | `-`       |
