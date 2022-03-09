import { useAttribute } from '@threekit-tools/treble';

export function Cards(props) {
  const { title, attribute } = props;
  if (!attribute) return <></>;
  return (
    <div>
      <h3 className="text-xl mb-4">{title || attribute?.label}</h3>
      <div className="flex flex-row flex-wrap content-start">
        {attribute?.values.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={item.handleSelect}
            className={`group rounded-sm p-3 mb-2 mr-2 text-base cursor-pointer border border-solid hover:text-blue-500 hover:border-blue-500 ${
              item.selected
                ? 'bg-blue-100 color text-blue-500 border-blue-500'
                : 'bg-white'
            }`}
          >
            <div
              className="rounded-sm h-20 w-20 mb-1"
              style={{ backgroundColor: item.metadata?._thumbnail }}
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

export default function CardsAttribute(props) {
  const [attribute] = useAttribute(props.attribute);
  if (!attribute) return <></>;
  return <Cards title={props.title} attribute={attribute} />;
}
