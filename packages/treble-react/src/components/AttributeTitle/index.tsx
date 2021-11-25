import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper } from './attributeTitle.styles'
import useAttribute from '../../hooks/useAttribute'
import { generateDisplayClassName as generateClassName } from '../../utils'

interface IAttributeTitle {
  title?: string
  attribute?: string
  className?: string
}

export const AttributeTitle = (props: IAttributeTitle) => {
  const {
    attribute,
    title,
    className: customClassName,
  } = Object.assign({ title: undefined, className: '' }, props)
  const [attributeData] = useAttribute(attribute)
  if (!title && !attributeData) return null

  const cls = generateClassName('attr-title', customClassName, title)

  const preppedTitle = title || attributeData?.label

  return <Wrapper className={cls}>{preppedTitle}</Wrapper>
}

AttributeTitle.propTypes = {
  /**
   * The attribute's title/label displayed to the user
   */
  attribute: PropTypes.string,
  /**
   * An override value to display instead of the attribute title.
   */
  title: PropTypes.string,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */
  className: PropTypes.string,
}

AttributeTitle.defaultProps = {
  title: undefined,
  className: '',
}

export default AttributeTitle
