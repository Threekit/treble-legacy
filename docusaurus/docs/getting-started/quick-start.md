---
sidebar_position: 1
custom_edit_url:
---

# Quick Start

## Installation

Run the following command using npm:

`npm install @threekit-tools/treble`

Or yarn:

`yarn add @threekit-tools/treble`

## Basic Setup

A basic app will include the **Threekit Provider**, to connect our components to the Threekit API, A **Player Component**, to render our 3D visuals, and a **Form** to let the user configure the visualized product.

To get started you can copy the code from below, populating the values in the `threekitConfig` object.

```jsx
import { ThreekitProvider, Player, FlatForm } from "@threekit-tools/treble";

const threekitConfig = {
  preview: {
    orgId: "",
    assetId: "",
    publicToken: "",
  },
};

const threekitEnv = "preview";

const ThreekitApp = () => {
  return (
    <ThreekitProvider config={threekitConfig} threekitEnv={threekitEnv}>
      <div
        style={{
          height: "100vh",
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "auto 400px",
          gridGap: "12px",
        }}
      >
        <Player />
        <FlatForm />
      </div>
    </ThreekitProvider>
  );
};
```
