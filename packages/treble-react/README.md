# Treble React

**All you need to build a Web Experience for your Threekit Configurator.**

The **Treble Design System** is a feature-rich React library of components, hooks, and added functionality needed to build an intuitive and engaging web experience for a Threekit Configurator.

We have everything you need to get started!

**Useful Links**

- **[Threekit Docs](https://community.threekit.com/)**
- **[Threekit Website](https://www.threekit.com/)**
- **[Threekit Platform - Preview Environment](https://preview.threekit.com/)**
- **[Threekit Platform - Admin-FTS Environment](https://admin-fts.threekit.com/)**

## Table of Contents

- [Treble React](#treble-react)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Quick Start](#quick-start)
  - [Components](#components)
    - [Threekit Provider](#threekit-provider)
    - [Player](#player)
    - [Forms](#forms)
      - [Flat Form](#flat-form)
    - [Widgets](#widgets)
      - [Snapshots](#snapshots)
      - [Zoom](#zoom)
    - [Displays](#displays)
      - [Product Title](#product-title)
      - [Product Description](#product-description)
      - [Attribute Title](#attribute-title)
      - [Attribute Value](#attribute-value)
      - [Total Price](#total-price)
    - [Wrappers](#wrappers)
      - [Await Threekit Load](#await-threekit-load)
      - [Portal to Element](#portal-to-element)
    - [Layouts](#layouts)
      - [Modal](#modal)
      - [Drawer](#drawer)
    - [Hooks](#hooks)
      - [Use Attribute](#use-attribute)
      - [Use Configurator](#use-configurator)
      - [Use Threekit Init Status](#use-threekit-init-status)
      - [Use Player Loading Status](#use-player-loading-status)
      - [Use Metadata](#use-metadata)
      - [Use Name](#use-name)
      - [Use Price](#use-price)
      - [Use Snapshot](#use-snapshot)
      - [Use Zoom](#use-zoom)

## Getting Started

### Installation

Run the following command using npm:

`npm install @threekit-tools/treble`

Or yarn:

`yarn add @threekit-tools/treble`

### Quick Start

A basic app will include the **Threekit Provider**, to connect our components to the Threekit API, A **Player Component**, to render our 3D visuals, and a **Form** to let the user configure the visualized product.

To get started you can copy the code from below, populating the values in the `threekitConfig` object.

```js
import { ThreekitProvider, Player, FlatForm } from '@threekit-tools/treble';

const threekitConfig = {
  preview: {
    orgId: '',
    assetId: '',
    publicToken: '',
  },
};

const threekitEnv = 'preview';

const ThreekitApp = () => {
  return (
    <ThreekitProvider config={threekitConfig} threekitEnv={threekitEnv}>
      <div
        style={{
          height: '100vh',
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'auto 400px',
          gridGap: '12px',
        }}
      >
        <Player />
        <FlatForm />
      </div>
    </ThreekitProvider>
  );
};
```

## Components

### Threekit Provider

The `<ThreekitProvider />` initializes the Threekit API used by the various components in the Treble library. It should be wrapped around the portion of the React app where the Treble components and hooks are being used.

The Threekit Provider requires the a config object, which includes all the credentials related a the project.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

import { ThreekitProvider } from '@threekit-tools/treble';
import App from './App';

const config = {
  //  The environment specific credentials should be placed
  //  in an object assigned to the name of the environment
  //  Note: The token key is 'publicToken' not 'authToken'
  preview: {
    publicToken: '3fb4asd5d-ea38-4a05-a2g3-6cf9d8dd3d48',
    assetId: 'a9a66218-bkid-4106-96fe-a0359fdc3dc1',
    orgId: '20df501b-1ef8-4bh0-sfda-2l59426624de',
  },
  'admin-fts': {
    publicToken: '3fb4asd5d-ea38-0g05-a1c3-6cf9d8dd3d48',
    assetId: 'a9a66218-bkid-2206-96fe-a0709fdc3dc1',
    orgId: '20df501b-1ef8-4bkm-sfda-2b99426624de',
  },
  //  Any additional parameters to pass to the player initialization
  //  can also be added here. For example setting the showShare
  //  property
  showShare: true,
  // We can pass overwrites to the default theme
  theme: { primaryColor: '#54AA54' },
};

const threekitEnv = 'preview';

ReactDOM.render(
  <ThreekitProvider config={config} threekitEnv={threekitEnv}>
    <App /> // All Threekit related code goes here
  </ThreekitProvider>,
  document.getElementById('root')
);
```

**Threekit Provider Props**

The Threekit Provider takes two props:

The `threekitEnv` sets which Threekit environment, `preview | admin-fts`, to use when running the app. It defaults to the **preview** environment.

```js
const threekitEnv = 'admin-fts';
```

A `config` object including the **Threekit environment credentials**, the **Player API initialization parameters** and any **theme** overrides.

The Threekit environment credentials include all variables that are specific to the Threekit Environment you are using. These include:

```js
const threekitEnvironmentCredentials = {
  //  The public auth token created in the settings
  //  tab in your org on the Threekit Platform. It should
  //  include the `localhost` domain for local development
  //  and any domains to include for production / deployment
  publicToken: '',
  //  The Org Id for the Threekit Org
  orgId: '',
  //  The asset id of the Catalog Item you wish to initialize
  //  in the Threekit Player
  assetId: '',
  //  (optional): The Asset Id of the Stage you wish to initialize in the
  //  Threekit Player
  stageId: '',
};
```

The **Player API initialization parameters** should be added directly to the `config` object. More information about parameters can be found here: [Embedding the Threekit Player](https://community.threekit.com/hc/en-us/articles/4406068353307-Embedding-the-Threekit-Player).

```js
const threekitConfig = {
  //  (optional): determines whether to use the 3D Player (webgl) or
  //  the 2D Player (image).
  display: 'webgl' | 'image',
  //  The caching options for the player. It contains the maxAge
  //  and scope for assets caching.
  cache,
  //  (optional): Determines if we render the default Threekit
  //  configurator.
  showConfigurator: true | false,
  //  (optional): An override for the configuration to initialize
  //  our asset with.
  initialConfiguration: {},
  //  (optional): parameter to display a snapshot while the player
  //  is loading. Default value is false
  showLoadingThumbnail: true | false,
  //  (optional): Determines if we show the progress bar during
  //  load. Default value is true.
  showLoadingProgress: true | false,
  //  Takes a callback as its value. The callback's only argument
  //  is a number, representing the progress ratio ( from 0.0
  //  to 1.0 ). The callback will be called whenever the loading
  //  progresses. The progress ratio is only approximate.
  onLoadingProgress: progress =>
    console.log(`Progress ${parseInt(progress * 100)}`),
  //  (optional): Parameter to show/hide the built-in AR Button.
  //  Default value is false.
  showAR,
  //  (optional): Parameter to show/hide the built-in Share
  //  Button. Default value is false.
  showShare,
  //  (optional): toggles vertical orbit on mobile devices on or
  //  off. Default value is false.
  allowMobileVerticalOrbit: true | false,
  //  (optional): Override organization's compression setting for
  //  renders in 2D player.
  compression,
};
```

The **theme** is used to style all the component available in the Treble library. You can override any of the default values by passing in your own value for a parameter into the theme object. The default values for the theme are:

```js
const theme = {
  primaryColor: '#1890ff',
  linkColor: '#1890ff',
  successColor: '#52c41a',
  warningColor: '#faad14',
  errorColor: '#f5222d',
  fontBaseSize: '14px',
  headingColor: 'rgba(0, 0, 0, 0.85)',
  textColor: 'rgba(0, 0, 0, 0.65)',
  textColorSecondary: 'rgba(0, 0, 0, 0.45)',
  disabledColor: 'rgba(0, 0, 0, 0.25)',
  borderRadius: '2px',
  borderColorBase: '#d9d9d9',
  boxShadowBase:
    '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);',
  widgetSize: '36px',
  fontFamily: '"Open Sans", sans-serif',
};
```

### Player

The `<Player />` component renders the **Threekit Player**.

```jsx
import { ThreekitProvider, Player } from '@threekit-tools/treble';
import threekitConfig from './threekit.config.js';

const ThreekitApp = () => {
  return (
    <ThreekitProvider config={threekitConfig}>
      <Player />
    </ThreekitProvider>
  );
};
```

**Player Widgets**

The Player Component also comes with **widget containers** that can be used to position widgets or any component in pre-defined locations around the player.

```jsx
import { ThreekitProvider, Player } from '@threekit-tools/treble';
import threekitConfig from './threekit.config.js';

//  We can separate out the widget container component
//  or use the component directly from the Player component
const { TopRightWidgets } = Player;

const ThreekitApp = () => {
  return (
    <ThreekitProvider config={threekitConfig}>
      <Player>
        <TopRightWidgets>
          <div>This will show up in the top-right of the player</div>
        </TopRightWidgets>

        <Player.BottomRightWidgets>
          <div>This will show up in the bottom-right of the player</div>
        </Player.BottomRightWidgets>
      </Player>
    </ThreekitProvider>
  );
};
```

### Forms

Forms can be used to render out complete configurators as a single component.

#### Flat Form

The `<FlatForm>` component is used to render out the configurator for the initialized asset.

```jsx
import { ThreekitProvider, FlatForm } from '@threekit-tools/treble';
import threekitConfig from './threekit.config.js';

const App = () => {
  return (
    <ThreekitProvider config={threekitConfig}>
      <FlatForm />
    </ThreekitProvider>
  );
};
```

**Flat Form Props**

```js
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
```

The `Flat Form` can take a prop of **`attributes`** that allow us to specify, which component to use for an attribute or if we want to hide any attributes.

By default, the **`title`** and **`description`** will be sourced from the initialized item, however, we can also explicitly pass in values for these props.

We can also specify the horizontal alignment for the title by passing in one of
`left`, `right` and `center` to the **`alignTitle`** prop.

By default the Form will not render reserved attributes. This can be controlled/over-written by using the prop **`includeReservedAttributes={false}`**.

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
    <ThreekitProvider config={threekitConfig}>
      <FlatForm attributes={attributes} />
    </ThreekitProvider>
  );
};
```

### Widgets

The **Widgets** offer a wide range of functionality and interactivity for the user to engage with including Downloadable Snapshots, Zoom Buttons, Save-to-Wishlist etc.

All the widgets are designed to be buttons that can be placed on and around the Threekit Player. Placing the Widgets on the Player component enhances their visibility for the end user, builds consistent experiences with our player and minimizes/simplifies the Threekit UI footprint when embedding into an existing page.

#### Snapshots

The `<Snapshots />` is a button that will trigger the `window.threekit.treble.takeSnapshot()` when pressed and download the specified snapshots.

```js
import { ThreekitProvider, Player, Snapshots } from '@threekit-tools/treble';

const Component = () => {
  return (
    <ThreekitProvider>
      <Player>
        <Player.TopRightWidgets>
          <Snapshots
            cameras={[undefined, 'birdsey-camera']}
            config={{ format: 'jpeg' }}
          />
        </Player.TopRightWidgets>
      </Player>
    </ThreekitProvider>
  );
};
```

The Snapshot takes two props: `camerasList` and `snapshotsConfig`.

The `camerasList` take a list of cameras to take snapshots from. It can be a single `string` or an `array of strings` depending on how many cameras are to be used for the snapshot. To take a snapshot from the user's current view, we specify that camera as undefined, both as an individual camera value or as part of the array of cameras. e.g. `const cameras = [undefined, 'snapshot-camera-alt']`

The `snapshotConfig` allows us to define the following values:

```js
const snapshotsConfig = {
  format: 'png' | 'jpeg',
  filename: 'snapshot-filename',
};
```

**Note: These cameras must be setup to the configurator using the reserved camera attribute.**

#### Zoom

The `<Zoom />` widget allows the user to control the zoom property of the Threekit Player.

The component is built using the useZoom hook. It provides a pair of + and - buttons the user can click to update the zoom.

It defaults to single increments changes but also accepts increment values to use instead.

```js
import { ThreekitProvider, Player, Zoom } from '@threekit-tools/treble';

const Component = () => {
  return (
    <ThreekitProvider>
      <Player>
        <Player.MiddleRightWidgets>
          <Zoom orientation="vertical" />
        </Player.MiddleRightWidgets>
      </Player>
    </ThreekitProvider>
  );
};
```

### Displays

Display components can be used to display specific information anywhere in the UI.

#### Product Title

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

#### Product Description

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

#### Attribute Title

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

#### Attribute Value

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

#### Total Price

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

### Wrappers

#### Await Threekit Load

The `<AwaitThreekitLoad>` wrapper, is used to wrap any content that we don't want to render until the Threekit Player initialization process is complete.

```jsx
import { AwaitThreekitLoad } from '@threekit-tools/treble';

const Component = () => {
  return (
    <div>
      <div>Content here will be rendered as normal</div>
      <AwaitThreekitLoad>
        This content will only be rendered after the Threekit Player
        intialization is complete
      </AwaitThreekitLoad>
    </div>
  );
};
```

#### Portal to Element

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

### Layouts

Layouts are design organization components that we can use to introduce structure and visual hierarchy to our configurator and application. Most Layout components have no inherent connection to the Threekit API and can be used freely outside of the ThreekitProvider if needed.

#### Modal

A Modal is used to present an actionable pop-up to the user.

```jsx
import { useState } from 'react';
import { Modal } from '@threekit-tools/treble';

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  return (
    <Modal show={showModal} handleClose={handleClose}>
      <div>
        Content to be placed in the modal is added as an HTML child element.
      </div>
    </Modal>
  );
};
```

#### Drawer

A Drawer can be used to present an actionable slide-out drawer to the user.

```jsx
import { useState } from 'react';
import { Drawer } from '@threekit-tools/treble';

const App = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const handleClose = () => setShowDrawer(false);

  return (
    <Drawer show={showDrawer} handleClose={handleClose}>
      <div>
        Content to be placed in the drawer is added as an HTML child element.
      </div>
    </Drawer>
  );
};
```

### Hooks

#### Use Attribute

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

#### Use Configurator

The `useConfigurator` hook allows us to connect to all our attributes in the initialized item's configurator.

The hook returns an array of two items. The first item is almost identical to the value returned by `getDisplayAttributes()`. The second item is a change handler function that passes the value passed in straight through to `setConfiguration()`.

```jsx
import { useConfigurator } from '@threekit-tools/treble';

const AttributeComponent = () => {
  const [attributes, setConfiguration] = useConfigurator();
  return <div>Attributes Component example</div>;
};
```

#### Use Threekit Init Status

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

#### Use Player Loading Status

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

#### Use Metadata

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

#### Use Name

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

#### Use Price

The `usePrice` hook provides the total price of the current configuration calculated based on the pricing set on the Threekit Platform.

```jsx
import { usePrice } from '@threekit-tools/treble';

const PriceComponent = () => {
  const price = usePrice();
  return <div>${price}</div>;
};
```

#### Use Snapshot

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

#### Use Zoom

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
