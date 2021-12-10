import {
  Player,
  Share,
  PortalToElement,
  FlatForm,
  ProductLayout,
} from '@threekit-tools/treble';

const products = { frame: 'fd0e217e-63b5-4c84-ae0a-b7e9cd4ca21b' };

export default function FrameProductPage() {
  return (
    <ProductLayout products={products}>
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
