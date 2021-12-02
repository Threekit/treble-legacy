---
id: hooks-use-snapshot
title: Use Snapshot
sidebar_label: useSnapshot
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
    <button onClick={() => handleClickSnapshot()}>Download Snapshot</button>
  );
};
```
