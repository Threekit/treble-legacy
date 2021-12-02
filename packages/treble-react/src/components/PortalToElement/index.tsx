import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

interface IPortalToElementProps {
  to?: string;
  strict?: boolean;
}

export const PortalToElement: React.FC<IPortalToElementProps> = props => {
  const { children, to, strict } = Object.assign({ strict: false }, props);

  if (!to) {
    if (strict) return null;
    return <>{children}</>;
  }

  const htmlEl = document.getElementById(to);

  if (!htmlEl) {
    if (strict) return null;
    return <>{children}</>;
  }

  return createPortal(children, htmlEl);
};

PortalToElement.propTypes = {
  /**
   * The id of the HTML element you want the content to be rendered in
   */
  to: PropTypes.string,
  /**
   * Defines the behaviour if the HTML element is not found. If strict is
   * set to `true` the content will not render, if set to `false` the
   * content will render out in its defualt flow.
   */
  strict: PropTypes.bool,
};

PortalToElement.defaultProps = {};

export default PortalToElement;
