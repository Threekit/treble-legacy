---
slug: main-concepts-scripts
title: Available Scripts
category: 6261727455090d002780b880
parentDoc: 62b381c69f5d810068dc9e96
---

# Available Scripts

## Overview

The Treble Framework comes loaded with the `@threekit-tools/treble-scripts` package to facilitate the development and deployment of a Treble App. It gives the ability to run the following scripts/commands straight from our projects root directory.

:::info Threekit Environment

If no Threekit environment is explicitly provided the scripts will default to using the Threekit `Preview` environment.

:::

### `yarn start`

Run the Treble app in its local development mode. Open http://localhost:3000 to view it in your browser.

The page will reload when any edits are saved.

You can specify the **Threekit Environment** you'd wish to use by passing it in as a flag in the run script. By default the Threekit Environment is set to `preview`.

```bash
yarn start --admin-fts
```

### `yarn build`

Bundles your app into the `build` folder.

The React portion of the app is bundled into a single javascript bundle file with the name `threekit-embed.js`. Having a static name for across deployment allows us to redeploy without having to update the embed script tag for our app.

Your app is ready for deployment!

```bash
yarn build --preview
```
