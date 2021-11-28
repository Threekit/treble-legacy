---
sidebar_position: 5
custom_edit_url:
---

# Available Scripts

:::caution Note

Treble scripts are only included if you followed the 'create new Treble project' approach. If you added Treble React to an existing project, it should work with your existing bundling scripts.

:::

The `create-treble-app` project comes loaded with the `@threekit-tools/treble-scripts` package that you can run from the project's root directory. You can run:

### `yarn start`

Run the Treble app in its local development mode. Open http://localhost:3000 to view it in your browser.

The page will reload when any edits are saved.

You can specify the **Threekit Environment** you'd wish to use by passing it in as a flag in the run script. By default the Threekit Environment is set to `preview`.

```bash
yarn start --admin-fts
```

### `yarn build`

Builds your app into the `build` folder.

The React portion of the app is bundled into a single javascript bundle file with the name `threekit-embed.js`. Having a static name for across deployment allows us to redeploy without having to update the embed script tag for our app.

Your app is ready for deployment!

```bash
yarn build --preview
```
