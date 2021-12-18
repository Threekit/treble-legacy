---
id: tutorial-embedding
title: Embedding your app in a website
sidebar_label: '4. Embedding your app'
---

# Embedding your app in a website

## Overview

To embed the hosted App in any existing web-page or eCommerce setup you will need to add two things into the HTML content of that page - The set of **HTML elements** we want to embed out UI into and the **script tag** to request our React UI bundle.

### Set of HTML Elements

In the eCommerce or webpage you're embedding into, you will need to add an HTML element that the Treble App can load itself into. In most cases this will be a single `div` container but it can be multiple containers as need, for example if you need to separate the Player and Form in the page. Each `div` must have the correct Id for the Treble App to be able to locate it in the page. For example

```html
<div id="tk-treble-root"></div>
```

To get a list of all the containers that will have to be created for the App, you can head over to the `public/index.html` file and see what div's exist there, making sure they have counterparts in the environment your are embedding.

### Embed Script

We will also need add a `<script>` tag to request and execute our built Treble App bundle. By default, `@threekit-tools/treble-scripts` will create a single bundle for the React app with the filename `threekit-embed.js` in the `build` folder - this is the file we need to reference in the script tag.

```html
<script src="https://treble-app.com/threekit-embed.js" defer></script>
```

## Code Examples

#### Multi HTML elements

```html
<body>
  <div id="tk-treble-root"></div>
  <div id="tk-treble-form"></div>
  <script src="https://treble-app.com/threekit-embed.js" defer></script>
</body>
```
