import { ProductLayout } from '@threekit-tools/treble';
import {
  Player,
  Share,
  PortalToElement,
  FlatForm,
} from '@threekit-tools/treble';

export default function Product() {
  return (
    <ProductLayout products={{ productId: '%ASSET_ID%' }}>
      <div className="tk-treble-player">
        <Player>
          <Player.TopRightWidgets>
            <Share />
          </Player.TopRightWidgets>
        </Player>
      </div>
      <PortalToElement to="tk-treble-form" strict={true}>
        <FlatForm />
      </PortalToElement>
    </ProductLayout>
  );
}
