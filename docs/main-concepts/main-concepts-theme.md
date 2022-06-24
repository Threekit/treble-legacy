---
slug: treble-main-concepts-theme
title: Theme
category: 6261727455090d002780b880
parentDoc:
---

> 🚧 Theme vs Custom Components
>
> The theme only allows making cosmetic changes to the native components provided by Treble. For more control of components and editing their designs, its strongly recommended you use the Custom Components available in `src/components` instead.

## Overview

The Treble app comes with a default theme (more themes coming in the future), that can be easily modified for any project's needs.

Theme is a list of CSS styles that are applied throughout the Treble components as a way to create a consistent styled and branded experience for the user. These styles include elements such as the color to use when highlighting/showing the selected state of an object, to the font size, color and typography.

## Theme Object

| Property               | Description                                                                      | Type   | Default                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| **primaryColor**       | The primary accent color used for all the selection and hover states for the UI. | string | `#1890ff`                                                                                                  |
| **linkColor**          | The color to render out `<a>` tag links.                                         | string | `#1890ff`                                                                                                  |
| **successColor**       | The color used for success messaging.                                            | string | `#1890ff`                                                                                                  |
| **warningColor**       | The color used for warning messaging.                                            | string | `#faad14`                                                                                                  |
| **errorColor**         | The color used for error messaging.                                              | string | `#f5222d`                                                                                                  |
| **fontBaseSize**       | The font-size for regular text.                                                  | string | `14px`                                                                                                     |
| **headingColor**       | The color used any heading in an `<h>` tag.                                      | string | `rgba(0, 0, 0, 0.85)`                                                                                      |
| **textColor**          | The color used for regular text.                                                 | string | `rgba(0, 0, 0, 0.65)`                                                                                      |
| **textColorSecondary** | The color used for secondary text.                                               | string | `rgba(0, 0, 0, 0.45)`                                                                                      |
| **disabledColor**      | The color used for indicating an option is disabled.                             | string | `rgba(0, 0, 0, 0.25)`                                                                                      |
| **borderRadius**       | The border-radius applied to all elements with a border-radius.                  | string | `2px`                                                                                                      |
| **borderColorBase**    | The color used for all borders.                                                  | string | `#d9d9d9`                                                                                                  |
| **boxShadowBase**      | The color used for shadows on an element.                                        | string | `0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)` |
| **widgetSize**         | The diameter of widget buttons used on the Player.                               | string | `36px`                                                                                                     |
| **fontFamily**         | The font to be used across the Treble App.                                       | string | `"Open Sans", sans-serif`                                                                                  |

## Customizing the theme

To update any of the theme's values you just have to pass in the value you want to use into the theme object in the ThreekitProvider's props.

For example, if I want to change the primary color to a shade of green with the HEX value `#25c2a0`, I could do this in the following way:

```jsx
import React from 'react';
import { ThreekitProvider } from '@threekit-tools/treble';
import App from './app';

const theme = {
  primaryColor: '#25c2a0',
};

ReactDOM.render(
  <ThreekitProvider theme={theme}>
    <App />
  </ThreekitProvider>,
  document.getElementById('root')
);
```

## Code Examples

The default values for the theme are:

```js
const theme = {
  primaryColor: '#1890ff',
  linkColor: '#1890ff',
  successColor: '#52c41a',
  warningColor: '#faad14',
  errorColor: '#f5222d',
  fontBaseSize: '14px',
  headingColor: 'rgba(0, 0, 0, 0.85)',
  textColor: 'rgba(0, 0, 0, 0.65)',
  textColorSecondary: 'rgba(0, 0, 0, 0.45)',
  disabledColor: 'rgba(0, 0, 0, 0.25)',
  borderRadius: '2px',
  borderColorBase: '#d9d9d9',
  boxShadowBase:
    '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
  widgetSize: '36px',
  fontFamily: '"Open Sans", sans-serif',
};
```
