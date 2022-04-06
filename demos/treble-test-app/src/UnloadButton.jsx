import React from 'react';
import { useProductCache } from '@threekit-tools/treble';

export const UnloadButton = () => {
  const [{ cache, products }, loadNewProduct] = useProductCache();

  const handleClick = assetId => {
    loadNewProduct(assetId);
  };

  return (
    <div>
      <div>
        {products.map(prod => (
          <button key={prod} onClick={prod.handleSelect}>
            {prod.label}
          </button>
        ))}
      </div>
      <div>
        {cache.map(el => (
          <div key={el.name}>
            <button
              style={el.selected ? { background: 'green' } : {}}
              onClick={el.handleSelect}
            >
              {el.name}
            </button>
            <button onClick={el.handleRemove}>remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnloadButton;
