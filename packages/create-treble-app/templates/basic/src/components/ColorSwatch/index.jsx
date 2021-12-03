import { useAttribute } from '@threekit-tools/treble';
import './color-swatch.css';

function Tooltip(props) {
  return (
    <div className="treble-swatch-title hidden pb-2 w-max relative -top-full left-1/2 transform -translate-y-full -translate-x-1/2">
      <div className="rounded-sm py-2 px-3 bg-black bg-opacity-60">
        <div className="text-white">{props.label}</div>
      </div>
      <div className="flex flex-row justify-around">
        <div className="w-0 h-0 overflow-hidden pointer-events-none border-l-8 border-r-8 border-transparent" />
      </div>
    </div>
  );
}

export default function ColorSwatch(props) {
  const [attribute, setAttribute] = useAttribute(props.attribute);
  if (!attribute) return <></>;
  return (
    <div>
      <h3 className="text-xl mb-4">{attribute?.label}</h3>
      <div className="flex flex-row flex-wrap content-start">
        {attribute?.values.map((item, i) => (
          <button
            key={i}
            className={`treble-swatch rounded-full h-12 w-12 p-1 mb-1 mr-1 border hover:border-blue-500 ${
              attribute.value.assetId === item.assetId ? 'border-blue-500' : ''
            }`}
          >
            <div
              className="rounded-full h-full w-full cursor-pointer"
              style={{ backgroundColor: item.metadata._thumbnail }}
              onClick={() => setAttribute(item.assetId)}
            ></div>
            <Tooltip label={item.label} />
          </button>
        ))}
      </div>
    </div>
  );
}
