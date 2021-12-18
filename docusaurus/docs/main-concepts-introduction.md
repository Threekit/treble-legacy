---
id: main-concepts-introduction
title: Treble Overview
sidebar_label: Treble Overview
---

# Treble Overview

## The 10 Thousand Foot View...

The **Treble Framework** provides a variety of packages, tools and boilerplate code intended to bootstrap development and support deployment of an eCommerce oriented web-experience (Treble App) for one or more Threekit Product configurators. These apps can range from multi-page stand-alone React apps to a simple Player and Form embed inside an existing eCommerce page.

## Anatomy of a Treble App

In this section you'll get a brief introduction to each aspect of the Treble Framework.

### Treble React Package

`@threekit-tools/treble`

Treble React is the core library of the Treble Framework. It includes all the hooks, component and Treble API functionality that you will need to build out a UI.

The Threekit 2D/3D Player is available in the Treble React package.

To start learning more about the Treble React [click here](main-concepts-treble-react), or you can jump right into the the documentation for the [components](components-overview) of the [hooks](hooks-overview).

### Treble Scripts Package

`@threekit-tools/treble-scripts`

The Treble Scripts are similar in use and function to the `react-scripts` you get as part of the create-react-app project boilerplate. They include the webpack configurations and all scripts needed for setting up our local development server and building for deployment.

Find out more about in the [Available Scripts](main-concepts-scripts) section.

### Treble JS API

`window.threekit.treble`

As part of the Threekit API initialization, the Treble Framework will also include the Treble JS API. This API includes a set of useful helper functions and decorator methods over the standard Threekit JS API that address common requirements on web and eCommerce projects.

The API is available on the `window` object of the Treble App as `window.threekit.treble`.

To explore all the methods available through the Treble JS API, [click here](treble-js-overview).

### Project Config

Project specific configurations are stored in two places: the **`threekit.config.js`** file and the **`.treble`** directory.

The **`threekit.config.js`** file contains all the credentials specific to the project. Adding these credentials to the threekit.config.js file is a required step in setting up your Treble App for development.

To learn more about the **threekit.config.js** file, [click here](main-concepts-threekit-config).

The **`.treble`** folder includes the `player.config.js` file where all the Threekit Player parameters are set and the `treble.config.js` file where the parameters for the Treble App itself are defined.

To learn more about the **player.config.js** file, [click here](main-concepts-player-config).

### Custom Components

`src/components`

Included in the Treble App boilerplate is a folder of custom components that can be used and modified for a project. The components in this folder are built using the hooks from the Treble React Package and styled using the Tailwind CSS library.

To learn more about Tailwind and using it in the custom components you can head over to the Tailwind documentation by [clicking here](https://tailwindcss.com/).

### Product Layouts

`src/products`

The products folder is where all the Product Layouts are organized. Each Product Layout file in this folder is for a unique product form, that can be used for one or many products.

:::caution File Names

Product Layout files must be named to match the following pattern: `*.product.jsx`. For example, `Helmet.product.jsx`

:::

### Treble Launchpad

The Treble Lauchpad is our tool for deploying and hosting a Treble App. It is not available as a default part of the Treble Framework and requires Threekit involvement to be setup for a project.
