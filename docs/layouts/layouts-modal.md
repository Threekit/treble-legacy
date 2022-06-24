---
slug: treble-layouts-modal
title: Modal
category: 6261727455090d002780b880
parentDoc:
---

```jsx
<Modal />
```

## Overview

A `<Modal />` is used to present an actionable pop-up to the user.

Modals are great when we require the user to interact with a UI feature, but we don't want that feature to occupy space on out page by default. You can use the Modal to create a centered floating layer that pops up over the current page to get user feedback or display information.

The Modal does not track its own state of whether to show or hide itself.

## Code example

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

## Props

| Type            | Description                                                                                          | Type     | Default |
| --------------- | ---------------------------------------------------------------------------------------------------- | -------- | ------- |
| **title**       | The title to give to the Modal.                                                                      | string   | `''`    |
| **showHeader**  | Sets whether to show or hide the Modal's header. The header includes both the title and close button | boolean  | `true`  |
| **show**        | Set the value of whether to show or hide the Modal.                                                  | boolean  | `false` |
| **handleClose** | A callback function to execute when the use clicks the Modals inbuilt close button.                  | function | `-`     |
| **className**   | A className to the display container.                                                                | string   | `''`    |
