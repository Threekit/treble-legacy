import {
  Player,
  PortalToElement,
  FlatForm,
  ProductLayout,
} from '@threekit-tools/treble';
import UnloadButton from '../UnloadButton';
import EmailShare from '../components/EmailShare';
import TextArea from '../components/TextArea';

const products = { frame: { preview: 'fd0e217e-63b5-4c84-ae0a-b7e9cd4ca21b' } };

export default function FrameProductPage() {
  return (
    <ProductLayout products={products}>
      <div className="tk-treble-player">
        <Player />
      </div>
      <PortalToElement to="tk-treble-form" strict={true}>
        <EmailShare />
        <UnloadButton />
        <FlatForm />
        {/* <TextInput attribute="test text input" /> */}
        <TextArea attribute="test text input" />
        {/* <Dropdown attribute="Color" /> */}
      </PortalToElement>
    </ProductLayout>
  );
}
