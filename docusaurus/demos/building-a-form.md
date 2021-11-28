---
sidebar_position: 3
custom_edit_url:
hide_table_of_contents: true
sidebar_label: Building your own form
---

# Constructing your own Form

:::caution note

The Threekit Player doesn't place nicely with the demos feature of our documentation. If you don't see the 3D visuals, please refresh the page and the Player should load and render as expected.

:::

## Overview

This demo showcases how we can build our own Form using the Form Components we have available to us..

It includes: the **Threekit Provider**, the **Player Component** and the **Flat Form component** with some customization of the attributes.

## Demo Code

```jsx live
function ThreekitApp() {
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
        <div>
          <ProductName />
          <ProductDescription />

          <TilesGroup attribute="Shell Style" />

          <Swatch attribute="Shell Color" />

          <Swatch attribute="Shell Secondary Color" />
        </div>
      </div>
    </ThreekitProvider>
  );
}
```
