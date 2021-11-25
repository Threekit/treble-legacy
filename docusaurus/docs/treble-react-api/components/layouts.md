---
custom_edit_url:
---

# Layouts

Layouts are design organization components that we can use to introduce structure and visual hierarchy to our configurator and application. Most Layout components have no inherent connection to the Threekit API and can be used freely outside of the ThreekitProvider if needed.

## Modal

A Modal is used to present an actionable pop-up to the user.

```jsx
import { useState } from "react";
import { Modal } from "@threekit-tools/treble";

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

## Drawer

A Drawer can be used to present an actionable slide-out drawer to the user.

```jsx
import { useState } from "react";
import { Drawer } from "@threekit-tools/treble";

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
