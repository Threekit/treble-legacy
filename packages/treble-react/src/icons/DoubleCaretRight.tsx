import React from 'react'
import styled from 'styled-components'
import { IIcon } from './index'

const SVG = styled.svg`
  .tk-icon {
    stroke: ${(props) => props.theme.textColor};
  }
`

export const DoubleCaretRight: IIcon = () => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 17L17 10L10 3" className="tk-icon" strokeWidth="2" />
      <path d="M3.5 17L10.5 10L3.5 3" className="tk-icon" strokeWidth="2" />
    </SVG>
  )
}

DoubleCaretRight.iconName = 'double-caret-right'

export default DoubleCaretRight
