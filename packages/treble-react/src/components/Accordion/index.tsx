import React, { useState } from 'react';
import { Wrapper } from './accordion.styles';
import CaretDown from '../../icons/CaretDown';

interface AccordionItemProps extends React.FC {
  selected: boolean;
  label: string;
  handleSelect: () => void;
  onClick: () => void;
}

interface AccordionProps<T> {
  children:
    | React.FunctionComponentElement<T>
    | Array<React.FunctionComponentElement<T>>;
}

const AccordionItem: React.FC<AccordionItemProps> = props => {
  const { selected, handleSelect, label, children } = props;
  return (
    <Wrapper selected={selected}>
      <div onClick={handleSelect}>
        <div>{label}</div>
        <div></div>
        <div>
          <CaretDown
          // style={{
          //   transition: `all 0.3s`,
          //   transform: selected ? 'rotate(180deg)' : 'rotate(0)',
          // }}
          />
        </div>
      </div>
      <div>
        <div>{children}</div>
      </div>
    </Wrapper>
  );
};

export const Accordion = (props: AccordionProps<AccordionItemProps>) => {
  const [selected, setSelected] = useState<undefined | number>(undefined);

  const handleSelect = (idx: number) =>
    setSelected(idx === selected ? undefined : idx);

  if (!props.children) return null;

  return React.Children.map(props.children, (child, idx) => {
    if (child.type !== AccordionItem) return null;
    return React.cloneElement(child, {
      selected: selected === idx,
      handleSelect: () => {
        if (child.props.onClick) child.props.onClick();
        handleSelect(idx);
      },
    });
  });
};

Accordion.AccordionItem = AccordionItem;

export default Accordion;
