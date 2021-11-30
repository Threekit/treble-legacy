---
id: best-practices
title: Best Practices
sidebar_label: Best Practices
---

# Best Practices

### Keep it lightweight

Keep it simple. Especially for projects embedding into an existing product page - try to keep the UI you have to build to a minimum. Leverage as much of the UI on the existing page possible, ideally limiting your development to components/visuals that directly interact with the underlying Threekit API.

### The Player is the centerpiece

The Player or rather the visuals in the Player should be the center piece of the page. The form in comparison should be big enough to allow a comfortable and intuitive configuration experience but no bigger.

### Widgets on the Player

A good way to implement add-on features is as Player widgets. We place any UI for the feature on a Modal/Drawer component out of view from the user's regular flow and add a button or two on the inside edge of the Player component to toggle the feature UI into view. All Threekit Widgets are implemented along this principle.

### Curate the experience by organizing form

Don't overload the user with too much information and too many choices at once. Break up the form in space and in time, presenting them with a clear set of instructions and actions at any given time in the configuration process.

### Minimize required clicks

Configuring should be playful and fun. Organizing the form for clarity should be balanced by the ability for the user to quickly move through many configurations without too much hassle.

### Catalog and Configurator Design Matters

Consider the bigger picture when organizing and structuring your product catalog. All UI data requirements, configurator/form dependencies and product data outputs should be considered when designing the Catalog as a project's primary data structure. Even small changes become tedious and its best to avoid them where possible

### Consider Interactions on Mobile

Without right-click or scroll-wheel on mobile, the interaction to rotate an object in 3D is the same as to scroll the page. We get around this by turning off vertical rotation in the Threekit player on mobile by default, however, projects often require vertical rotation even on mobile and have to design their UI aware of this and other such constraints.
