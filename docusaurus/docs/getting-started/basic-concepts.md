---
sidebar_position: 3
custom_edit_url:
---

# Basic Concepts

The Treble Framework is a complete set of tools for building React-based UIs and supporting their deployment and hosting for embedding on a existing webpage. The framework is made up of the following essential tools:

- **Treble React NPM package** - The main part of the Treble Framework, the Treble React NPM package includes all our components, hooks and Treble API. It can plug into any React powered project.
- **Treble Scripts NPM package** - A set of scripts to supporting development and bundling of a React project. Treble scripts come as part of the `create-treble-app` project boilerplate but are not required for using Treble React.
- **Treble Launchpad**. - The Treble Launchpad is our tool for deploying and hosting a Treble Project. It is not available as a default part of the Treble Framework and requires Threekit involvement to be setup for a project.

## Treble React

### Brief

The Treble React package follows a 'Provider' Pattern where all the React code that interacts with the Threekit API is placed inside the ThreekitProvider. Within the ThreekitProvider context all Threekit components and hooks have complete flexibility in where and how they're used while still fully connected to the Threekit API, the 3D Player, and each other.

Treble provides 3 main family of features: Expanded functionality, including react-hooks, that provide direct ways to implement higher-level features, components built using that functionality to provide UI presentational elements for the configurator and many other features, and tools which allow us to add new and custom interactivity to the 3D.

### Components

We offer an extensive library of components that address various functional needs:

- **Form Components** -> Components that can connect and control Attributes. (i.e. Buttons, Swatch)
- **Widgets** -> Components for Integration Features. (i.e. Snapshot, Zoom)
- **Forms** -> Component for an entire configurator, built up of Input Components. (i.e. Form)
- **Layouts** -> Organizational components for adding structure and visual hierarchy. (i.e. Modal, Accordion)
- **Display** -> Displays information sourced from Threekit. (i.e. Attribute Title, Price)
- **Wrappers** -> Components that wrap a block of express code. (i.e. PortalToElement, AwaitPlayerLoad)

### Hooks

A set of Treble React Hooks that connect components to all the Threekit related functionality. All our components are built using the hooks.

### Treble API

A set of Treble React Hooks that connect components to all the Threekit related functionality. All our components are built using the hooks.

## Treble Scripts

The `Treble Script` are available in the `@threekit-tools/treble-scripts` package. They are similar in use and function to the `react-scripts` you get as part of the create-react-app project boilerplate. They encapsulate the webpack bundling and development server configurations that will be required for a React project.

The scripts are optimized to bundle the app into a single javascript file with a static name, ideal for embedding the final app as a portion of an existing webpage.

Fine out more about in the [Available Scripts]('/../available-scripts.md') section.

## Treble Launchpad
