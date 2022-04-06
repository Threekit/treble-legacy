import {
  PortalToElement,
  ProductLayout,
  FlatForm,
} from '@threekit-tools/treble';
import Player from '../components/Player';
import Wishlist from '../components/Wishlist';
import Snapshots from '../components/Snapshots';
import Zoom from '../components/Zoom';
import Share from '../components/Share';

const products = {
  fridge: { preview: 'e232d084-7315-46ff-9583-8dda99146781' },
};

export default function Fridge() {
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
        <FlatForm />
      </PortalToElement>
    </ProductLayout>
  );
}
