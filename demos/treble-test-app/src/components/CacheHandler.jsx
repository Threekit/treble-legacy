import { useProductCache } from '@threekit-tools/treble';

export function CacheHandler() {
  const [{ cache, products }, handleLoadProduct] = useProductCache();
  return (
    <div>
      <div>
        <button onClick={() => handleLoadProduct('1mbu')}>Load Product</button>
      </div>
      <div>
        {cache.map(prod => (
          <div
            style={Object.assign(
              {},
              prod.selected ? { background: 'blue' } : {}
            )}
          >
            {prod.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CacheHandler;
