import {
  ThreekitProvider,
  Player,
  PortalToElement,
  FlatForm,
} from '@threekit-tools/treble';

const App = () => {
  return (
    <ThreekitProvider>
      <div className="tk-treble-player">
        <Player />
      </div>
      <PortalToElement to="tk-treble-form" strict={true}>
        <FlatForm />
      </PortalToElement>
    </ThreekitProvider>
  );
};

export default App;
