---
slug: treble-main-concepts-player-config
title: Player Config
category: 6261727455090d002780b880
parentDoc: 62b4ff1de2c89700a801c530
---

## Overview

The `player.config.js` file, located at `.treble/player.config.js`, contains the **Player API initialization parameters** that are passed directly to the Threekit Player API. These exclude all the environment specific parameters and values which are handled in the credentials in `threekit.config.js`.

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

## Sample Code

```jsx
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
```
