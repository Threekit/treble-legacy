import styled from 'styled-components'
import { TYPES } from './index'

interface IIconWrapper {
  type: string
}

interface IButtonWrapper {
  fullWidth?: boolean
  iconOnly?: boolean
  shape: string
  type: string
}

export const ButtonWrapper = styled.div<IButtonWrapper>`
  height: 40px;
  width: ${(props) =>
    props.fullWidth ? '100%' : props.iconOnly ? '40px' : 'max-content'};
  padding: ${(props) => (props.iconOnly ? '0px' : '10px 16px')};
  cursor: pointer;
  transition: all 0.16s ease-in-out;
  overflow: hidden;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.fontBaseSize};

  border-radius: ${(props) =>
    props.shape === 'round' ? '20px' : props.theme.borderRadius};

  border: 1px solid
    ${(props) => {
      switch (props.type) {
        case TYPES.threekit:
          return 'none'
        case TYPES.hollow:
          return 'none'
        case TYPES.accent:
          return props.theme.primaryColor
        case TYPES.primary:
          return props.theme.primaryColor
        case TYPES.standard:
        default:
          return 'lightgrey'
      }
    }};
  background: ${(props) => {
    switch (props.type) {
      case TYPES.threekit:
        return 'rgba(251, 251, 251, 0.5);'
      case TYPES.hollow:
        return 'none'
      case TYPES.accent:
        return '#fff'
      case TYPES.primary:
        return props.theme.primaryColor
      case TYPES.standard:
      default:
        return '#fff'
    }
  }};
  color: ${(props) => {
    switch (props.type) {
      case TYPES.threekit:
        return '#000'
      case TYPES.hollow:
        return props.theme.primaryColor
      case TYPES.accent:
        return props.theme.primaryColor
      case TYPES.primary:
        return '#fff'
      case TYPES.standard:
      default:
        return props.theme.textColor
    }
  }};

  &:hover {
    box-shadow: ${(props) => {
      switch (props.type) {
        case TYPES.threekit:
          return '0px 0px 4px rgb(0 0 0 / 25%)'
        default:
          return 'none'
      }
    }};

    background: ${(props) => {
      switch (props.type) {
        case TYPES.threekit:
          return 'rgba(240, 240, 240, 0.75)'
        case TYPES.hollow:
          return `${props.theme.primaryColor}18`
        case TYPES.accent:
          return `${props.theme.primaryColor}18`
        case TYPES.primary:
          return `${props.theme.primaryColor}cc`
        case TYPES.standard:
        default:
          return `#eee`
      }
    }};
  }

  & > div {
    width: max-content;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;

    text-align: center;

    user-select: none;

    display: grid;
    grid-template-columns: max-content max-content;

    & > div:nth-child(2) {
      margin-left: 8px;
    }
  }
`

export const IconWrapper = styled.div<IIconWrapper>`
  height: 20px;
  width: 20px;

  .tk-icon {
    stroke: ${(props) => {
      switch (props.type) {
        case TYPES.threekit:
          return '#000'
        case TYPES.hollow:
          return props.theme.primaryColor
        case TYPES.accent:
          return props.theme.primaryColor
        case TYPES.primary:
          return '#fff'
        case TYPES.standard:
        default:
          return props.theme.textColor
      }
    }};
  }
`
