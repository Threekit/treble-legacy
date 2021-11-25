import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Wrapper, Background, Header, Content } from './modal.styles'
import { generateLayoutClassName as generateClassName } from '../../utils'
import { RemoveIcon } from '../../icons'

interface IModalProps {
  title?: string
  showHeader?: boolean
  className?: string
  show?: boolean
  handleClose?: () => void
  children?: React.ReactNode
}

interface IModal extends React.FC<IModalProps> {
  componentName: string
}

export const ModalComponent: React.FC<IModalProps> = (props) => {
  const { title, children, handleClose, showHeader, className } = props
  return (
    <Wrapper
      onClick={(e) => e.stopPropagation()}
      className={`${className} modal-main`}
    >
      {showHeader ? (
        <Header className={`${className} modal-header`}>
          <div className={`${className} modal-title`}>{title}</div>
          <div onClick={handleClose}>
            <RemoveIcon />
          </div>
        </Header>
      ) : null}
      <Content className={`${className} modal-content`}>{children}</Content>
    </Wrapper>
  )
}

export const Modal: IModal = (props) => {
  const { title, children, handleClose, showHeader, className } = props
  const cls = generateClassName('modal', className)

  return (
    <Background onClick={handleClose} className={`${cls} modal-background`}>
      <ModalComponent
        title={title}
        handleClose={handleClose}
        showHeader={showHeader}
        className={cls}
      >
        {children}
      </ModalComponent>
    </Background>
  )
}

ModalComponent.propTypes = {
  /**
   * The title to be shown in the Modal header
   */
  title: PropTypes.string,
  /**
   * Callback function to close the modal. Can be used with custom UI
   * components in the Modal
   */
  handleClose: PropTypes.func,
  /**
   * Whether or not to render the default Modal header
   */
  showHeader: PropTypes.bool,
  /**
   * Used to add a custom class name to each of the components html elements
   */
  className: PropTypes.string,
}

ModalComponent.defaultProps = {
  title: undefined,
  handleClose: undefined,
  showHeader: true,
  className: undefined,
}

Modal.componentName = 'modal'

export default (props: IModalProps) =>
  props.show ? ReactDOM.createPortal(<Modal {...props} />, document.body) : null
