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
  kamado: { preview: 'e20a72b1f-dbec-4c5e-826c-de234d9713f1' },
};

export default function Kamado() {
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
