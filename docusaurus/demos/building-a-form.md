---
id: demo-building-a-form
title: Constructing your own Form
sidebar_label: Building a Form
hide_table_of_contents: true
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
    <ThreekitProvider config={threekitConfig} threekitEnv={'preview'}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 400px',
          gridGap: '12px',
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
