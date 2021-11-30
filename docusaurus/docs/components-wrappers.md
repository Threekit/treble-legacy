---
id: components-wrappers
title: Wrappers
sidebar_label: Wrappers
---

# Wrappers

## Await Threekit Load

The `<AwaitThreekitLoad>` wrapper, is used to wrap any content that we don't want to render until the Threekit Player initialization process is complete.

```jsx
import { AwaitThreekitLoad } from '@threekit-tools/treble';

const Component = () => {
  return (
    <div>
      <div>Content here will be rendered as normal</div>
      <AwaitThreekitLoad>
        This content will only be rendered after the Threekit Player
        initialization is complete
      </AwaitThreekitLoad>
    </div>
  );
};
```

## Portal to Element

The `<PortalToElement>` wrapper can be used to place its content in any div anywhere in the DOM. This is can be very useful when embedding the app in an existing eCommerce page or Website, where you can split the app up into sections to be rendered independently within the page's existing html structure.

The wrapper requires an `elementId` prop to specify the id of the div to render its contents into. It also optionally takes a `strict` prop, which determines the behavior if the element to render the content into is not found. `strict={true}` will only render the contents in the HTML element matching the provided element ID, while `strict={false}` (default) will render out its contents as part of the regular React flow, if the specified element is not found.

```jsx
import { AwaitThreekitLoad } from '@threekit-tools/treble';

const Component = () => {
  return (
    <div>
      <div>Content here will be rendered as normal</div>
      <PortalToElement elementId="form-container">
        This content will only be rendered in a div with the id 'form-container'
      </PortalToElement>
    </div>
  );
};
```
