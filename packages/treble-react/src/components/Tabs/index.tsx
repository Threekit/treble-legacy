import React, { useState } from 'react';
import { Wrapper, TabsWrapper, Tab, TabContent } from './tabs.styles';

interface TabPaneProps extends React.FC {
  label: string;
  onClick: () => void;
}

interface TabsProps<T> {
  children: React.FunctionComponentElement<T>;
}

const TabPane: React.FC = props => <>{props.children}</>;

export const Tabs = ({ children }: TabsProps<TabPaneProps>) => {
  const [selected, setSelected] = useState<undefined | number>(0);

  const handleSelect = (idx: number) => setSelected(idx);

  if (!children) return null;

  return (
    <Wrapper>
      <TabsWrapper>
        {React.Children.map(children, (child, idx) => {
          if (child.type !== TabPane) return null;
          return (
            <Tab
              selected={selected === idx}
              onClick={() => {
                if (child.props.onClick) child.props.onClick();
                handleSelect(idx);
              }}
            >
              {child.props.label}
            </Tab>
          );
        })}
      </TabsWrapper>
      <TabContent>
        {React.Children.map(children, (child, idx) => {
          if (child.type !== TabPane) return null;
          if (selected !== idx) return null;
          return child;
        })}
      </TabContent>
    </Wrapper>
  );
};

Tabs.TabPane = TabPane;

export default Tabs;
