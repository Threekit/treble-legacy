import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button, { BUTTON_SHAPES, BUTTON_TYPES } from '../Button';
import message from '../message';
import ShareIcon from '../../icons/Share';
import useThreekitInitStatus from '../../hooks/useThreekitInitStatus';
import { generateWidgetClassName as generateClassName } from '../../utils';
import { Wrapper, ShareWrapper, Content, Caret } from './share.styles';
import type { Positions } from './share.styles';

interface ShareProps {
  shape?: BUTTON_SHAPES;
  type?: BUTTON_TYPES;
  className?: string;
  message?: string;
  position: Positions;
}

export const Share = (props: ShareProps) => {
  const {
    shape,
    type,
    className,
    message: msg,
    position,
  } = Object.assign(
    {
      type: 'threekit',
      shape: 'round',
      message: 'Link copied!',
      position: 'bottom-right',
    },
    props
  );

  const hasLoaded = useThreekitInitStatus();
  const [show, setShow] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<null | string>(null);
  const resumeUrlElRef = useRef<HTMLInputElement>(null);
  const shareButtonRef = useRef<HTMLDivElement>(null);
  const shareContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (!e) return;
      if (
        !shareButtonRef.current?.contains(e.target as Node) &&
        !shareContentRef.current?.contains(e.target as Node)
      ) {
        setShow(false);
        e.stopPropagation();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, shareButtonRef, shareContentRef]);

  if (!hasLoaded) return null;

  const cls = generateClassName('share', className);

  const handleClick = async () => {
    if (show) {
      setResumeUrl(null);
      setShow(!show);
      return;
    }
    const configuration = await window.threekit.treble.saveConfiguration();
    try {
      await navigator.clipboard.writeText(configuration.resumableUrl);
      if (msg?.length) message.info(msg);
    } catch (e) {
      setResumeUrl(configuration.resumableUrl);
      setShow(!show);
    }
  };

  const handleClickCopy = async () => {
    if (!resumeUrlElRef.current?.value) return;
    navigator.clipboard.writeText(resumeUrlElRef.current.value);
    if (msg?.length) message.info(msg);
  };

  return (
    <Wrapper ref={shareButtonRef}>
      <Button
        className={cls}
        shape={shape}
        type={type}
        icon={ShareIcon.iconName}
        onClick={handleClick}
      />
      {show ? (
        <ShareWrapper position={position}>
          <Content ref={shareContentRef}>
            <input
              type="text"
              ref={resumeUrlElRef}
              value={resumeUrl || ''}
              onChange={() => {}}
            />
            <button type="button" onClick={handleClickCopy}>
              copy link
            </button>
          </Content>
          <Caret />
        </ShareWrapper>
      ) : null}
    </Wrapper>
  );
};

Share.propTypes = {
  className: PropTypes.string,
  /**
   * The presentational type of the input component. Options
   * include: `hollow`, `standard`, `accent`, `primary`
   */
  type: PropTypes.string,
  /**
   * Used to set the shape of the Widget button. Options
   * include: `square`, `round`
   */
  shape: PropTypes.string,
  /**
   * Used to set an overwrite of the message presented to the user
   * when the share URL has been successfully copied.
   */
  message: PropTypes.string,
};

Share.defaultProps = {
  className: '',
  shape: 'round',
  type: 'threekit',
  message: 'Link copied!',
};

export default Share;
