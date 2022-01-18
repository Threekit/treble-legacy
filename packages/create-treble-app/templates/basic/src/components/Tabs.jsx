import { useState, Children } from 'react';

export function TabPane(props) {
  return <>{props.children}</>;
}

function Tabs({ children }) {
  const [selected, setSelected] = useState(0);

  const handleSelect = (idx) => setSelected(idx);

  if (!children) return null;

  return (
    <div>
      <div className="flex flex-row w-full border-0 border-b border-solid border-gray-300">
        {Children.map(children, (child, idx) => {
          if (child.type !== TabPane) return null;
          return (
            <button
              className={`w-max py-1 px-4 mx-4 cursor-pointer text-lg font-medium bg-white transform translate-y-px border-0 ${
                selected === idx
                  ? 'border-b-2 border-solid border-primary text-primary'
                  : ''
              }`}
              selected={selected === idx}
              onClick={() => {
                if (child.props.onClick) child.props.onClick();
                handleSelect(idx);
              }}
            >
              {child.props.label}
            </button>
          );
        })}
      </div>
      <div className="p-3">
        {Children.map(children, (child, idx) => {
          if (child.type !== TabPane) return null;
          if (selected !== idx) return null;
          return child;
        })}
      </div>
    </div>
  );
}

Tabs.TabPane = TabPane;

export default Tabs;
