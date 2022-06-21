---
id: hooks-use-wishlist
title: Use Wishlist
sidebar_label: useWishlist
---

# Use Wishlist

```jsx
const [
  wishlist,
  handleAddToWishlist,
  handleRemoveFromWishlist,
  handleResumeItem,
  handleShareItem,
  handleClearWishlist,
] = useWishlist();
```

## Overview

The `useWishlist` hook provides all the functionality we need to build a UI for a wishlist.

The hook return an array with the following elements, in order:

#### wishlist

An array of items in the user's wishlist. The wishlist array is stored in the browser's local storage.

#### handleAddToWishlist

A function to add a new item to the wishlist. This function will internally get, both, current configuration and a snapshot of the configuration for the new wishlist item. It also optionally takes SaveConfiguration object.

#### handleRemoveFromWishlist

A function to remove an item from the wishlist. The function requires a single argument - the wishlist array index of the item to be deleted.

#### handleResumeItem

A function to resume a wishlist item's configuration. This will over-write any current product/configuration that the user is working on. The function requires a single argument - the wishlist array index of the item to be resumed.

#### handleShareItem

A function that will copy-to-clipboard a resume link to a wishlist item. The function requires a single argument - the wishlist array index of the item to be shared.

#### handleClearWishlist

A function that will copy-to-clipboard a resume link to a wishlist item. The function requires a single argument - the wishlist array index of the item to be shared.

## Code Examples

```jsx
import { useWishlist } from '@threekit-tools/treble';
```
