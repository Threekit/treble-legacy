---
slug: treble-main-concepts-treble-react
title: Treble React
category: 6261727455090d002780b880
parentDoc: 62b381c69f5d810068dc9e96
---

## Provider Pattern

The Treble React package follows a **Provider Pattern**, where all Treble components and hooks must be used inside the provider. Within this provider context, all the components and hooks have complete flexibility in where and how they're used while still fully connected to the Threekit API, the 3D Player and each other.

The provider in Treble in the `<ThreekitProvider />`, which is responsible for requesting and initializing the Threekit API, setting up the Threekit store and connecting all the hooks and components to a centralized state. To learn more about the Threekit Provider, [click here](components-threekit-provider).

A Treble App will use either a ThreekitProvider or in the case of a multi-product app, will use a ProductLayout, where the ProductLayout component will apply the ThreekitProvider internally. You can find our more about the ProductLayout component and the multi-product workflow in [managing multiple products tutorial](tutorial-multi-products).

## Components and Hooks

Treble React provides 2 main family of features:

**Components** are functional UI elements that can be used directly to build the UI. For example, Color Swatches, Share Button.

**Hooks** are the functional building blocks for our components. They encapsulate all the functionality required for a a feature and allow you to build your own custom components by focusing only on the design and style.
