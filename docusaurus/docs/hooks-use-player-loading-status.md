---
id: hooks-use-player-loading-status
title: Use Player Loading Status
sidebar_label: usePlayerLoadingStatus
---

# Use Player Loading Status

```jsx
const hasLoaded = usePlayerLoadingStatus();
```

## Overview

The `usePlayerLoadingStatus` hook returns a single boolean value indicating whether the Threekit Player has rendered out a product configuration or is in the process of applying and rendering a change/new product configuration.

The hook will return `true` if the Player has finished its render and `false` when the configuration is changed until that change has been rendered and visualized by the Player.

On more projects with large/high fidelity visual assets, there can be a slight time lag between the user making a selection and the assets for that selection being requested and rendered by the player. During this time lag, before the visuals have updated, the user can assume that their action did not go through and that nothing is happening. We can design around this by tracking when the Player is 'loading' a new configuration, as with this hook, and render a loading icon over the form-component used to change the configuration, until the load is complete. It enabled us to provide the user some feedback that their action is being handled.

## Code Examples

```jsx
import { usePlayerLoadingStatus } from '@threekit-tools/treble';

const Component = () => {
  const hasLoaded = usePlayerLoadingStatus();
  return (
    <div>
      {hasLoaded
        ? 'Threekit Player has rendering'
        : 'Player rendering in progress...'}
    </div>
  );
};
```
