import {
  ThreekitProvider,
  Player as NativePlayer,
  PortalToElement,
  FlatForm,
  Wishlist,
  useNestedConfigurator,
} from '@threekit-tools/treble';
import Player from './components/Player';
import EmailShare from './components/EmailShare';
import Tiles from './components/Tiles';
import UnloadButton from './UnloadButton';
import Upload from './components/Upload';
import FormComponent from './components/FormComponent';
// import TextInput from './components/TextInput';

// import Upload from './components/Upload';
// import utils from './utils';

const eventHandlers = {
  postConfigurationChange: (attributes, config, previousConfig) =>
    console.log('attributes', attributes, config, previousConfig),
};

const { TopRightWidgets } = NativePlayer;

export const Price = () => {
  const [_, _1, _2, price] = useNestedConfigurator(['Style', '_Variant']);
  return <div>{price ? `$${price}` : null}</div>;
};

const App = () => {
  return (
    <ThreekitProvider eventHandlers={eventHandlers}>
      <Player>
        <TopRightWidgets>
          <Wishlist />
          <EmailShare />
        </TopRightWidgets>
      </Player>
      <PortalToElement to="tk-treble-form" strict={true}>
        {/* <input className type="text" maxLength={3} /> */}
        {/* <Upload attribute="Image Upload" /> */}
        {/* <UnloadButton /> */}
        {/* <Tiles attribute="pom options" />
          <Upload attribute="Image Upload" /> */}
        <FormComponent attribute="Style" includeNestedConfigurator />
        {/* <FlatForm /> */}
        <Price />
      </PortalToElement>
    </ThreekitProvider>
  );
};

export default App;
