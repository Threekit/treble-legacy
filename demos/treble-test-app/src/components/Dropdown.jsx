import { useAttribute } from '@threekit-tools/treble';
import { useState, useRef, useEffect } from 'react';

export function Dropdown(props) {
  const { title, attribute } = props;

  if (!attribute) return <></>;
  const [hide, setHide] = useState(true);
  const ref = useRef(null);

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
    <div className="mb-5">
      <h3 className="text-xl mb-4">{title || attribute?.label}</h3>
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
    </div>
  );
}

export default function DropdownAttribute(props) {
  const [attribute] = useAttribute(props.attribute);
  if (!attribute) return <></>;
  return <Dropdown title={props.title} attribute={attribute} />;
}
