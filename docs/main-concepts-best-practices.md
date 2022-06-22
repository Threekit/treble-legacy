---
slug: main-concepts-best-practices
title: Best Practices
category: 6261727455090d002780b880
parentDoc: 62b381c69f5d810068dc9e96
---

# Best Practices

### Keep it lightweight

Keep it simple. Especially for projects embedding into an existing product page - try to keep the UI you have to build to a minimum. Leverage as much of the UI on the existing page possible, ideally limiting your development to components/visuals that directly interact with the underlying Threekit API.

### The Player is the centerpiece

The Player or more specifically the visuals in the Player should be the center piece of the page. The form in comparison should be big enough to allow a comfortable and intuitive configuration experience but no bigger.

### Adaptive Design vs Responsive Design

For most simple product configurators a responsive design works well for mobile, tablet and desktop - with the Player and Form moving from a horizontal layout on desktop/wide-screens to a vertical layout on mobile/tablet/narrow-screens. However, for more complex multi-product and spacial configurators, its important to consider an adaptive design where each screen-size/device class gets its own optimal template of the base design.

### Widgets on the Player

A good way to implement add-on features is as Player widgets. We place any UI for the feature on a Modal/Drawer component out of view from the user's regular flow and add a button or two on the inside edge of the Player component to toggle the feature UI into view. All Threekit Widgets are implemented along this principle.

### Curate the experience by organizing form

Don't overload the user with too much information and too many choices at once. Break up the form in space and in time, presenting them with a clear set of instructions and actions at any given time in the configuration process. At any given point the user should have clarity on what they want to do and how they can do it.

### Minimize required clicks

Configuring a product should be playful and fun. Organizing the form for clarity should be balanced by the ability for the user to quickly move through many configurations without too much hassle.

### Catalog and Configurator Design Matters

Most often the organization of your Catalog is most influences by the outputs you want to get once the user is done with their configuration - things like pricing and SKU data. Consider the bigger picture when building your product catalog, thinking through all the data inputs that need to be stored and how they will flow to outputs.

### Consider Player Interactions over UI

Adding interactions to the player - i.e. click-to-select, drag-to-trash - is a great way create a more engaging for the user. Not only that, it also enable creating a more intuitive user experience while requiring less UI.
