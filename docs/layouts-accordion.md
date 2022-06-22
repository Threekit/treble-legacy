---
slug: layouts-accordion
title: Accordion
category: 6261727455090d002780b880
parentDoc: 62b381c6d83ddd00270e9ba0
---

# Accordion

```jsx
<Accordion />
```

## Overview

An `<Accordion />` is used to section off and organize UI elements, like the form.

Each Accordion must be wrapped by the `AccordionItem` component, available for import from the Accordion component. The AccordionItem also accepts a label as a prop to display to the user

## Code example

```jsx
import { Accordion } from '@threekit-tools/treble';

const { AccordionItem } = Accordion;

const App = () => {
  return (
    <Accordion>
      <AccordionItem label="Section 1 Heading">Section 1 content</AccordionItem>
      <AccordionItem label="Section 2 Heading">Section 2 content</AccordionItem>
    </Accordion>
  );
};
```

## Props

## AccordionItem

| Type      | Description                                  | Type   | Default |
| --------- | -------------------------------------------- | ------ | ------- |
| **label** | The title to give the item in the Accordion. | string | `''`    |
