import { useAttribute } from '@threekit-tools/treble';

export default function ColorSwatch(props) {
  const [attribute, setAttribute] = useAttribute(props.attribute);
  if (!attribute) return <></>;
  return (
    <div>
      <h3 className="text-xl mb-4">{attribute?.label}</h3>
      <div className="flex flex-row space-x-2">
        {attribute?.values.map((item, i) => (
          <button
            key={i}
            className={`rounded-full h-100% w-100% p-1 border hover:border-blue-500 ${
              attribute.value.assetId === item.assetId ? 'border-blue-500' : ''
            }`}
          >
            <div
              className="rounded-full h-10 w-10 cursor-pointer"
              style={{ backgroundColor: item.metadata._thumbnail }}
              onClick={() => setAttribute(item.assetId)}
            ></div>
          </button>
        ))}
      </div>
    </div>
  );
}
