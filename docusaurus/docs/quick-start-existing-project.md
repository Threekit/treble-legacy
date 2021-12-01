---
id: quick-start-existing-project
title: Adding Treble to an Existing Project
sidebar_label: 'Quick Start: Existing Project'
---

# Adding Treble to an Existing Project

:::info Prerequisite

The Treble React NPM package can be added to any existing front-end project so long as it is using React or a React compatible framework.

:::

## Installation

To add the Treble to an existing project, run the following command using npm:

```bash
npm install @threekit-tools/treble
```

Or yarn:

```bash
yarn add @threekit-tools/treble
```

## Basic Setup

A basic app will include the **Threekit Provider**, to connect our components to the Threekit API, A **Player Component**, to render our 3D visuals, and a **Form** to let the user configure the visualized product.

To get started you can **copy the code from below**, populating the values in the `credentials` object accordingly.

:::info Threekit Environment Credentials

The credentials for the Threekit Provider have to come from the Threekit Platform. For more information about these credentials you can, [find out more here](threekit-config)

:::

```jsx
import { ThreekitProvider, Player, FlatForm } from '@threekit-tools/treble';

const credentials = {
  preview: {
    orgId: '',
    assetId: '',
    publicToken: '',
  },
};

const threekitEnv = 'preview';

function ThreekitApp() {
  return (
    <ThreekitProvider credentials={credentials} threekitEnv={threekitEnv}>
      <div
        style={{
          height: '100vh',
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'auto 400px',
          gridGap: '12px',
        }}
      >
        <Player />
        <FlatForm />
      </div>
    </ThreekitProvider>
  );
}

export default ThreekitApp;
```
