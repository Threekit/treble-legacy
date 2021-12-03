---
id: treble-react-threekit-config
title: Threekit Config
sidebar_label: threekit.config.js
---

# Threekit Config

```js
const threekitConfig = {
  credentials: {},
  playerConfig: {},
  theme: {},
};
```

## Overview

The `threekit.config.js` object is the a single object that contains all the required credentials and parameters required to initialize and run a Treble App.

The Threekit Config is made up of 3 objects:

- `credentials` - The various Threekit Platform environment specific credentials
- `playerConfig` - Includes all the parameters passed through to the the Threekit Player API at initialization
- `theme` - The override for any of the theme value

## Threekit Config

### Credentials

The credentials include all the parameters and authentication tokens that are specific to a Threekit environment, such as `preview` or `admin-fts`.

| Property        | Description                                                                                                                                                                                                                                 | Type             | Default |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------- |
| **publicToken** | The public auth token created in the settings tab of your Threekit Platform Org on the relevant Threekit Environment. It should include the `localhost` domain for local development and any domain to include for deployment / production. | `string (uuid4)` | `-`     |
| **orgId**       | The Threekit Org ID                                                                                                                                                                                                                         | `string (uuid4)` | `-`     |
| **assetId**     | The Asset ID for the Threekit Product you'd like to initialize. ID                                                                                                                                                                          | `string (uuid4)` | `-`     |
| **stageId**     | (optional) The Asset Id of the Stage you wish to initialize.                                                                                                                                                                                | `string (uuid4)` | `-`     |

### Player Config

The `playerConfig` object includes all the **Player API initialization parameters** that are passed directly to the Threekit Player API. These exclude all the environment specific parameters and values which are handled in the `credentials`.

More information about parameters can be found here: [Embedding the Threekit Player](https://community.threekit.com/hc/en-us/articles/4406068353307-Embedding-the-Threekit-Player).

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

### Theme

The `theme` object allows you to pass in overrides to the default theme values used by the components throughout this library.

| Property         | Description                                                                      | Type   | Default   |
| ---------------- | -------------------------------------------------------------------------------- | ------ | --------- |
| **primaryColor** | The primary accent color used for all the selection and hover states for the UI. | string | `#1890ff` |
| **linkColor**    | The color to render out `<a>` tag links.                                         | string | `#1890ff` |
| **successColor** | The color used for success messaging.                                            | string | `#1890ff` |
| **warningColor** | The color used for warning messaging.                                            | string | `#faad14` |
| **errorColor**   | The color used for error messaging.                                              | string | `#f5222d` |

## Sample Code

A sample of a full `threekit.config.js`

```js
const credentials = {
  preview: {
    assetId: process.env.THREEKIT_PREVIEW_ASSET_ID,
    stageId: process.env.THREEKIT_PREVIEW_STAGE_ID,
    orgId: process.env.THREEKIT_PREVIEW_ORG_ID,
    publicToken: process.env.THREEKIT_PREVIEW_PUBLIC_TOKEN,
  },
  'admin-fts': {
    assetId: process.env.THREEKIT_ADMIN_FTS_ASSET_ID,
    stageId: process.env.THREEKIT_PREVIEW_STAGE_ID,
    orgId: process.env.THREEKIT_ADMIN_FTS_ORG_ID,
    publicToken: process.env.THREEKIT_ADMIN_FTS_PUBLIC_TOKEN,
  },
};

const playerConfig: {
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
  }

  const theme = {
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
  }

export default {
  credentials,
  playerConfig,
  theme
};

```
