import React from 'react';
import {
  ThreekitProvider,
  Player,
  PortalToElement,
  FlatForm,
  Swatch,
  Tiles,
  TilesGroup,
  Snapshots,
  Share,
  Wishlist,
  Accordion,
  Tabs,
} from '@threekit-tools/treble';
import threekitConfig from '../threekit.config.js';

const App = () => {
  const attributes = {
    'Shell Color': {
      component: 'swatch',
    },
    'Shell Secondary Color': {
      component: 'swatch',
    },
    'Mask Color': {
      component: 'swatch',
    },
    'Mask Style': {
      component: 'tiles-group',
    },
  };

  // return <div>Hello</div>;

  return (
    <ThreekitProvider {...threekitConfig}>
      <div className="tk-treble-player">
        <Player>
          <Player.TopRightWidgets>
            <Wishlist />
            <Snapshots />
            <Share />
          </Player.TopRightWidgets>
        </Player>
        <FlatForm />
      </div>
    </ThreekitProvider>
  );
};

export default App;
