import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
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
} from './player.styles'
import { getPlayerElementId } from '../../store/threekit'
import { DEFAULT_CLASS_NAME, CLASS_NAME_PREFIX } from '../../constants'

export interface IProps {
  children: React.ReactNode
}

export interface PlayerProps extends IProps {
  height?: string
  width?: string
  minHeight?: string
}

export const PLAYER_DIV_ID = 'tk-player-component'

const className = `${DEFAULT_CLASS_NAME} ${CLASS_NAME_PREFIX}-player`

const Player = (props: PlayerProps) => {
  const { height, width, minHeight, children } = Object.assign(
    {
      height: '70vh',
      minHeight: '600px',
      width: '100%',
    },
    props
  )

  const playerElementId = useSelector(getPlayerElementId)

  useEffect(() => {
    const attachPlayerToComponent = (moveToElementId: string) => {
      const addPlayer = (tryCount: number = 0) => {
        if (tryCount >= 10) return

        let playerEl
        let playerWrapperEl
        if (playerElementId) {
          playerEl = document.getElementById(playerElementId)
          playerWrapperEl = document.getElementById(moveToElementId)
        }

        if (!playerEl || !playerWrapperEl) {
          setTimeout(() => {
            addPlayer(tryCount + 1)
          }, 0.05 * 1000)
          return
        }

        if (!playerEl) throw new Error('Initial Player element not found')
        if (!playerWrapperEl) throw new Error('Move To element not found')

        playerWrapperEl.appendChild(playerEl)
      }

      addPlayer()
    }
    attachPlayerToComponent(PLAYER_DIV_ID)
    return
  }, [playerElementId])

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
  )
}

Player.TopLeftWidgets = (props: IProps) =>
  props.children ? (
    <TopLeftWidgetsWrapper>{props.children}</TopLeftWidgetsWrapper>
  ) : (
    <></>
  )

Player.TopCenterWidgets = (props: IProps) =>
  props.children ? (
    <TopCenterWidgetsWrapper>{props.children}</TopCenterWidgetsWrapper>
  ) : (
    <></>
  )

Player.TopRightWidgets = (props: IProps) =>
  props.children ? (
    <TopRightWidgetsWrapper>{props.children}</TopRightWidgetsWrapper>
  ) : (
    <></>
  )

Player.MiddleLeftWidgets = (props: IProps) =>
  props.children ? (
    <MiddleLeftWidgetsWrapper>{props.children}</MiddleLeftWidgetsWrapper>
  ) : (
    <></>
  )

Player.MiddleRightWidgets = (props: IProps) =>
  props.children ? (
    <MiddleRightWidgetsWrapper>{props.children}</MiddleRightWidgetsWrapper>
  ) : (
    <></>
  )

Player.BottomLeftWidgets = (props: IProps) =>
  props.children ? (
    <BottomLeftWidgetsWrapper>{props.children}</BottomLeftWidgetsWrapper>
  ) : (
    <></>
  )

Player.BottomCenterWidgets = (props: IProps) =>
  props.children ? (
    <BottomCenterWidgetsWrapper>{props.children}</BottomCenterWidgetsWrapper>
  ) : (
    <></>
  )

Player.BottomRightWidgets = (props: IProps) =>
  props.children ? (
    <BottomRightWidgetsWrapper>{props.children}</BottomRightWidgetsWrapper>
  ) : (
    <></>
  )

export default Player
