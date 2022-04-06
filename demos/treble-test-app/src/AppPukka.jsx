import {
  ThreekitProvider,
  PortalToElement,
  // FlatForm,
  Tiles,
} from '@threekit-tools/treble';
import Player from './components/Player';
import FlatForm from './components/FlatForm';

const App = () => {
  return (
    <ThreekitProvider locale={'jp'}>
      <Player />
      <PortalToElement to="tk-treble-form" strict={true}>
        <FlatForm />
      </PortalToElement>
    </ThreekitProvider>
  );
};

export default App;
