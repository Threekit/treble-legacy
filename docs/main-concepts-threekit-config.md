---
slug: main-concepts-threekit-config
title: Threekit Config
category: 6261727455090d002780b880
parentDoc: 62b381c69f5d810068dc9e96
---

# Threekit Config

## Overview

The `threekit.config.js` file, located in the project's root directory, is where we add the Threekit credentials and product data required for the project.

The file includes:

- `credentials` - The various Threekit Platform environment specific credentials
- `products` - The

## Threekit Config Object

### Credentials

The credentials include all the parameters and authentication tokens that are specific to a Threekit environment, such as `preview` or `admin-fts`.

| Property        | Description                                                                                                                                                                                                                                 | Type             | Default |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------- |
| **publicToken** | The public auth token created in the settings tab of your Threekit Platform Org on the relevant Threekit Environment. It should include the `localhost` domain for local development and any domain to include for deployment / production. | `string (uuid4)` | `-`     |
| **orgId**       | The Threekit Org ID                                                                                                                                                                                                                         | `string (uuid4)` | `-`     |

### Products

The products object defines the default product, from your Threekit Platform catalog, to be used by the Treble App. A default product needs to be provided for each environment, i.e `preview` and `admin-fts`.

:::info Working with multiple products

While populating the products object is still recommended, if you are using the multi-product workflow you will be passing in each product's ids directly to the `<ProductLayout>` component and do not need to provide them in this products object.

:::

| Property    | Description                                                      | Type             | Default |
| ----------- | ---------------------------------------------------------------- | ---------------- | ------- |
| **assetId** | The assetId for the product you wish to use.                     | `string (uuid4)` | `-`     |
| **stageId** | (optional) The stage Id to use when initializing the product. ID | `string (uuid4)` | `-`     |

## Sample Code

A sample of a full `threekit.config.js`

```js
export default {
  credentials: {
    preview: {
      orgId: '<ORG ID>',
      publicToken: '<PUBLIC TOKEN>',
    },
    'admin-fts': {
      orgId: '<ORG ID>',
      publicToken: '<PUBLIC TOKEN>',
    },
  },
  products: {
    preview: {
      assetId: '<ASSET ID>',
      stageId: '<STAGE ID>',
    },
    'admin-fts': {
      assetId: '<ASSET ID>',
      stageId: '<STAGE ID>',
    },
  },
};
```
