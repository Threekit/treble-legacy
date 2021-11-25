---
sidebar_label: Building Components
custom_edit_url:
---

# Building Custom Form Components

## Overview

In this tutorial we will build a Custom Form Component to control one of the Asset Type Attributes in our Product's Configurator.

In our custom component, we will be using the useAttribute() hook to connect to the Threekit Configurator API. The Threekit API will be responsible for providing us with all data, the change handler to manage a user selection, and will trigger re-renders of our component whenever the Attribute changes.

Lets get started...

## Guide

### Step 1 - Component Boilerplate

We'll start with a simple <Buttons /> component that will render out a title, subtitle, and a set of options for the user to select from. For now we'll start with some static data for our boilerplate.

```jsx
import React from "react";

const Buttons = (props) => {
  return (
    <div>
      <div>Title</div>
      <div>Subtitle</div>
      <div>
        {["option 1", "option 2"].map((option, i) => (
          <button key={i}>{option}</button>
        ))}
      </div>
    </div>
  );
};
```

### Step 2 - Implementing the useAttribute Hook

Once we have our basic component, we can import the useAttribute() hook.

We can provide the Use Attribute hook with the name of an attribute and it will give us back an array with theattribute data as the first element and an **setAttribute change handler** as the second element. E.g.
const [attribute, setAttribute] = useAttribute('Attribute Name')

Here, we'll use the attribute data to get the options for our <Button /> component, and pass on the assetId of the option the user selects to out change handler function.

```jsx
import React from "react";
import { useAttribute } from "@threekit-tools/treble";

const Buttons = (props) => {
  // We'll use the useAttribute hook to connect to our
  // desired attribute
  const [attribute, setAttribute] = useAttribute("AttributeName");

  // We'll hide our attribute until the data for that
  // attribute loads
  if (!attribute) return null;

  return (
    <div>
      <div>Title</div>
      <div>Subtitle</div>
      <div>
        {attribute.values.map((option, i) => {
          // We'll source our options from the attributes data
          // presenting the 'label' to the user and passing the
          // 'assetId' to the setAttribute change handler on
          // user select
          return (
            <button key={i} onClick={() => setAttribute(option.assetId)}>
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
```

### Step 3 - Generalizing the Component for use with Multiple Attributes

Instead of hard coding the attribute to be used for this component, we can expect
the attribute name to be passed into our <Buttons /> component as a prop. This
allows us to use the same component for multiple attributes across our project.

```jsx
import React from "react";
import { useAttribute } from "@threekit-tools/treble";

const Buttons = (props) => {
  //  Instead of hard coding the attribute to use
  //  we get switch it to come from a prop
  const [attribute, setAttribute] = useAttribute(props.attribute);

  if (!attribute) return null;

  return (
    <div>
      <div>Title</div>
      <div>Subtitle</div>
      <div>
        {attribute.values.map((option, i) => {
          return (
            <button key={i} onClick={() => setAttribute(option.assetId)}>
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
```

### Step 4 - Advanced Styling with Styled Components

In this step we will be adding custom styles to our component, including a selected state to show which of our options is currently selected. To do this we will be using the Styled Components library.

```jsx
import React from "react";
import { useAttribute } from "@threekit-tools/treble";
//  We import in our styled components library
import styled from "styled-components";

//  We create our own custom button styles
const ButtonWrapper = styled.button`
  height: 20px;
  background: ${(props) => (props.selected ? "blue" : "lightgrey")};
`;

const Buttons = (props) => {
  //  Instead of hard coding the attribute to use
  //  we get switch it to come from a prop
  const [attribute, setAttribute] = useAttribute(props.attribute);

  if (!attribute) return null;

  return (
    <div>
      <div>Title</div>
      <div>Subtitle</div>
      <div>
        {attribute.values.map((option, i) => {
          // We swap out 'button' for our 'ButtonWrapper' styled
          // component. And we introduce a prop to track whether
          // and option is selected.
          return (
            <ButtonWrapper
              key={i}
              selected={option.assetId === attribute.value}
              onClick={() => setAttribute(option.assetId)}
            >
              {option.label}
            </ButtonWrapper>
          );
        })}
      </div>
    </div>
  );
};
```
