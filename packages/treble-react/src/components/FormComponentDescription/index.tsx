import React from 'react'
import { Wrapper } from './formComponentDescription.styles'

interface IFormComponentDescription {
  children?: React.ReactNode
  className: string
  description?: string
}

export const FormComponentDescription = (props: IFormComponentDescription) => {
  const { description, className } = props
  if (!description) return null
  return <Wrapper className={`${className}-description`}>{description}</Wrapper>
}

export default FormComponentDescription
