---
id: forms-flat-form
title: Flat Form
sidebar_label: Flat Form
---

# Flat Form

```jsx
<FlatForm />
```

## Overview

The `<FlatForm>` component is used to render out the configurator for the initialized asset.

The `Flat Form` can take a prop of `attributes` that allow us to specify, which component to use for an attribute or if we want to hide any attributes.

By default, the `title` and `description` will be sourced from the initialized item, however, we can also explicitly pass in values for these props.

We can also specify the horizontal alignment for the title by passing in one of
`left`, `right` and `center` to the `alignTitle` prop.

By default the Form will not render reserved attributes. This can be controlled/over-written by using the prop `includeReservedAttributes={false}`.

## Code Examples

#### Basic Setup

Using the `FlatForm` without any props will render out the Product configurator as it appears on the platform. The FlatForm will use the default Form Component for each attribute type.

```jsx
import { ThreekitProvider, FlatForm } from '@threekit-tools/treble';
import threekitConfig from './threekit.config.js';

const App = () => {
  return (
    <ThreekitProvider {...threekitConfig}>
      <FlatForm />
    </ThreekitProvider>
  );
};
```

#### Specifying attribute definitions

In most situations we will want to specify which Form Component each attribute should use, as well as pass additional definitions to those Form Components. We can do this through the `attributes` prop, which accepts an `AttributesObject` as defined in the props section of this page.

```jsx
import { ThreekitProvider, FlatForm } from '@threekit-tools/treble';
import threekitConfig from './threekit.config.js';

const App = () => {
  const attributes = {
    //  This will render out 'Attribute 1' using the Buttons component
    'Attribute 1': { component: 'swatch' },
    //  This will prevent 'Attribute 2' from being rendered.
    'Attribute 2': undefined,
  };

  return (
    <ThreekitProvider {...threekitConfig}>
      <FlatForm attributes={attributes} />
    </ThreekitProvider>
  );
};
```

#### FlatForm Props Example

```jsx
import { ThreekitProvider, FlatForm } from '@threekit-tools/treble';
import threekitConfig from './threekit.config.js';

const flatFormProps = {
  //  Override title for the form
  title: 'Form Title',
  //  Override the description for the form
  description: 'This is a description for the form',
  //  Alignment for the title. Options include left | center | right
  alignTitle: 'center',
  //  Whether to include reserved Attributes.
  //  i.e. _camera (Camera Attribute)
  includeReservedAttributes: false,
  //  The Attributes object allows us to define component selections
  //  and props for the individual Attributes
  attributes: {
    //  This will render out 'Attribute 1' using the Buttons component
    'Attribute 1': { component: 'swatch' },
    //  This will prevent 'Attribute 2' from being rendered.
    'Attribute 2': undefined,
  },
};

const App = () => {
  return (
    <ThreekitProvider {...threekitConfig}>
      <FlatForm {...flatFormProps} />
    </ThreekitProvider>
  );
};
```

## Props

| Type                          | Description                                                               | Type                                                  | Default                                |
| ----------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------- |
| **title**                     | Override value for the 'Form Title'.                                      | string                                                | Name of the initialized product        |
| **description**               | Override value for the 'Form Description'.                                | string                                                | Description of the initialized product |
| **alignTitle**                | CSS alignment of the text for the 'Form Title'                            | `left` \| `right` \| `center`                         | `center`                               |
| **includeReservedAttributes** | Determines whether to display the reserved attributes in the form or not. | `true` \| `false`                                     | `false`                                |
| **attributes**                | Object of attributes definitions for the form.                            | `Record<AttributeName, AttributeObject \| undefined>` | `{}`                                   |
| **className**                 | A className to the widget container.                                      | string                                                | `''`                                   |

#### AttributeObject

| Type          | Description                  | Type   | Default |
| ------------- | ---------------------------- | ------ | ------- |
| **component** | Name of the component to use | string | `-`     |
