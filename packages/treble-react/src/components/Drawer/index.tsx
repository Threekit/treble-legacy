import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Wrapper, Background, Header, Content } from './drawer.styles'
import { generateLayoutClassName as generateClassName } from '../../utils'
import { RemoveIcon } from '../../icons'

interface IDrawerProps {
  title?: string
  showHeader?: boolean
  className?: string
  show?: boolean
  handleClose?: () => void
  children?: React.ReactNode
}

interface IDrawer extends React.FC<IDrawerProps> {
  componentName: string
}

const TRANSITION_DURATION = 0.2

export const Drawer: IDrawer = (props) => {
  const { title, children, handleClose, showHeader, className } = props
  const [show, setShow] = useState(false)

  useEffect(() => {
    ;(() => {
      setShow(true)
    })()
  }, [])

  const handleClickClose = () => {
    if (!handleClose) return
    setShow(false)
    setTimeout(() => {
      handleClose()
    }, 1000 * TRANSITION_DURATION)
  }

  const cls = generateClassName('drawer', className)

  return (
    <Background
      show={show}
      transitionDuration={TRANSITION_DURATION + 's'}
      onClick={handleClickClose}
      className={`${cls} drawer-background`}
    >
      <Wrapper
        show={show}
        transitionDuration={TRANSITION_DURATION + 's'}
        onClick={(e) => e.stopPropagation()}
        className={`${cls} drawer-main`}
      >
        {showHeader ? (
          <Header className={`${cls} drawer-header`}>
            <div className={`${cls} drawer-title`}>{title}</div>
            <div onClick={handleClickClose}>
              <RemoveIcon />
            </div>
          </Header>
        ) : null}
        <Content className={`${cls} drawer-content`}>{children}</Content>
      </Wrapper>
    </Background>
  )
}

Drawer.propTypes = {
  /**
   * The title to be shown in the Drawer header
   */
  title: PropTypes.string,
  /**
   * Callback function to close the Drawer. Can be used with custom UI
   * components in the Drawer
   */
  handleClose: PropTypes.func,
  /**
   * Whether or not to render the default Drawer header
   */
  showHeader: PropTypes.bool,
  /**
   * Used to add a custom class name to each of the components html elements
   */
  className: PropTypes.string,
}

Drawer.defaultProps = {
  title: undefined,
  handleClose: undefined,
  showHeader: true,
  className: undefined,
}

Drawer.componentName = 'drawer'

export default (props: IDrawerProps) =>
  props.show
    ? ReactDOM.createPortal(<Drawer {...props} />, document.body)
    : null
