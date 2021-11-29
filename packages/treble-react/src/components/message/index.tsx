import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Wrapper, IconWrapper } from './message.styles';
import icons, { InfoIcon } from '../../icons';
import { ThemeProvider } from 'styled-components';
import baseTheme from '../../theme';

interface IActiveMessages {
  key: string;
  element: HTMLDivElement;
}

interface IMessageConfig {
  top?: number;
  duration?: number;
  maxCount?: number;
}

interface MessageComponentProps {
  content: string | React.ReactNode;
  icon: string;
}

let messagesEl: HTMLDivElement;
const activeMessages: Array<IActiveMessages> = [];
let messagesConfig: IMessageConfig = {
  top: 12,
  duration: undefined,
  maxCount: 3,
};

const createMessageEl = () => {
  if (messagesEl) return;
  messagesEl = document.createElement('div');
  messagesEl.style.position = 'fixed';
  messagesEl.style.top = '0px';
  messagesEl.style.left = '50%';
  messagesEl.style.transform = 'translateX(-50%)';
  messagesEl.style['z-index'] = '10';

  document.body.appendChild(messagesEl);
};

const config = (updatedConfig: IMessageConfig) => {
  if (!updatedConfig) return;
  messagesConfig = Object.assign(messagesConfig, updatedConfig);
};

export const MessageComponent = (props: MessageComponentProps) => {
  const { content, icon } = props;
  if (!content) return null;
  const Icon = icon ? icons[icon] : InfoIcon;
  return (
    <ThemeProvider theme={baseTheme}>
      <Wrapper>
        <IconWrapper>
          <Icon />
        </IconWrapper>
        <div>{content}</div>
      </Wrapper>
    </ThemeProvider>
  );
};

const info = (content: string | React.ReactNode, icon?: string) => {
  createMessageEl();

  const id = `tk-message-${Date.now()}`;

  const newMessageEl = document.createElement('div');
  newMessageEl.id = id;
  messagesEl.appendChild(newMessageEl);

  while (activeMessages.length + 1 > (messagesConfig?.maxCount || 3)) {
    ReactDOM.unmountComponentAtNode(activeMessages[0].element);
    activeMessages.shift();
  }

  activeMessages.push({
    key: id,
    element: newMessageEl,
  });

  ReactDOM.render(
    <MessageComponent content={content} icon={icon} />,
    newMessageEl
  );

  setTimeout(() => {
    const messageToRemove = activeMessages.find(el => el.key === id);
    if (!messageToRemove) return;
    ReactDOM.unmountComponentAtNode(newMessageEl);
    messageToRemove.element.remove();
    activeMessages.shift();
  }, (messagesConfig.duration || 2 + (typeof content === 'string' ? 0.05 * content.length : 0.5)) * 1000);
};

MessageComponent.propTypes = {
  /**
   * The content to be displayed in the message
   */
  content: PropTypes.string,
  /**
   * The icon to display before the message
   */
  icon: PropTypes.string,
  /**
   * Used to add a custom class name to each of the components html elements
   */
  className: PropTypes.string,
};

MessageComponent.defaultProps = {
  content: undefined,
  icon: InfoIcon.iconName,
  className: undefined,
};

export default { config, info };
