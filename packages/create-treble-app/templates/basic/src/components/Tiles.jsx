import { useAttribute } from '@threekit-tools/treble';

export default function Tiles(props) {
  const [attribute, setAttribute] = useAttribute(props.attribute);
  if (!attribute) return <></>;
  return (
    <div className="mb-5">
      <h3 className="text-xl mb-4">{attribute?.label}</h3>
      <div className="grid grid-cols-2 gap-1">
        {attribute?.values.map((item, i) => {
          const selected = item.assetId
            ? item.assetId === attribute.value.assetId
            : item.value === attribute.value;
          return (
            <button
              key={i}
              onClick={() =>
                setAttribute(item.assetId ? item.assetId : item.value)
              }
              className={`group rounded-sm h-11 px-3 mb-1 mr-1 text-base cursor-pointer border border-solid hover:border-blue-500 hover:bg-blue-50 ${
                selected
                  ? 'border-blue-500 bg-blue-50 text-blue-500'
                  : 'text-gray-500 bg-white border-gray-300'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
