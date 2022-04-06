import { useAttribute } from '@threekit-tools/treble';

export function TilesGroup(props) {
  const { title, attribute } = props;
  if (!attribute) return <></>;
  return (
    <div className="w-full mb-5">
      <h3 className="text-xl mb-4">{title || attribute?.label}</h3>
      <div className="w-full flex flex-row items-stretch content-start">
        {attribute?.values.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={item.handleSelect}
            className={`group flex-1 rounded-sm h-10 px-4 text-base cursor-pointer border border-solid hover:border-blue-500 hover:bg-blue-50 ${
              item.selected
                ? 'border-blue-500 bg-blue-50 color text-blue-500'
                : 'text-gray-500 bg-white border-gray-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function TilesGroupAttribute(props) {
  const [attribute] = useAttribute(props.attribute);
  if (!attribute) return <></>;
  return <TilesGroup title={props.title} attribute={attribute} />;
}
