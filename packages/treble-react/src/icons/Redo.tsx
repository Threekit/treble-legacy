import React from 'react'
import styled from 'styled-components'
import { IIcon } from './index'

const SVG = styled.svg`
  .tk-icon {
    stroke: ${(props) => props.theme.textColor};
  }
`

export const Redo: IIcon = () => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 6L12.5 2M17.5 6L12.5 10M17.5 6H7C5.33333 6 2 7 2 11C2 15 5.33333 16 7 16H11.5"
        className="tk-icon"
        strokeWidth="2"
      />
    </SVG>
  )
}

Redo.iconName = 'redo'

export default Redo
