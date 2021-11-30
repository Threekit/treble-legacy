---
id: quick-start-existing-project
title: Adding Treble to an Existing Project
sidebar_label: 'Quick Start: Existing Project'
---

# Adding Treble to an Existing Project

## Prerequisite

The Treble package can be added to any existing front-end project so long as it is using React or a React compatible framework.

## Installation

To add the Treble package, run the following command using npm:

```bash
npm install @threekit-tools/treble
```

Or yarn:

```bash
yarn add @threekit-tools/treble
```

## Basic Setup

A basic app will include the **Threekit Provider**, to connect our components to the Threekit API, A **Player Component**, to render our 3D visuals, and a **Form** to let the user configure the visualized product.

To get started you can copy the code from below, populating the values in the `threekitConfig` object.

```jsx
import { ThreekitProvider, Player, FlatForm } from '@threekit-tools/treble';

const threekitConfig = {
  preview: {
    orgId: '',
    assetId: '',
    publicToken: '',
  },
};

const threekitEnv = 'preview';

const ThreekitApp = () => {
  return (
    <ThreekitProvider config={threekitConfig} threekitEnv={threekitEnv}>
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
};
```
