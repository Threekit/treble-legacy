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

  return (
    <ThreekitProvider config={threekitConfig}>
      <div className="tk-treble-player">
        <Player>
          <Player.TopRightWidgets>
            <Wishlist />
            <Snapshots />
            <Share />
          </Player.TopRightWidgets>
        </Player>
      </div>
      <PortalToElement elementId="tk-treble-form" strict={true}>
        {/* <FlatForm attributes={attributes} /> */}
        <Tabs>
          <Tabs.TabPane label="Shell">
            <TilesGroup attribute="Shell Style" />
            <Swatch attribute="Shell Color" />
            <Swatch attribute="Shell Secondary Color" />
          </Tabs.TabPane>
          <Tabs.TabPane label="Mask">
            <Tiles attribute="Mask Style" />
            <Swatch attribute="Mask Color" />
          </Tabs.TabPane>
        </Tabs>
        {/* <Accordion>
          <Accordion.AccordionItem label="Shell">
            <TilesGroup attribute="Shell Style" />
            <Swatch attribute="Shell Color" />
            <Swatch attribute="Shell Secondary Color" />
          </Accordion.AccordionItem>
          <Accordion.AccordionItem label="Mask">
            <Tiles attribute="Mask Style" />
            <Swatch attribute="Mask Color" />
          </Accordion.AccordionItem>
        </Accordion> */}
      </PortalToElement>
    </ThreekitProvider>
  );
};

export default App;
