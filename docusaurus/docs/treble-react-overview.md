---
id: treble-react-overview
title: Overview
sidebar_label: Overview
---

# Overview

## Brief

Treble React is essentially a React component library, including a set of hooks and higher-level functions, with everything you need to build a Threekit Product UI.

The library follows a 'Provider' Pattern where all the React code interacting with the Threekit API is placed inside the ThreekitProvider. Within the ThreekitProvider context all Threekit components and hooks have complete flexibility in where and how they're used while still fully connected to the Threekit API, the 3D Player, and each other.

Treble React provides 3 family of features:

- `Components`, including the ThreekitProvider, Player, Forms, Widgets etc;
- `Hooks`, to provide the functionality to our components and any custom components you may want to build
- and `Helper Functions` in the Treble API so provide useful workflows and functionality for common feature implementations.

You can get a deeper understanding of Treble React in the following section.

## Anatomy of Treble React

### Threekit Provider

The Threekit Provider is an essential component when using the Treble React package. It's responsible for initializing the Threekit API and connecting the various components and hooks in our library.

The Threekit Provider should only be used once in a project. All other components and hooks in the Treble React library should be used in the side of the single Provider component.

To use the Threekit Provider and configure the Threekit API correctly we have to pass in a `credentials` object as a prop. We can optionally also pass in a `playerConfig` object to define the Threekit Player configuration for our project, a `theme` object to override any of the default theme settings, and finally the `threekitEnv` as 'preview' or 'admin-fts' depending on the Threekit environment we want to use.

You can find out more about the Threekit Provider by [clicking here](treble-react-threekit-provider).

### The Player

The Player component renders out the Threekit 2D/3D Player as well as any Widgets placed on it.

You can find out more about the Player Component by [clicking here](treble-react-player).

### Hooks

Our hooks are the functional building blocks of our components and any project. They provide a way for components to connect statefuly to the Threekit API. We build all our components using hooks, so if you ever need a new UI component for an existing UX feature, you can use our hooks and focus on just the UI component and its styling.

You can find out more about our Hooks by [clicking here](treble-react-hooks).

### Forms

Forms provide single component solutions to rendering out entire configurator forms as a single contiguous element.

You can find out more about Forms by [clicking here](forms-overview)

### Form Components

Form Components are the interactive UI components for the user to interact with the Attributes. These include components like `Swatches`, `TextInput`, `ColorPicker`, etc. Together the Form components are used to build the Form for the Product Configurator.

You can find out more about Form Components by [clicking here](form-components-overview)

### Widgets

Widgets offer us additional functional features that we can use to enhance the user's experience. They can cover a vast range of functionality, including: Zoom, Share, managing a Wishlist, etc.

The pattern linking all widgets is that they are implemented and triggered by a button placed on the Threekit Player itself. If a Widget feature requires additional UI or interactions, we hide them from the user by default and only make them available when the widget's button on the player is clicked. This was we avoid cluttering the UI, presenting information only when its relevant.

You can find out more about Widgets components by [clicking here](widgets-overview)

### Wrappers

Wrappers allow us to wrap a block of React code and apply some function to it.

You can find out more about the Wrapper components by [clicking here](wrappers-overview)

### Display Components

Display components are used to display specific data from the Threekit API to the user, following the default styling for that data.

You can find out more about Display components by [clicking here](display-overview)

### Layout Components

Layout components offer solutions to organize and structure your UI with components like Modals, Drawers, Accordions etc.

Since layout components are purely for presentational organization, they are not connected to the Threekit API and can be even be used outside of the Threekit Provider.

You can find out more about Layouts by [clicking here](display-overview)
