import { useAttribute } from '@threekit-tools/treble';

export function Tiles(props) {
  const { title, attribute } = props;
  if (!attribute) return <></>;
  return (
    <div className="mb-5">
      <h3 className="text-xl mb-4">{title || attribute?.label}</h3>
      <div className="grid grid-cols-2 gap-1">
        {attribute?.values.map((item, i) => {
          return (
            <button
              key={i}
              type="button"
              onClick={item.handleSelect}
              className={`group rounded-sm h-11 px-3 mb-1 mr-1 text-base cursor-pointer border border-solid hover:border-blue-500 hover:bg-blue-50 ${
                item.selected
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

export default function TilesAttribute(props) {
  const [attribute] = useAttribute(props.attribute);
  if (!attribute) return <></>;
  return <Tiles title={props.title} attribute={attribute} />;
}
