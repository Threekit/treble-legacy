import { useAttribute } from '@threekit-tools/treble';

export default function Strips(props) {
  const [attribute] = useAttribute(props.attribute);
  if (!attribute) return <></>;
  return (
    <div>
      <h3 className="text-xl mb-4">{props.title || attribute?.label}</h3>
      <div className="flex flex-col flex-wrap content-start">
        {attribute?.values.map((item, i) => {
          return (
            <button
              key={i}
              type="button"
              onClick={item.handleSelect}
              className={`group flex flex-row rounded-sm w-full p-3 mb-2 mr-2 cursor-pointer border border-solid hover:text-blue-500 hover:border-blue-500 ${
                selected
                  ? 'bg-blue-100 color text-blue-500 border-blue-500'
                  : 'bg-white border-gray-500'
              }`}
            >
              <div
                className="rounded-sm h-12 w-12 mb-1 mr-2 cursor-pointer flex-shrink-0"
                style={{ backgroundColor: item.metadata._thumbnail }}
                onClick={item.handleSelect}
              >
                <span />
              </div>
              <div className="flex flex-col justify-center min-h-full">
                <div>
                  <h4 className="h-max text-left my-2 mx-0">{item.label}</h4>
                  {item.metadata?._description ? (
                    <p className="text-left mx-0 my-1">
                      {item.metadata?._description}
                    </p>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
