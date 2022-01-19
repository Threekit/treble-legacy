---
id: how-to-sort-options
title: Sorting an Attribute's Options
sidebar_label: Sorting an Attribute's Options
---

# Sorting an Attribute's Options

## Overview

For Attributes that include a set of options, we may want to change the order in which these options are presented to the user. We can specify the order of our options in 2 ways:

- **Alphabetically** by sorting in ascending or descending order based on their name, or
- **Custom order** by sorting them based on a custom order we specify.

## How To

Regardless of how we want the options ordered we'll use javascript's native Array.sort() method.

```js
sort();
```

We'll provide the sort method with a different sorting function depending on how we want our options ordered.

### Ascending

Sort function for implementing an **ascending** order.

```js
sort((a, b) => (a.label < b.label ? -1 : 1));
```

### Descending

Sort function for implementing an **descending** order.

```js
sort((a, b) => (a.label > b.label ? -1 : 1));
```

### Custom Order

:::caution Requires options metadata
The custom order is implemented by associating the position of each option in the list, as metadata on that option. As such it can only be implemented on **Asset / Part-Reference type Attributes**.
:::

For a custom order we first have to specify the order we want our options to have on the Threekit Platform before we setup our sorting function in our Treble app.

On the Threekit Platform, each option for the Asset/Part-Reference type Attribute will have its own Catalog Item. In each of these option's Catalog Item we will add a **metadata** parameter with the key `order` and it's value as a `number` representing that option's position in the list.

:::info Metadata order key
The order parameter you set in the metadata of a Catalog Item can have any key you want and does not need to strictly be `order`. Since the sorting function is being implemented in Treble you simply have to name match the metadata key you decide to use on the Threekit Platform with your sort function in your Treble app.
:::

For example, if my options are `Red, Green and Blue` and in each of their respective Catalog Items I add in the `order` metadata such that `Red -> 2`, `Green -> 1` and `Blue -> 3`, then the list of options will be ordered as: `Green, Red and Blue`.

Once we added all the data on the Threekit Platform side, we can implement our sort function accordingly.

```js
sort((a, b) => (a.metadata.order < b.metadata.order ? -1 : 1));
```

## Code Example

```jsx {11-12}
import { useAttribute } from '@threekit-tools/treble';

export default function ColorSwatch(props) {
  const [attribute, setAttribute] = useAttribute(props.attribute);
  if (!attribute) return <></>;
  return (
    <div>
      <h3 className="text-xl mb-4">{attribute?.label}</h3>
      <div className="flex flex-row flex-wrap content-start">
        {attribute?.values
          // Sort function - Ascending order
          .sort((a, b) => (a.label < b.label ? -1 : 1))
          .map((item, i) => (
            <button
              key={i}
              className={`group rounded-full bg-white h-14 w-14 p-1 mb-1 mr-1 border border-solid hover:border-blue-500 ${
                attribute.value.assetId === item.assetId
                  ? 'border-blue-500'
                  : 'border-gray-100'
              }`}
            >
              <div
                className="rounded-full h-full w-full cursor-pointer"
                style={{ backgroundColor: item.metadata._thumbnail }}
                onClick={() => setAttribute(item.assetId)}
              >
                <span />
              </div>
              <div className="trbl-tooltip hidden group-hover:block">
                <div className="max-w-5xl rounded-sm py-2 px-3 bg-black bg-opacity-60 overflow-hidden">
                  <div className="text-white">{item.label}</div>
                </div>
                <div className="trbl-tooltip-triangle">
                  <div />
                </div>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
}
```
