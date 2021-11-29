---
sidebar_position: 4
custom_edit_url:
hide_table_of_contents: true
---

# Using Widgets

:::caution note

The Threekit Player doesn't place nicely with the demos feature of our documentation. If you don't see the 3D visuals, please refresh the page and the Player should load and render as expected.

:::

```jsx live
function ThreekitApp() {
  return (
    <ThreekitProvider config={threekitConfig} threekitEnv={'preview'}>
      <Player>
        <Player.TopRightWidgets>
          <Snapshots />
        </Player.TopRightWidgets>
        <Player.MiddleRightWidgets>
          <Zoom orientation="vertical" />
        </Player.MiddleRightWidgets>
      </Player>
    </ThreekitProvider>
  );
}
```
