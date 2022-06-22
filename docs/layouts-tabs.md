---
slug: layouts-tabs
title: Tabs
category: 6261727455090d002780b880
parentDoc: 62b381c6d83ddd00270e9ba0
---

# Tabs

```jsx
<Tabs />
```

## Overview

The `<Tabs />` component is used to section off and organize UI elements, like the form.

Each Tab must be wrapped by the `TabPane` component, available for import from the Tabs component. The TabPane also accepts a label as a prop to display to the user

## Code example

```jsx
import { Tabs } from '@threekit-tools/treble';

const { TabPane } = Tabs;

const App = () => {
  return (
    <Tabs>
      <TabPane label="Section 1 Heading">Section 1 content</TabPane>
      <TabPane label="Section 2 Heading">Section 2 content</TabPane>
    </Tabs>
  );
};
```

## Props

## TabPane

| Type      | Description                                  | Type   | Default |
| --------- | -------------------------------------------- | ------ | ------- |
| **label** | The title to give the item in the Accordion. | string | `''`    |