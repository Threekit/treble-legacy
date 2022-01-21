import {
  ProductLayout,
  Player,
  Share,
  PortalToElement,
  FlatForm,
} from '@threekit-tools/treble';

const products = {
  'product-identifier': { preview: { assetId: '%ASSET_ID%' } },
};

export default function Product() {
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
