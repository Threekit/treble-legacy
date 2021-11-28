---
sidebar_label: Configurator JS API
sidebar_position: 2
custom_edit_url:
---

# The Threekit Configurator JS API

**`window.threekit.configurator`**

## setConfiguration()

```js
window.threekit.configurator.setConfiguration(configuration);
```

The `setConfiguration` method can be used to update the configurator and with it the visuals in the Threekit Player.

The configuration is modified by individually updating the value or one or more `attributes` in the configuration by passing in a new value. The data-type for the value passed into an attribute is determined by the attribute type as defined in the configurator on the Threekit Platform.

```js
const updatedConfig = {
  //  For attribute types: String | Number | Color
  //  we can pass in the value we wish set set
  //  directly into the configuration object
  "User Name": "John Doe",
  //  For attribute type: Part Reference (Asset)
  //  we need to set the value to an object which
  //  includes the assetId of the catalog item
  //  we want to update the attribute's value to be
  "Car Seat Material": {
    assetId: "cdd124c9-4997-b5ce-3f20-c98127328eca",
  },
};

window.threekit.configurator.setConfiguration(updatedConfig);
```

To get the current attributes, their types and their options, checkout the [getAttributes](#getattributes) or [getDisplayAttributes](#getdisplayattributes) methods.

## getConfiguration()

```js
window.threekit.configurator.getConfiguration();
```

The `getConfiguration` method returns the current configuration state of the product.

## getAttributes()

```js
window.threekit.configurator.getAttributes();
```

## getDisplayAttributes()

```js
window.threekit.configurator.getDisplayAttributes(settings);
```
