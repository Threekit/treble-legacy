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
import UnloadButton from '../UnloadButton';
import CacheHandler from '../components/CacheHandler';

const products = {
  '1mbu': { preview: '277311cd-ade0-435b-b185-cb3375ea4e68' },
  '2mbu': { preview: '416116a8-bdfb-44c8-95e0-34dfe6662bbc' },
  '3mbu': { preview: '04e7f832-622f-4375-89c8-299519237aeb' },
};

export default function MBU() {
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
        <CacheHandler />
        <FlatForm />
      </PortalToElement>
    </ProductLayout>
  );
}
