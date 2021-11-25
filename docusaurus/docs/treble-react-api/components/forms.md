---
custom_edit_url:
---

# Forms

Forms can be used to render out complete configurators as a single component.

## Flat Form

The `<FlatForm>` component is used to render out the configurator for the initialized asset.

```jsx
import { ThreekitProvider, FlatForm } from "@threekit-tools/treble";
import threekitConfig from "./threekit.config.js";

const App = () => {
  return (
    <ThreekitProvider config={threekitConfig}>
      <FlatForm />
    </ThreekitProvider>
  );
};
```

### Flat Form Props

```js
const flatFormProps = {
  //  Override title for the form
  title: "Form Title",
  //  Override the description for the form
  description: "This is a description for the form",
  //  Alignment for the title. Options include left | center | right
  alignTitle: "center",
  //  Whether to include reserved Attributes.
  //  i.e. _camera (Camera Attribute)
  includeReservedAttributes: false,
  //  The Attributes object allows us to define component selections
  //  and props for the individual Attributes
  attributes: {
    //  This will render out 'Attribute 1' using the Buttons component
    "Attribute 1": { component: "swatch" },
    //  This will prevent 'Attribute 2' from being rendered.
    "Attribute 2": undefined,
  },
};
```

The `Flat Form` can take a prop of **`attributes`** that allow us to specify, which component to use for an attribute or if we want to hide any attributes.

By default, the **`title`** and **`description`** will be sourced from the initialized item, however, we can also explicitly pass in values for these props.

We can also specify the horizontal alignment for the title by passing in one of
`left`, `right` and `center` to the **`alignTitle`** prop.

By default the Form will not render reserved attributes. This can be controlled/over-written by using the prop **`includeReservedAttributes={false}`**.

```jsx
import { ThreekitProvider, FlatForm } from "@threekit-tools/treble";
import threekitConfig from "./threekit.config.js";

const App = () => {
  const attributes = {
    //  This will render out 'Attribute 1' using the Buttons component
    "Attribute 1": { component: "swatch" },
    //  This will prevent 'Attribute 2' from being rendered.
    "Attribute 2": undefined,
  };

  return (
    <ThreekitProvider config={threekitConfig}>
      <FlatForm attributes={attributes} />
    </ThreekitProvider>
  );
};
```
