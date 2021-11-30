---
id: treble-react-hooks
title: Hooks
sidebar_label: Hooks
---

# Hooks

## Use Attribute

The `useAttribute` hook allows us to connect a component to an Attribute in our product's configurator.

It takes the name of the attribute that you want to interact with and returns an array where the first element is the data for that attribute, as returned by the `getDisplayAttributes()` function, and the second element is a function that can be used to update the value of that attribute, by prepping and passing the value on to `setConfiguration()`.

```jsx
import { useAttribute } from '@threekit-tools/treble';

const AttributeComponent = () => {
  const [attribute, setAttribute] = useAttribute('Attribute Name');

  const selected = attribute.value;

  return (
    <div>
      <div>{attribute.label}</div>
      <div>
        {attribute.values.map((option, i) => (
          <div key={i} onClick={setAttribute(option.assetId)}>
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};
```

## Use Configurator

The `useConfigurator` hook allows us to connect to all our attributes in the initialized item's configurator.

The hook returns an array of two items. The first item is almost identical to the value returned by `getDisplayAttributes()`. The second item is a change handler function that passes the value passed in straight through to `setConfiguration()`.

```jsx
import { useConfigurator } from '@threekit-tools/treble';

const AttributeComponent = () => {
  const [attributes, setConfiguration] = useConfigurator();
  return <div>Attributes Component example</div>;
};
```

## Use Threekit Init Status

The `useThreekitInitStatus` hook returns a single boolean value indicating if the Threekit API has initialized or not.

The hook will initially return `false`. Once the Threekit API has loaded it will continue to return `true`.

The Threekit Configurator, and by extension the product form, will load with the initialization of the Threekit API as the data is made available after the API loads. As such, we use this hook internally to determine if the Threekit API is ready and we should render our components or instead render some loading indicator.

```jsx
import { useThreekitInitStatus } from '@threekit-tools/treble';

const Component = () => {
  const hasLoaded = useThreekitInitStatus();
  return (
    <div>
      {hasLoaded ? 'Threekit API has loaded' : 'Loading in progress...'}
    </div>
  );
};
```

## Use Player Loading Status

The `usePlayerLoadingStatus` hook returns a single boolean value indicating whether the Threekit Player has rendered out a product configuration or is in the process of applying and rendering a change/new product configuration.

The hook will return `true` if the Player has finished its render and `false` when the configuration is changed until that change has been rendered and visualized by the Player.

On more projects with large/high fidelity visual assets, there can be a slight time lag between the user making a selection and the assets for that selection being requested and rendered by the player. During this time lag, before the visuals have updated, the user can assume that their action did not go through and that nothing is happening. We can design around this by tracking when the Player is 'loading' a new configuration, as with this hook, and render a loading icon over the form-component used to change the configuration, until the load is complete. It enabled us to provide the user some feedback that their action is being handled.

```jsx
import { usePlayerLoadingStatus } from '@threekit-tools/treble';

const Component = () => {
  const hasLoaded = usePlayerLoadingStatus();
  return (
    <div>
      {hasLoaded
        ? 'Threekit Player has rendering'
        : 'Player rendering in progress...'}
    </div>
  );
};
```

## Use Metadata

The `useMetadata` hook provides the metadata present on the item used to initialize the player.

The hook returns an object with the metadata.

It is used to build the [Description Display component](#description)

```jsx
import { useMetadata } from '@threekit-tools/treble';

const MetadataComponent = () => {
  const metadata = useMetadata();
  return (
    <div>
      {Object.entries(metadata).map(([key, value], i) => (
        <div>
          {key}: {value}
        </div>
      ))}
    </div>
  );
};
```

## Use Name

The `useName` hook provides the name of the Product used to initialize the Threekit API.

The hook a single `string` value.

It is used to build the [Title Display component](#title)

```jsx
import { useName } from '@threekit-tools/treble';

const TitleComponent = () => {
  const name = useName();
  return <div>{name}</div>;
};
```

## Use Price

The `usePrice` hook provides the total price of the current configuration calculated based on the pricing set on the Threekit Platform.

```jsx
import { usePrice } from '@threekit-tools/treble';

const PriceComponent = () => {
  const price = usePrice();
  return <div>${price}</div>;
};
```

## Use Snapshot

The `useSnapshot` should provides functionality to takeSnapshots of the view in the Threekit Player.

```jsx
import { useSnapshot } from '@threekit-tools/treble';

const SnapshotComponent = () => {
  const takeSnapshots = useSnapshot();

  const handleClickSnapshot = () => {
    takeSnapshots(undefined, { output: 'download' });
  };

  return (
    <button onClick={() => handleClickSnapshot()}>Download Snapshot</button>
  );
};
```

## Use Zoom

The `useZoom` hook provides functionality to control the zoom property in the Threekit Player.

The hook returns an array of 2 functions: zoom-in and zoom-out. Both functions accept a single argument: the zoom increment step.

The default increment value is `1`.

It is used to build the [Zoom Widget](#zoom).

```jsx
import { useZoom } from '@threekit-tools/treble';

const ZoomComponent = () => {
  const [zoomIn, zoomOut] = useZoom();
  return (
    <div>
      // Changes zoom by +1
      <button onClick={zoomIn}>Zoom In</button>
      // Changes zoom -3
      <button onClick={() => zoomOut(3)}>Zoom Out</button>
    </div>
  );
};
```
