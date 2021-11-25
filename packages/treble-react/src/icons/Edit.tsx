import React from 'react'
import styled from 'styled-components'
import { IIcon } from './index'

const SVG = styled.svg`
  .tk-icon {
    stroke: ${(props) => props.theme.textColor};
  }
`

export const Edit: IIcon = () => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 17H18" className="tk-icon" strokeWidth="2" />
      <path
        d="M5 13V10L13.5 1.5L16.5 4.5L8 13H5Z"
        className="tk-icon"
        strokeWidth="2"
      />
      <path d="M6.5 8.5L9.5 11.5" className="tk-icon" strokeWidth="1" />
    </SVG>
  )
}

Edit.iconName = 'edit'

export default Edit
