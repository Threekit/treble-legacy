---
slug: getting-started-form
title: Building your configurator form
category: 6261727455090d002780b880
parentDoc: 62603c47e065f503a3a80f3f
---

## Using the native Form

The Treble Framework includes a component for a pre-build form called the `<FlatForm>`. The **FlatForm** will render out the entire configurator for the initialized product, as it appears on the Threekit Platform, along with the item's name and any description is available.

```jsx
import { ThreekitProvider, Player, FlatForm } from '@threekit-tools/treble';

const TrebleApp = () => {
  return (
    <ThreekitProvider>
      <Player />
      <FlatForm />
    </ThreekitProvider>
  );
};
```

The form, by default, will display each attribute using the native Form Component that is set as a default for relevant attribute's type, however, you can also explicitly specify another native component you would like to use to present an attribute as well as any additional props that need to be passed to that component/attribute.

```jsx
import { ThreekitProvider, Player, FlatForm } from '@threekit-tools/treble';

const attributes = {
  //  This will render out 'Exterior Material' using the Dropdown component
  'Exterior Material': { component: 'dropdown' },
  //  This will render out 'Exterior Color' using the Swatch component.
  'Exterior Color': { component: 'swatch' },
  //  This will prevent 'Exterior Secondary Color' from rendering.
  'Exterior Secondary Color': undefined,
};

const TrebleApp = () => {
  return (
    <ThreekitProvider>
      <Player />
      <FlatForm attributes={attributes} />
    </ThreekitProvider>
  );
};
```

You can find more information about the FlatForm by [clicking here](forms-flat-form).

## Build your own Form

While the FlatForm component is a good place to start, working with the form as a single component might prove to be too limiting. For most projects we will want more control over the presentation of our form, including the ability to visually organize the attributes differently, or use custom components instead of the provided native ones. In such cases we would want to construct the form ourselves.

We can start by using the native Form Components provided by Treble, assigning each one an Attribute to present. These are the same components used in the `<FlatForm />`.

```jsx
import {
  ThreekitProvider,
  Player,
  Dropdown,
  Swatch,
} from '@threekit-tools/treble';

const TrebleApp = () => {
  return (
    <ThreekitProvider>
      <Player />
      <div>
        <Dropdown attribute="Exterior Material" />
        <Swatch attribute="Exterior Color" />
        <Dropdown attribute="Interior Material" />
        <Swatch attribute="Interior Color" />
      </div>
    </ThreekitProvider>
  );
};
```

These component's styling can be updated by providing a [custom theme](main-concepts-theme) or by using CSS to target the components HTML elements directly.

## Using custom components

If we need more control over the individual components in our form, for example to change their structure or content, then its time to switch over to the custom components. As part of the Treble boilerplate we provide a set of custom components located in `src/components`. These components are similar to many of the native components in Treble, only these can be edited, expanded and copied very easily for the projects needs.

Our custom components are styled using [tailwindCSS](https://tailwindcss.com/), however, you're free to use vanilla CSS or import and use any library/package you're comfortable working with for styling.

```jsx
import { ThreekitProvider, Player } from '@threekit-tools/treble';
import Swatch from './components/Swatch';
import Dropdown from './components/Dropdown';

const TrebleApp = () => {
  return (
    <ThreekitProvider>
      <Player />
      <div>
        <Dropdown attribute="Exterior Material" />
        <Swatch attribute="Exterior Color" />
        <Dropdown attribute="Interior Material" />
        <Swatch attribute="Interior Color" />
      </div>
    </ThreekitProvider>
  );
};
```

## Using Layouts to add organization

As the form starts to get larger it may become necessary to introduce some organization to the UI. Even without an overwhelming amount of information/options, adding organization and visual hierarchy can be a powerful tool in improving the user's experience. We can simplify the UX by reducing the information and options presented to the user at any given time to a manageable amount and we can create a more linear or guided experience for products with complex or unintuitive configurators.

For this example we'll organize our form into two sections, each in its own Accordion.

```jsx
import { ThreekitProvider, Player, Accordion } from '@threekit-tools/treble';
import Swatch from './components/Swatch';
import Dropdown from './components/Dropdown';

const { AccordionItem } = Accordion;

const TrebleApp = () => {
  return (
    <ThreekitProvider>
      <Player />
      <div>
        <Accordion>
          <AccordionItem label="Exterior">
            <Dropdown attribute="Exterior Material" />
            <Swatch attribute="Exterior Color" />
          </AccordionItem>
          <AccordionItem label="Interior">
            <Dropdown attribute="Interior Material" />
            <Swatch attribute="Interior Color" />
          </AccordionItem>
        </Accordion>
      </div>
    </ThreekitProvider>
  );
};
```
