import {
  ThreekitProvider,
  Player,
  PortalToElement,
  FlatForm,
  Share,
} from '@threekit-tools/treble';
import threekitConfig from '../threekit.config.js';

const App = () => {
  return (
    <ThreekitProvider {...threekitConfig}>
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
    </ThreekitProvider>
  );
};

export default App;
