import { useAttribute } from '@threekit-tools/treble';

export default function Cards(props) {
  const [attribute, setAttribute] = useAttribute(props.attribute);
  if (!attribute) return <></>;
  return (
    <div>
      <h3 className="text-xl mb-4">{attribute?.label}</h3>
      <div className="flex flex-row flex-wrap content-start">
        {attribute?.values.map((item, i) => (
          <button
            key={i}
            onClick={() => setAttribute(item.assetId)}
            className={`group rounded-sm p-3 mb-2 mr-2 text-base cursor-pointer border border-solid hover:text-blue-500 hover:border-blue-500 ${
              attribute.value.assetId === item.assetId
                ? 'bg-blue-100 color text-blue-500 border-blue-500'
                : 'bg-white'
            }`}
          >
            <div
              className="rounded-sm h-20 w-20 mb-1"
              style={{ backgroundColor: item.metadata._thumbnail }}
              onClick={() => setAttribute(item.assetId)}
            >
              <span />
            </div>
            <div>{item.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
