import React from 'react'
import styled from 'styled-components'
import { IIcon } from './index'

const SVG = styled.svg`
  .tk-icon {
    stroke: ${(props) => props.theme.textColor};
  }
`

export const Pause: IIcon = () => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="3"
        width="4"
        height="14"
        className="tk-icon"
        strokeWidth="2"
      />
      <rect
        x="13"
        y="3"
        width="4"
        height="14"
        className="tk-icon"
        strokeWidth="2"
      />
    </SVG>
  )
}

Pause.iconName = 'pause'

export default Pause
