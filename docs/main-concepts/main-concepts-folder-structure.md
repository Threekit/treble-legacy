---
slug: treble-main-concepts-folder-structure
title: Folder Structure
category: 6261727455090d002780b880
parentDoc: 62b4ff1de2c89700a801c530
---

The project's folder structure is purposefully kept to be as close to that of a create-react-project. Using the Treble Framework should feel familiar to anyone who has worked with CRA.

After setup your Treble App's folder structure should look like this:

```
my-treble-app/
  threekit.config.js
  README.md
  node_modules/
  package.json
  .env
  .eslintrc.js
  .prettierrc
  .gitignore
  .vscode
    settings.json
    extensions.json
  .treble/
    player.config.js
    treble.config.js
  public/
    index.html
    favicon.ico
  src/
    App.js
    index.css
    index.js
    components/
    products/
```

For the app to run and build, these files must exist with exact filenames:

- `public/index.html` is the page template
- `src/index.js` is the JavaScript entry point
- `threekit.config.js` has the Threekit credentials
- `.treble` directory with the Treble Apps config files

For a multi-product Treble App, the Product Layouts must be stored in the `src/products` folder.

We recommend storing your credentials in the `.env` file so they are not checked into the git repository.
