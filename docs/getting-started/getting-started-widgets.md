---
slug: treble-getting-started-widgets
title: Adding widgets to your player
category: 6261727455090d002780b880
parentDoc:
---

## What are widgets?

In most Treble Apps, we need to implement features for the UX that require UI in addition to the Player and Form. This can often present the design challenge of where and how in the page to place these UI elements, which becomes more relevant as the complexity of the Product's configuration goes up. Widgets offer one conceptual way to approach such requirements that work for most projects.

A widget is one or more button, placed somewhere on the inside edge of the player, that the user can click to either trigger some functionality - i.e. button to take a snapshot or a pair of buttons to zoom in/out - or to display additional UI that was otherwise hidden from the user - i.e. button to open the wishlist drawer, button to open the share-sheet modal.

By placing the widget on the inside edge of the Player and hiding any additional UI by default, we're able to side step the question of how to fit the widget's required UI into an existing webpage's UI.

## Using Treble's widgets

Treble provides many widgets, like **Share Configuration** and **Download Product Snapshot**, as native components. We can import these widgets like any other components and place them on the player using one of the many widget-containers provided by the Player component.

We'll start by using the `<Share />` widget and add it to the **Top-Right** of our Player.

```jsx
import { ThreekitProvider, Player, Share } from '@threekit-tools/treble';
import Swatch from './components/Swatch';
import Dropdown from './components/Dropdown';

const TrebleApp = () => {
  return (
    <ThreekitProvider>
      <Player>
        <Player.TopRightWidgets>
          <Share />
        </Player.TopRightWidgets>
      </Player>
      <div>
        <Dropdown attribute="Exterior Material" />
        <Swatch attribute="Exterior Color" />
      </div>
    </ThreekitProvider>
  );
};
```

**Note: To learn more about the Player's widget containers you can [click here](components-player), or head over to the Player component page.**

## Building your own widgets
