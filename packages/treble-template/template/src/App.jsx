import {
  ThreekitProvider,
  Player,
  Share,
  PortalToElement,
  FlatForm,
} from '@threekit-tools/treble';

const App = () => {
  return (
    <ThreekitProvider>
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
