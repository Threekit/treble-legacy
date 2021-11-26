---
sidebar_position: 2
custom_edit_url:
---

# Basic Concepts

## Brief

The Dev-Kit follows a 'Provider' Pattern where all the React code that interacts with the Threekit API is placed inside the ThreekitProvider. Within the ThreekitProvider context all Threekit components and hooks have complete flexibility in where and how they're used while still fully connected to the Threekit API, the 3D Player, and each other.

The Dev-Kit's provides 3 main family of features: Expanded functionality, including react-hooks, that provide direct ways to implement higher-level features, components built using that functionality to provide UI presentational elements for the configurator and many other features, and tools which allow us to add new and custom interactivity to the 3D.

## Components

- Form Components -> Components that can connect and control Attributes. (i.e. Buttons, Swatch)
- Widgets -> Components for Integration Features. (i.e. Snapshot, Zoom)
- Forms -> Component for an entire configurator, built up of Input Components. (i.e. Form)
- Layouts -> Organizational components for adding structure and visual heirarchy. (i.e. Modal, Accordion)
- Display -> Displays information sourced from Threekit. (i.e. Attribute Title, Price)
- Wrappers -> Components that wrap a block of express code. (i.e. PortalToElement, AwaitPlayerLoad)

- Hooks -> React Redux hooks to build Threekit powered and connected components. (i.e. useAttribute, usePrice).