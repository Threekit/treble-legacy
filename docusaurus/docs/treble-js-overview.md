---
id: treble-js-overview
title: Overview
sidebar_label: Overview
---

# Overview

The the `ThreekitProvider` is initialized, it runs the Threekit Player API and instantiates the Treble Class, placing both on the window object in the following structure:

```js
window.threekit = {
  player,
  configurator,
  treble,
};
```

The first two modules - the `player` and the `configurator` are the standard **Threekit JS API** modules. You can find out more about then in the [Threekit docs by clicking here](https://community.threekit.com/hc/en-us/articles/4406068592539-Player-API-Client-side).

The **Treble JS API** is a library of higher-level functions built over the Threekit JS APIs as well as the Threekit REST API. It offers convenient abstractions for common features and requirements in Web and eCommerce projects.
