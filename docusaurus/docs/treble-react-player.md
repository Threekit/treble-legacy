---
id: treble-react-player
title: Player
sidebar_label: Player
---

# Player

The `<Player />` component renders the **Threekit Player**.

```jsx
import { ThreekitProvider, Player } from '@threekit-tools/treble';
import threekitConfig from './threekit.config.js';

const ThreekitApp = () => {
  return (
    <ThreekitProvider config={threekitConfig}>
      <Player />
    </ThreekitProvider>
  );
};
```

### Player Widgets

The Player Component also comes with **widget containers** that can be used to position widgets or any component in pre-defined locations around the player.

```jsx
import { ThreekitProvider, Player } from '@threekit-tools/treble';
import threekitConfig from './threekit.config.js';

//  We can separate out the widget container component
//  or use the component directly from the Player component
const { TopRightWidgets } = Player;

const ThreekitApp = () => {
  return (
    <ThreekitProvider config={threekitConfig}>
      <Player>
        <TopRightWidgets>
          <div>This will show up in the top-right of the player</div>
        </TopRightWidgets>

        <Player.BottomRightWidgets>
          <div>This will show up in the bottom-right of the player</div>
        </Player.BottomRightWidgets>
      </Player>
    </ThreekitProvider>
  );
};
```
