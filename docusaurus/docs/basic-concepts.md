---
id: basic-concepts
title: Basic Concepts
sidebar_label: Basic Concepts
---

# Basic Concepts

## The 10 Thousand Foot View...

The `Treble Framework` is intended to bootstrap development and support deployment of an eCommerce oriented web-experience for a Threekit Product configurator.

A `Treble App` is a React based, single-page UI project that uses the boilerplate code provided by `npx create-treble-app@latest`. It includes:

- **`Treble React` NPM package** - The main part of the Treble Framework, the Treble React NPM package includes all our components, hooks and Treble API. It can plug into any React powered project.
- **`Treble Scripts` NPM package** - A set of scripts to supporting development, with handling the local development server and bundling of the React app.
- **Treble Launchpad**. - A tool for deploying and hosting a Treble Project. It is not available as a default part of the Treble Framework and requires Threekit involvement to be setup for a project.

There are more details on each of these below....

:::info Adding Treble to an existing project

It is possible to add Treble to an existing React project by installing the `@threekit-tools/treble` package. In such a case, only the portions that relate to Treble React will be relevant to you.

:::

## Treble React

### Brief

Treble React is our React API made up of a library of components and hooks connected to the Threekit API. Its an ideal starting point for building out a React based UI for a Threekit configurator. Treble React is offered as an NPM package, available as `@threekit-tools/treble`.

### Threekit Provider

The primary component in the Treble system, the Threekit Provider is responsible for initializing the Threekit API and connecting it statefuly with all the hooks and components.

### Components

Presentational and interactive UI elements connected to the Threekit API, components are the building visual blocks for all the parts of the user interface that involves Threekit.

### Hooks

Hooks provide the Threekit related functionality to presentational components. You can use them to build your own components for any existing feature, focusing only on the presentation and styling aspects of the component and leave the functionality to the hook. All our components are built on top of our hooks.

### Treble API

A set of useful helper functions that address common requirements on web and eCommerce projects.

## Treble Scripts

The `Treble Script` are available in the `@threekit-tools/treble-scripts` package. They are similar in use and function to the `react-scripts` you get as part of the create-react-app project boilerplate. They encapsulate the webpack bundling and development server configurations that will be required for a React project.

The scripts are optimized to bundle the app into a single javascript file with a static name, ideal for embedding the final app as a portion of an existing webpage.

Fine out more about in the [Available Scripts](available-scripts) section.

## Treble Launchpad

Treble Launchpad is our internal deployment solution for a Treble Project hosted with Threekit. It provides a Express.js server and a Docker container mediated deployment pipeline to host and serve the build files from a `create-treble-app` project.

Its **strongly recommended** that a project using Treble Launchpad should be using `@threekit-tools/treble-scripts` for building its React code.
