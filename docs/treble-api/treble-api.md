---
slug: treble-api-js
title: The Threekit Treble JS API
sidebar_label: Treble JS API
---

# The Threekit Treble JS API

**`window.threekit.treble`**

## Treble

### saveConfiguration()

```js
await window.threekit.treble.saveConfiguration(config);
```

The `saveConfiguration` function is used to save the user's current product configuration state to the Threekit Platform's configuration service and return a single string ID as a way to reference. This ID can be used to retrieve the saved-configuration at a later time, including any additional data associated with the saved configuration.

#### arg: config (OPTIONAL)

```js
const config = {
    //  Customer ID
    customerId?: string;
    //  Any arbitrary JSON data to associate with a
    //  saved configuration
    metadata?: Record<string, any>;
    //  Any information about product versioning
    productVersion?: string;
    //  Any file attachments to save/associate with the saved
    //  configuration
    attachments?: Record<string, File>;
    //  Whether to include spatial data in the saved configuration
    saveSceneGraphState?: boolean
}
```
