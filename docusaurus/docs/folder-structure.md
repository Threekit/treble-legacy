---
id: folder-structure
title: Folder Structure
sidebar_label: Folder Structure
---

# Folder Structure

The project's folder structure is purposefully kept to be as close to that of a create-react-project. Building a Treble project should feel familiar to anyone who has worked with CRA.

After setup your project's folder structure should look like this:

```
my-treble-app/
  threekit.config.js
  README.md
  node_modules/
  package.json
  .env.template
  .eslintrc.js
  .prettierrc
  .gitignore
  .vscode
    settings.json
    extensions.json
  public/
    index.html
    favicon.ico
  src/
    App.js
    index.css
    index.js
    components/
```

For the project to build, these files must exist with exact filenames:

- `public/index.html` is the page template
- `src/index.js` is the JavaScript entry point

The Treble React package is used in the `src/App.js` file.

Only files and directories included in the `src` folder will be included in the default `treble-scripts` webpack compilation.

## Formatting and Linting

We have prettier and eslint added as dependencies to handle linting and formatting.
