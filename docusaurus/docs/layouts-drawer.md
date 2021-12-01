---
id: layouts-drawer
title: Drawer
sidebar_label: Drawer
---

# Drawer

```jsx
<Drawer />
```

## Overview

A `<Drawer />` can be used to present an actionable slide-out drawer to the user.

Drawers are great when we require the user to interact with a UI feature, but we don't want that feature to occupy space on out page by default. You can use the Drawer to create a floating layer that slides in-and-out from the side of the current page to get user feedback or display information.

## Code Examples

```jsx
import { useState } from 'react';
import { Drawer } from '@threekit-tools/treble';

const App = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const handleClose = () => setShowDrawer(false);

  return (
    <Drawer show={showDrawer} handleClose={handleClose}>
      <div>
        Content to be placed in the drawer is added as an HTML child element.
      </div>
    </Drawer>
  );
};
```

## Props

| Type            | Description                                                                                           | Type     | Default |
| --------------- | ----------------------------------------------------------------------------------------------------- | -------- | ------- |
| **title**       | The title to give to the Drawer.                                                                      | string   | `''`    |
| **showHeader**  | Sets whether to show or hide the Drawer's header. The header includes both the title and close button | boolean  | `true`  |
| **show**        | Set the value of whether to show or hide the Drawer.                                                  | boolean  | `false` |
| **handleClose** | A callback function to execute when the use clicks the Drawer's inbuilt close button.                 | function | `-`     |
| **className**   | A className to the display container.                                                                 | string   | `''`    |
