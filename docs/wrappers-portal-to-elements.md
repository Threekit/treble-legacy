---
slug: wrappers-portal-to-element
title: Portal to Element
category: 6261727455090d002780b880
parentDoc: 62b381c64bf3a7004a150e92
---

```jsx
<PortalToElement>
```

## Overview

The `<PortalToElement>` wrapper can be used to place its content in any div anywhere in the DOM. This is can be very useful when embedding the app in an existing eCommerce page or Website, where you can split the app up into sections to be rendered independently within the page's existing html structure.

The wrapper requires a `to` prop to specify the id of the div to render its contents into. It also optionally takes a `strict` prop, which determines the behavior if the element to render the content into is not found. `strict={true}` will only render the contents in the HTML element matching the provided element ID, while `strict={false}` (default) will render out its contents as part of the regular React flow, if the specified element is not found.

## Code Examples

```jsx
import { AwaitThreekitLoad } from '@threekit-tools/treble';

const Component = () => {
  return (
    <div>
      <div>Content here will be rendered as normal</div>
      <PortalToElement to="form-container">
        This content will only be rendered in a div with the id 'form-container'
      </PortalToElement>
    </div>
  );
};
```

## Props

| Property   | Description                                                                                                                                                                       | Type    | Default |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| **to**     | The id of the HTML element you want the content to be rendered in.                                                                                                                | string  | `-`     |
| **strict** | Defines the behavior if the HTML element is not found. If strict is set to `true` the content will not render, if set to `false` the content will render out in its default flow. | boolean | `false` |
