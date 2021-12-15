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

The `<ThreekitProvider />` initializes the Threekit API used by the various components and hooks in the Treble library. It should be wrapped around the portion of the React app where the Treble components and hooks are being used.

The Threekit Provider is where we pass in all our Threekit setup and initialization parameters that are used throughout our app. It takes the accepts the following props:

- **Credentials** - Threekit credentials for the all environments that will be used
- **Threekit Environment** - Which environment's credentials to use at runtime
- **Player Config [Optional]** - Parameters that will be passed to the Threekit Player API for initialization
- **Theme [Optional]** - Overrides to the default theme

We normally organize the `credentials`, `playerConfig` and `theme` props into a single object called `threekitConfig` and pass that to the ThreekitProvider as a destructured prop,

e.g. `<ThreekitProvider {...threekitConfig}></ThreekitProvider>`

however you can also pass the objects in as individual props...

`<ThreekitProvider credentials={credentials} playerConfig={playerConfig}></ThreekitProvider>`

You can find more details on each of these props below.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

import { ThreekitProvider } from '@threekit-tools/treble';
import App from './App';

const threekitConfig = {
  credentials {
    preview: {
      //  These credentials are just examples and DO NOT
      //  point to a real org
      publicToken: '3fb4asd5d-ea38-4a05-a2g3-6cf9d8dd3d48',
      assetId: 'a9a66218-bkid-4106-96fe-a0359fdc3dc1',
      orgId: '20df501b-1ef8-4bh0-sfda-2l59426624de',
    },
  }
};

const threekitEnv = 'preview';

ReactDOM.render(
  <ThreekitProvider {...threekitConfig} threekitEnv={threekitEnv}>
    <App /> // All Threekit related code goes here
  </ThreekitProvider>,
  document.getElementById('root')
);
```

## Props

### threekitEnv

The `threekitEnv` sets the Threekit environment, `preview | admin-fts`, for Treble to use when running the app. It defaults to the **preview** environment.

```js
const threekitEnv = 'admin-fts';
```

### credentials

The credentials include all parameters and authentication tokens that are specific to the Threekit Environment, `preview` / `admin-fts`, you are using. These include:

```js
const credentials = {
  //  The name of the object should be the environment
  //  you want to use: preview | admin-fts
  preview: {
    //  The public auth token created in the settings
    //  tab in your org on the Threekit Platform. It should
    //  include the `localhost` domain for local development
    //  and any domains to include for production / deployment
    publicToken: '',
    //  The Org Id for the Threekit Org
    orgId: '',
    //  The asset id of the Catalog Item you wish to initialize
    //  in the Threekit Player
    assetId: '',
    //  (optional): The Asset Id of the Stage you wish to initialize in the
    //  Threekit Player
    stageId: '',
  },
};
```

:::tip

The Threekit Auth Token should be passed into its environment object under the key `publicToken`.

:::

### Threekit Player API Parameters

The **Player API initialization parameters** should be added directly to the `threekitConfig` object. More information about parameters can be found here: [Embedding the Threekit Player](https://community.threekit.com/hc/en-us/articles/4406068353307-Embedding-the-Threekit-Player).

```js
const threekitConfig = {
  playerConfig: {
    //  (optional): determines whether to use the 3D Player (webgl) or
    //  the 2D Player (image).
    display: 'webgl' | 'image',
    //  The caching options for the player. It contains the maxAge
    //  and scope for assets caching.
    cache,
    //  (optional): Determines if we render the default Threekit
    //  configurator.
    showConfigurator: true | false,
    //  (optional): An override for the configuration to initialize
    //  our asset with.
    initialConfiguration: {},
    //  (optional): parameter to display a snapshot while the player
    //  is loading. Default value is false
    showLoadingThumbnail: true | false,
    //  (optional): Determines if we show the progress bar during
    //  load. Default value is true.
    showLoadingProgress: true | false,
    //  Takes a callback as its value. The callback's only argument
    //  is a number, representing the progress ratio ( from 0.0
    //  to 1.0 ). The callback will be called whenever the loading
    //  progresses. The progress ratio is only approximate.
    onLoadingProgress: progress =>
      console.log(`Progress ${parseInt(progress * 100)}`),
    //  (optional): Parameter to show/hide the built-in AR Button.
    //  Default value is false.
    showAR,
    //  (optional): Parameter to show/hide the built-in Share
    //  Button. Default value is false.
    showShare,
    //  (optional): toggles vertical orbit on mobile devices on or
    //  off. Default value is false.
    allowMobileVerticalOrbit: true | false,
    //  (optional): Override organization's compression setting for
    //  renders in 2D player.
    compression,
  },
};
```

### Theming

The **theme** is used to style all the component available in the Treble library. You can override any of the default values by passing in your own value for a parameter into the theme object.

The default values for the theme are:

```js
const threekitConfig = {
  theme: {
    primaryColor: '#1890ff',
    linkColor: '#1890ff',
    successColor: '#52c41a',
    warningColor: '#faad14',
    errorColor: '#f5222d',
    fontBaseSize: '14px',
    headingColor: 'rgba(0, 0, 0, 0.85)',
    textColor: 'rgba(0, 0, 0, 0.65)',
    textColorSecondary: 'rgba(0, 0, 0, 0.45)',
    disabledColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: '2px',
    borderColorBase: '#d9d9d9',
    boxShadowBase:
      '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);',
    widgetSize: '36px',
    fontFamily: '"Open Sans", sans-serif',
  },
};
```

## Code Example

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

import { ThreekitProvider } from '@threekit-tools/treble';
import App from './App';

const threekitConfig = {
  credentials: {
    //  The environment specific credentials should be placed
    //  in an object assigned to the name of the environment
    //  Note: The token key is 'publicToken' not 'authToken'
    preview: {
      publicToken: '3fb4asd5d-ea38-4a05-a2g3-6cf9d8dd3d48',
      assetId: 'a9a66218-bkid-4106-96fe-a0359fdc3dc1',
      orgId: '20df501b-1ef8-4bh0-sfda-2l59426624de',
    },
    'admin-fts': {
      publicToken: '3fb4asd5d-ea38-0g05-a1c3-6cf9d8dd3d48',
      assetId: 'a9a66218-bkid-2206-96fe-a0709fdc3dc1',
      orgId: '20df501b-1ef8-4bkm-sfda-2b99426624de',
    },
  }
  playerConfig: {
    //  Any additional parameters to pass to the player initialization
    //  can also be added here. For example setting the showShare
    //  property
    showShare: true,
    // We can pass overwrites to the default theme
    theme: { primaryColor: '#54AA54' },
  }
};

const threekitEnv = 'preview';

ReactDOM.render(
  <ThreekitProvider {...threekitConfig} threekitEnv={threekitEnv}>
    <App /> // All Threekit related code goes here
  </ThreekitProvider>,
  document.getElementById('root')
);
```

```js
const threekitConfig = {
  //  The name of the object should be the environment
  //  you want to use: preview | admin-fts
  credentials: {
    preview: {
      //  The public auth token created in the settings
      //  tab in your org on the Threekit Platform. It should
      //  include the `localhost` domain for local development
      //  and any domains to include for production / deployment
      publicToken: '',
      //  The Org Id for the Threekit Org
      orgId: '',
      //  The asset id of the Catalog Item you wish to initialize
      //  in the Threekit Player
      assetId: '',
      //  (optional): The Asset Id of the Stage you wish to initialize in the
      //  Threekit Player
      stageId: '',
    },
  },
};
```

## Props

#### Threekit Provider Props

| Property         | Description                                       | Type                     | Default   |
| ---------------- | ------------------------------------------------- | ------------------------ | --------- |
| **threekitEnv**  | The Threekit Platform Environment to use          | `preview` \| `admin-fts` | `preview` |
| **credentials**  | The credentials for your Threekit Environment.    | `ThreekitCredentials`    | `-`       |
| **playerConfig** | The Threekit Player initialization config object. | `ThreekitPlayerConfig`   | `-`       |
| **theme**        | The theme overrides.                              | `Theme`                  | `-`       |

## Credentials

| Property        | Description                                                                                                                                                                                                                                 | Type             | Default |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------- |
| **publicToken** | The public auth token created in the settings tab of your Threekit Platform Org on the relevant Threekit Environment. It should include the `localhost` domain for local development and any domain to include for deployment / production. | `string (uuid4)` | `-`     |
| **orgId**       | The Threekit Org ID                                                                                                                                                                                                                         | `string (uuid4)` | `-`     |
| **assetId**     | The Asset ID for the Threekit Product you'd like to initialize. ID                                                                                                                                                                          | `string (uuid4)` | `-`     |
| **stageId**     | (optional) The Asset Id of the Stage you wish to initialize.                                                                                                                                                                                | `string (uuid4)` | `-`     |

## Player Config

| Property                     | Description                                                                                                                                                                                           | Type                         | Default |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------- |
| **display**                  | (optional) Determines whether to use the 3D Player (`webgl`) or the 2D Player (`image`)                                                                                                               | `webgl` \| `image`           | `webgl` |
| **cache**                    | (optional) The caching options for the player. It contains the maxAge and scope for assets caching.                                                                                                   | string                       | `-`     |
| **showConfiguration**        | (optional) Determines if we render the default Threekit configurator.                                                                                                                                 | boolean                      | `false` |
| **initialConfiguration**     | (optional) An override for the configuration to initialize our asset with.                                                                                                                            | `ConfigurationObject`        | `{}`    |
| **showAR**                   | (optional) Parameter to show/hide the built-in AR Button.                                                                                                                                             | boolean                      | `false` |
| **showShare**                | (optional) Parameter to show/hide the built-in Share Button.                                                                                                                                          | boolean                      | `false` |
| **allowMobileVerticalOrbit** | (optional) Toggles vertical orbit on mobile devices on or off.                                                                                                                                        | boolean                      | `false` |
| **showLoadingThumbnail**     | (optional) Determines whether to display a snapshot while the player is loading.                                                                                                                      | boolean                      | `true`  |
| **showLoadingProgress**      | (optional) Determines if we show the progress bar during load.                                                                                                                                        | boolean                      | `true`  |
| **onLoadingProgress**        | (optional) Takes a callback as its value. The callback's only argument is a number, representing the progress ratio ( from 0.0 to 1.0 ). The callback will be called whenever the loading progresses. | `(progress: number) => void` | `-`     |
| **compression**              | (optional) Override the organization's compression setting for renders in 2D player.                                                                                                                  | boolean                      | `false` |

## Theme

| Property         | Description                                                                      | Type   | Default   |
| ---------------- | -------------------------------------------------------------------------------- | ------ | --------- |
| **primaryColor** | The primary accent color used for all the selection and hover states for the UI. | string | `#1890ff` |
| **linkColor**    | The color to render out `<a>` tag links.                                         | string | `#1890ff` |
| **successColor** | The color used for success messaging.                                            | string | `#1890ff` |
| **warningColor** | The color used for warning messaging.                                            | string | `#faad14` |
| **errorColor**   | The color used for error messaging.                                              | string | `#f5222d` |
