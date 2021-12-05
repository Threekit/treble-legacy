import { useAttribute } from '@threekit-tools/treble';

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
            className={`group rounded-full bg-white h-14 w-14 p-1 mb-1 mr-1 border border-solid hover:border-blue-500 ${
              attribute.value.assetId === item.assetId
                ? 'border-blue-500'
                : 'border-gray-100'
            }`}
          >
            <div
              className="rounded-full h-full w-full cursor-pointer"
              style={{ backgroundColor: item.metadata._thumbnail }}
              onClick={() => setAttribute(item.assetId)}
            >
              <span />
            </div>
            <div className="trbl-tooltip hidden group-hover:block">
              <div className="max-w-5xl rounded-sm py-2 px-3 bg-black bg-opacity-60 overflow-hidden">
                <div className="text-white">{item.label}</div>
              </div>
              <div className="trbl-tooltip-triangle">
                <div />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
