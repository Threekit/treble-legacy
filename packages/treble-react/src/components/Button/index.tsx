import React from 'react'
import PropTypes from 'prop-types'
import { ButtonWrapper, IconWrapper } from './button.styles'
import { generateInputClassName as generateClassName } from '../../utils'
import icons from '../../icons'

export type BUTTON_TYPES =
  | 'hollow'
  | 'standard'
  | 'accent'
  | 'primary'
  | 'threekit'

export type BUTTON_SHAPES = 'round' | 'shape'

interface IButton {
  type: BUTTON_TYPES
  icon?: string
  title?: string
  onClick?: (e: React.SyntheticEvent) => void
  shape: BUTTON_SHAPES
  fullWidth: boolean
  className: string
}

export const TYPES = {
  hollow: 'hollow',
  standard: 'standard',
  accent: 'accent',
  primary: 'primary',
  threekit: 'threekit',
}

export const SHAPES = {
  round: 'round',
  square: 'square',
}

export const Button = (props: IButton) => {
  const {
    type,
    icon,
    title,
    onClick,
    shape,
    fullWidth,
    className: customClassName,
  } = Object.assign(
    {
      type: TYPES.standard,
      icon: undefined,
      shape: SHAPES.square,
      fullWidth: false,
    },
    props
  )

  const cls = generateClassName('button', customClassName, title)
  const Icon = icon ? icons[icon] : null

  if (!Icon && !title?.length) return null

  return (
    <ButtonWrapper
      className={cls}
      onClick={onClick}
      type={type}
      shape={shape}
      iconOnly={!!icon && !title?.length}
      fullWidth={fullWidth}
    >
      <div>
        {Icon ? (
          <IconWrapper type={type}>
            <Icon />
          </IconWrapper>
        ) : null}
        {title ? <div>{title}</div> : null}
      </div>
    </ButtonWrapper>
  )
}

Button.propTypes = {
  /**
   * Used to add a title to the input
   */
  title: PropTypes.string,
  /**
   * Threekit Icon to use as the prefix to the button title
   */
  icon: PropTypes.string,
  /**
   * The presentational type of the input component. Options
   * include: `hollow`, `standard`, `accent`, `primary`
   */
  type: PropTypes.string,
  /**
   * Used to set the shape of the Button component. Options
   * include: `square`, `round`
   */
  shape: PropTypes.string,
  /**
   * NOTE: Input wide hide disabled will be deprecated in favour of option
   * specific control of both 'disabled' and 'visible'.
   *
   * Used to hide the options that have the 'disabled' equal to true.
   */
  onClick: PropTypes.func,
  /**
   * Allows the Button's width to be set to 100%.
   */
  fullWidth: PropTypes.bool,
  /**
   *
   * Used to add a custom class name to each of the components html elements
   */
  className: PropTypes.string,
}

Button.defaultProps = {
  icon: undefined,
  type: 'standard',
  shape: SHAPES.square,
  onClick: undefined,
  fullWidth: false,
  className: undefined,
}

Button.componentName = 'button'

export default Button
