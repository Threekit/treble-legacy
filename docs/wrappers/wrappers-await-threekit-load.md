---
slug: treble-wrappers-await-threekit-load
title: Await Threekit Load
category: 6261727455090d002780b880
parentDoc: 62b4ff1dc81d6c01021abc38
---

```jsx
<AwaitThreekitLoad />
```

## Overview

The `<AwaitThreekitLoad>` wrapper, is used to wrap any content that we don't want to render until the Threekit Player initialization process is complete.

## Code Examples

```jsx
import { AwaitThreekitLoad } from '@threekit-tools/treble';

const Component = () => {
  return (
    <div>
      <div>Content here will be rendered as normal</div>
      <AwaitThreekitLoad>
        This content will only be rendered after the Threekit Player
        initialization is complete
      </AwaitThreekitLoad>
    </div>
  );
};
```
