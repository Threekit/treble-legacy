import React from 'react'
import styled from 'styled-components'
import { IIcon } from './index'

const SVG = styled.svg`
  .tk-icon {
    stroke: ${(props) => props.theme.textColor};
  }
`

export const Mail: IIcon = () => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 17V3H19V17H1Z" className="tk-icon" strokeWidth="2" />
      <path d="M1 5L10 11L19 5" className="tk-icon" strokeWidth="1" />
    </SVG>
  )
}

Mail.iconName = 'mail'

export default Mail
