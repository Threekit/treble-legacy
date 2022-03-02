import { useAttribute } from '@threekit-tools/treble';
import { useState, useRef, useEffect } from 'react';

export default function Dropdown(props) {
  const [hide, setHide] = useState(true);
  const ref = useRef(null);

  const [attribute, setAttribute] = useAttribute(props.attribute);

  useEffect(() => {
    const handleClickOutside = e => {
      if (e && !ref.current?.contains(e.target)) setHide(true);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hide, ref]);

  if (!attribute) return <></>;

  const selectedOpt = attribute.values?.find(
    el => el.assetId === attribute.value.assetId
  );
  return (
    <div>
      <div>
        <div>{selectedOpt?.label}</div>
      </div>
      <div>
        {attribute.values?.map((item, i) => (
          <div key={i} onClick={() => setAttribute(item.assetId)}>
            <div>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
