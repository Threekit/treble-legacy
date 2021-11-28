---
sidebar_position: 2
custom_edit_url:
hide_table_of_contents: true
---

# Basic Project Setup

:::caution note

The Threekit Player doesn't place nicely with the demos feature of our documentation. If you don't see the 3D visuals, please refresh the page and the Player should load and render as expected.

:::

## Overview

This demo showcases a basic bare-bones Treble project setup.

It includes: the **Threekit Provider**, the **Player Component** and the **Flat Form component** with some customization of the attributes.

## Demo Code

```jsx live
function ThreekitApp() {
  const attributes = {
    "Shell Color": {
      component: "swatch",
    },
    "Shell Secondary Color": {
      component: "swatch",
    },
    "Mask Color": {
      component: "swatch",
    },
    "Mask Style": {
      component: "tiles-group",
    },
  };

  return (
    <ThreekitProvider config={threekitConfig} threekitEnv={"preview"}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 400px",
          gridGap: "12px",
        }}
      >
        <Player />
        <FlatForm attributes={attributes} />
      </div>
    </ThreekitProvider>
  );
}
```
