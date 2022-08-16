import {
  ProductLayout,
  Player,
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
        <Player />
      </div>
      <PortalToElement to="tk-treble-form" strict={true}>
        <FlatForm />
      </PortalToElement>
    </ProductLayout>
  );
}
