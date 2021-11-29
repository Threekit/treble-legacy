---
sidebar_position: 5
custom_edit_url:
---

# Hooks

## Use Attribute

The `useAttribute` hook allows us to connect a component to an Attribute in our configurator.

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

The `useName` hook provides the name of the item used to initialize the player.

The hook a single string value.

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
