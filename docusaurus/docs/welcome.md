---
id: welcome
title: Welcome
sidebar_label: Welcome
---

# Treble Framework

:::info Beta version
Treble is currently available as a **preview for developers**. The library and documentation will be evolving quickly as we refine this project for launch.
:::

## Welcome to Treble!

Treble is a React powered framework used to build frontend web-experiences for Threekit Configurators. It offers a growing library of components and hooks that address common feature requirements for building product configurators for eCommerce.

## How to use this guide

To start getting to know the framework better you can head over to the [Basic Concepts](basic-concepts) section.

You'll find the Treble React documentation in the [Treble React](treble-react-overview) section.

Also available are the Threekit JS API and the Treble JS API, which the Treble React library is built on top of. Learn more about the underlying Treble JS API in the [Threekit/Treble JS API](treble-js-overview) section and the [Threekit Player API](https://community.threekit.com/hc/en-us/articles/4406068592539-Player-API-Client-side).

## Less talk, more code.

To jump right in you can add Treble to an existing React project by adding the package with the command:

```bash
yarn add @threekit-tools/treble
```

Or you can bootstrap a new Treble project by using the following command, replacing `app-name` for the name of your project:

```bash
npx create-treble-app app-name
```

For a more details on how to use Treble head over to out Getting Started section in the side menu.

## Hello World

The **Hello World** Treble apps. This snipped will load the Threekit Player with the product defined in the Threekit Config object.

```jsx live
<ThreekitProvider config={threekitConfig} threekitEnv={threekitEnv}>
  <Player />
</ThreekitProvider>
```
