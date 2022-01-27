import React, { useEffect, useRef } from 'react';
import {
  Wrapper,
  TopLeftWidgetsWrapper,
  TopCenterWidgetsWrapper,
  TopRightWidgetsWrapper,
  MiddleLeftWidgetsWrapper,
  MiddleRightWidgetsWrapper,
  BottomLeftWidgetsWrapper,
  BottomCenterWidgetsWrapper,
  BottomRightWidgetsWrapper,
} from './player.styles';
import { DEFAULT_CLASS_NAME, CLASS_NAME_PREFIX } from '../../constants';
import usePlayerPortal from '../../hooks/usePlayerPortal';

export interface IProps {
  children: React.ReactNode;
}

export interface PlayerProps extends IProps {
  height?: string;
  width?: string;
  minHeight?: string;
}

export const PLAYER_DIV_ID = 'tk-player-component';

const className = `${DEFAULT_CLASS_NAME} ${CLASS_NAME_PREFIX}-player`;

const Player = (props: PlayerProps) => {
  const { height, width, minHeight, children } = Object.assign(
    {
      height: '100%',
      minHeight: '600px',
      width: '100%',
    },
    props
  );
  const [portalPlayerTo, portalBack] = usePlayerPortal();
  const hasMoved = useRef<boolean>(false);

  useEffect(() => {
    if (portalPlayerTo && !hasMoved.current) {
      portalPlayerTo(PLAYER_DIV_ID);
      hasMoved.current = true;
    }

    return () => {
      if (portalBack) {
        portalBack();
        hasMoved.current = false;
      }
    };
  }, [portalPlayerTo]);

  return (
    <Wrapper
      height={height}
      width={width}
      minHeight={minHeight}
      className={className}
    >
      <div id={PLAYER_DIV_ID} />
      {children}
    </Wrapper>
  );
};

Player.TopLeftWidgets = (props: IProps) =>
  props.children ? (
    <TopLeftWidgetsWrapper>{props.children}</TopLeftWidgetsWrapper>
  ) : (
    <></>
  );

Player.TopCenterWidgets = (props: IProps) =>
  props.children ? (
    <TopCenterWidgetsWrapper>{props.children}</TopCenterWidgetsWrapper>
  ) : (
    <></>
  );

Player.TopRightWidgets = (props: IProps) =>
  props.children ? (
    <TopRightWidgetsWrapper>{props.children}</TopRightWidgetsWrapper>
  ) : (
    <></>
  );

Player.MiddleLeftWidgets = (props: IProps) =>
  props.children ? (
    <MiddleLeftWidgetsWrapper>{props.children}</MiddleLeftWidgetsWrapper>
  ) : (
    <></>
  );

Player.MiddleRightWidgets = (props: IProps) =>
  props.children ? (
    <MiddleRightWidgetsWrapper>{props.children}</MiddleRightWidgetsWrapper>
  ) : (
    <></>
  );

Player.BottomLeftWidgets = (props: IProps) =>
  props.children ? (
    <BottomLeftWidgetsWrapper>{props.children}</BottomLeftWidgetsWrapper>
  ) : (
    <></>
  );

Player.BottomCenterWidgets = (props: IProps) =>
  props.children ? (
    <BottomCenterWidgetsWrapper>{props.children}</BottomCenterWidgetsWrapper>
  ) : (
    <></>
  );

Player.BottomRightWidgets = (props: IProps) =>
  props.children ? (
    <BottomRightWidgetsWrapper>{props.children}</BottomRightWidgetsWrapper>
  ) : (
    <></>
  );

export default Player;
