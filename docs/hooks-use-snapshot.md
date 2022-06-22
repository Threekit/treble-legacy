---
slug: hooks-use-snapshot
title: Use Snapshot
category: 6261727455090d002780b880
parentDoc: 62b381c6f82af7001342ffec
---

# Use Snapshot

```jsx
const takeSnapshot = useSnapshot();
```

## Overview

The `useSnapshot` should provides functionality to takeSnapshots of the view in the Threekit Player.

## Code Examples

```jsx
import { useSnapshot } from '@threekit-tools/treble';

const SnapshotComponent = () => {
  const takeSnapshots = useSnapshot();

  const handleClickSnapshot = () => {
    takeSnapshots(undefined, { output: 'download' });
  };

  return (
    <button type="button" onClick={() => handleClickSnapshot()}>
      Download Snapshot
    </button>
  );
};
```
