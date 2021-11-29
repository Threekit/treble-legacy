---
custom_edit_url:
---

# Displays

Display components can be used to display specific information anywhere in the UI.

## Product Title

The `<ProductTitle />` component will display the value of the metadata key `_title` on the Catalog Item used to initialize the Player.

The title can also be overwritten by passing in your own title in as a prop.

```jsx
import { ProductTitle } from '@threekit-tools/treble';

const Component = () => {
  return (
    <div>
      <ProductTitle />
      // With a custom title
      <ProductTitle title="Custom Title" />
    </div>
  );
};
```

## Product Description

The `<ProductDescription />` component will display the value of the metadata key `_description` on the Catalog Item used to initialize the Player.

The description can also be overwritten by passing in your own description in as a prop.

It is built using the [useMetadata() hook](#use-metadata).

```jsx
import { Description } from '@threekit-tools/treble';

const Component = () => {
  return (
    <div>
      <ProductDescription />
      // With a custom description
      <ProductDescription description="This is a custom description." />
    </div>
  );
};
```

## Attribute Title

The `<AttributeTitle>` will display the translated attribute name of an attribute.

It is built using the [useName() hook](#use-name).

```jsx
import { AttributeTitle } from '@threekit-tools/treble';

const Component = () => {
  return (
    <div>
      <AttributeTitle attribute="Attribute Name" />
    </div>
  );
};
```

## Attribute Value

The `<AttributeValue>` will display the translated selected value of an attribute.

```jsx
import { AttributeValue } from '@threekit-tools/treble';

const Component = () => {
  return (
    <div>
      <AttributeValue attribute="Attribute Name">
    </div>
  );
};
```

## Total Price

The `<Price>` component will display the total price of your configuration. It is calculated using the first Pricebook in the Org, and the first currency in that Pricebook.

It is built using the [usePrice() hook](#use-price).

**Support for multiple Pricebooks and Currencies coming soon**

```jsx
import { TotalPrice } from '@threekit-tools/treble';

const Component = () => {
  return (
    <div>
      <TotalPrice />
    </div>
  );
};
```
