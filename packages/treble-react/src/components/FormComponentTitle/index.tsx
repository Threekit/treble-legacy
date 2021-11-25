import React from 'react'
import { Wrapper } from './formComponentTitle.styles'

interface IFormComponentTitle {
  children?: React.ReactNode
  className: string
  title?: string
}

export const FormComponentTitle = (props: IFormComponentTitle) => {
  const { title, className } = props
  if (!title) return null
  return <Wrapper className={`${className}-title`}>{title}</Wrapper>
}

export default FormComponentTitle
