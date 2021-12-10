import threekitConfig from '../threekit.config.js';
import { ProductLoader } from '@threekit-tools/treble';

const App = () => {
  return <ProductLoader {...threekitConfig} productId="helmet" />;
};

export default App;
