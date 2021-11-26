import React, { useState } from 'react'
import { Wrapper, TabsWrapper, Tab, TabContent } from './tabs.styles'

interface TabPaneProps extends React.FC {
  selected: boolean
  label: string
  handleClick: () => void
}

interface TabsProps<T> {
  children: React.FunctionComponentElement<T>
}

const TabPane: React.FC = (props) => <>{props.children}</>

export const Tabs = ({ children }: TabsProps<TabPaneProps>) => {
  const [selected, setSelected] = useState<undefined | number>(0)

  const handleSelect = (idx: number) =>
    setSelected(idx === selected ? undefined : idx)

  if (!children) return null

  return (
    <Wrapper>
      <TabsWrapper>
        {React.Children.map(children, (child, idx) => {
          if (child.type !== TabPane) return null
          return (
            <Tab selected={selected === idx} onClick={() => handleSelect(idx)}>
              {child.props.label}
            </Tab>
          )
        })}
      </TabsWrapper>
      <TabContent>
        {React.Children.map(children, (child, idx) => {
          if (child.type !== TabPane) return null
          if (selected !== idx) return null
          return React.cloneElement(child, {
            selected: selected === idx,
            handleClick: () => handleSelect(idx),
          })
        })}
      </TabContent>
    </Wrapper>
  )
}

Tabs.TabPane = TabPane

export default Tabs
