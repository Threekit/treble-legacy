import React from 'react';
import {
  ThreekitProvider,
  Player,
  PortalToElement,
  FlatForm,
  Snapshots,
} from '@threekit-tools/treble';
import threekitConfig from '../threekit.config.js';

const App = () => {
  return (
    <ThreekitProvider config={threekitConfig}>
      <div className="tk-treble-player">
        <Player>
          <Player.TopRightWidgets>
            <Snapshots />
          </Player.TopRightWidgets>
        </Player>
      </div>
      <PortalToElement elementId="tk-treble-form" strict={true}>
        <FlatForm />
      </PortalToElement>
    </ThreekitProvider>
  );
};

export default App;
