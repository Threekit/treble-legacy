import {
  ThreekitProvider,
  PortalToElement,
  // FlatForm,
  Tiles,
  PortalToArOverlay,
} from '@threekit-tools/treble';
import Player from './components/Player';
import FlatForm from './components/FlatForm';

const App = () => {
  return (
    <ThreekitProvider>
      {/* <ThreekitProvider threekitEnv="road-30"> */}
      <Player />
      <PortalToElement to="tk-treble-form" strict={true}>
        <Tiles attribute="Skin" />
        <FlatForm />
      </PortalToElement>
      <PortalToArOverlay>
        <div
          style={{
            height: 'maxContent',
            top: '100%',
            position: 'relative',
            transform: 'translateY(-100%)',
          }}
        >
          <Tiles attribute="Finish" />
        </div>
      </PortalToArOverlay>
    </ThreekitProvider>
  );
};

export default App;
