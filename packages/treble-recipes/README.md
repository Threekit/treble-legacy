# Treble Recipes

**Treble Recipes are custom scripts for use on the Threekit Platform's Assets and Catalog Items**

## Table of Contents

- [Treble Recipes](#treble-recipes)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Animations Recipes](#animations-recipes)
    - [Turntable](#turntable)
    - [Wobble](#wobble)

## Getting Started

To add Treble Recipes to a Configurator, you simply need to create a rule with no condition, and add in the following code snippet:

```js
return new Promise(resolve => {
  const url = 'https://threekit-recipes.3kit.com';

  fetch(url, {
    mode: 'cors',
    headers: { 'Access-Control-Allow-Origin': '*' },
  })
    .then(response => response.text())
    .then(script => eval(script))
    .then(() => {
      console.log('recipes loaded...');
      resolve();
    });
});
```

This loads up the recipes to be used as custom scripts in across as many rules in the configurator as you'd like.

For example to use the `test` recipe in the catalog Recipes set just add the following line into your Catalog Item's custom script.

```js
window.threekitRecipes.test();
```

## Animations Recipes

### Turntable

**[Click Here for a Demo](https://threekit-recipes-7be9a957e40c171a.porter.run/demos/turntable.html)**

The `Turntable` animation emulates the product placed on a turntable by adding a slow and continuous rotation to a specified node in the 3D hierarchy.

You can customize the turntable animation in the following ways:

- Specify the node to rotate
- Direction of rotation - 'clockwise' vs 'anti-clockwise'
- Speed - Rotations per minute

```js
api.on(api.scene.PHASES.RENDERED, () =>
  window.trebleRecipes.turntable({ nodeName: 'Rotation_Null' })
);
```

### Wobble

**[Click Here for a Demo](https://threekit-recipes-7be9a957e40c171a.porter.run/demos/wobble.html)**

The `Wobble` animation adds a continuous wobble to the product in 3D space.

The wobble is great to add a subtle movement to a product and some dynamism to the page. It's also a good way to indicate a product is 3D and not just an image.

You can customize the wobble animation in the following ways:

- Specify the node to wobble
- magnitude - how accentuated the wobble should be
- Speed

```js
api.on(api.scene.PHASES.RENDERED, () =>
  window.trebleRecipes.wobble({ nodeName: 'Wobble_Null' })
);
```
