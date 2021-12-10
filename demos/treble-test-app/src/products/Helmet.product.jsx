import { PortalToElement, ProductLayout } from '@threekit-tools/treble';
import Player from '../components/Player';
import Tiles from '../components/Tiles';
import ColorSwatch from '../components/ColorSwatch';
import Wishlist from '../components/Wishlist';
import Snapshots from '../components/Snapshots';
import Zoom from '../components/Zoom';
import Share from '../components/Share';
import Tabs, { TabPane } from '../components/Tabs';
import Strips from '../components/Strips';

const products = {
  helmet: 'b6740d58-e077-4997-8a63-ceb2086ceb0b',
  'helmet-alt': 'e84c60a7-d561-435b-8b9b-869246121ab4',
};

export default function HelmetProductPage() {
  return (
    <ProductLayout products={products}>
      <div className="tk-treble-player">
        <Player>
          <div className="player-wgts wgt-top-right">
            <Snapshots />
            <Share />
            <Wishlist />
          </div>
          <div>
            <Zoom />
          </div>
        </Player>
      </div>
      <PortalToElement to="tk-treble-form" strict={true}>
        <Tabs>
          <TabPane label="Shell">
            <Tiles attribute="Shell Style" />
            <Strips attribute="Shell Color" />
            <ColorSwatch attribute="Shell Secondary Color" />
          </TabPane>
          <TabPane label="Mask">
            <Tiles attribute="Mask Style" />
            <ColorSwatch attribute="Mask Color" />
          </TabPane>
        </Tabs>
      </PortalToElement>
    </ProductLayout>
  );
}
