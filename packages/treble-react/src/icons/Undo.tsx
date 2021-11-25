import React from 'react'
import styled from 'styled-components'
import { IIcon } from './index'

const SVG = styled.svg`
  .tk-icon {
    stroke: ${(props) => props.theme.textColor};
  }
`

export const Undo: IIcon = () => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 6L7 2M2 6L7 10M2 6H12.5C14.1667 6 17.5 7 17.5 11C17.5 15 14.1667 16 12.5 16H8"
        className="tk-icon"
        strokeWidth="2"
      />
    </SVG>
  )
}

Undo.iconName = 'undo'

export default Undo
