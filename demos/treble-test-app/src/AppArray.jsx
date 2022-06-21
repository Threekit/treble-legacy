import {
  ThreekitProvider,
  PortalToElement,
  useArrayAttribute,
} from '@threekit-tools/treble';
import Player from './components/Player';

const ArrayAttributeComponent = props => {
  const [options, state, addItem, moveItem, deleteItem] = useArrayAttribute(
    props.attribute
  );

  console.log(options, state);

  if (!options) return null;

  return (
    <div>
      <div>Options</div>
      <div>
        {options.map(val => (
          <div key={val.name}>
            <button onClick={() => addItem(val.assetId)}>{val.name}</button>
          </div>
        ))}
      </div>
      <div style={{ margin: '10px 0' }}>State</div>
      <div>
        {state.map((val, i) => (
          <div key={val.assetId}>
            <button onClick={() => moveItem(i, 1)}>{val.assetId}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThreekitProvider>
      {/* <ThreekitProvider threekitEnv="road-30"> */}
      <Player />
      <PortalToElement to="tk-treble-form" strict={true}>
        <ArrayAttributeComponent attribute="Components" />
      </PortalToElement>
    </ThreekitProvider>
  );
};

export default App;
