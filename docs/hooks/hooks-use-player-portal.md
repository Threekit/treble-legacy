---
slug: treble-hooks-use-player-portal
title: Use Player Portal
category: 6261727455090d002780b880
parentDoc: 62b4ff1dea5ebc037be1664b
---

```jsx
const [portalPlayerTo, portalBack] = usePlayerPortal();
```

## Overview

The `usePlayerPortal` hook loads the Threekit Player into an HTML element in the user's view.

The Threekit Player requires an HTML element, to initialize the Threekit API, that will not be removed from the DOM. By default, we load the Player into a 'player-loader' div that we keep out of the user's view and move the player to other, user accessible elements in the DOM when the Player needs to be shown to the user.

The `usePlayerPortal` returns an array with two functions - the first to portal the Threekit Player from the player-loader div to the HTML element of your choice and the second function portals the player back to the player-loader element, out of the user's view.

## Code Examples

```jsx
import { useEffect, useRef } from 'react';
import { usePlayerPortal } from '@threekit-tools/treble';

const PLAYER_DIV_ID = 'player-element';

const PlayerComponent = () => {
  const hasMoved = useRef(false);
  const [portalPlayerTo, portalBack] = usePlayerPortal();

  useEffect(() => {
    if (portalPlayerTo && !hasMoved.current) {
      portalPlayerTo(PLAYER_DIV_ID);
      hasMoved.current = true;
    }

    return () => {
      if (portalBack) portalBack();
    };
  });

  return <div id={PLAYER_DIV_ID} />;
};
```
