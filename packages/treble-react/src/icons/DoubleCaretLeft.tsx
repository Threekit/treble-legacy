import React from 'react'
import styled from 'styled-components'
import { IIcon } from './index'

const SVG = styled.svg`
  .tk-icon {
    stroke: ${(props) => props.theme.textColor};
  }
`

export const DoubleCaretLeft: IIcon = () => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.5 3L3.5 10L10.5 17" className="tk-icon" strokeWidth="2" />
      <path d="M17 3L10 10L17 17" className="tk-icon" strokeWidth="2" />
    </SVG>
  )
}

DoubleCaretLeft.iconName = 'double-caret-left'

export default DoubleCaretLeft
