import styled from 'styled-components'

interface ITilesGroupWrapper {
  stretch: boolean
}

interface ITileWrapper {
  selected: boolean
}

export const TilesGroupWrapper = styled.div<ITilesGroupWrapper>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;

  & > div {
    ${(props) => (props.stretch ? 'flex: 1;' : '')}
  }

  & > div:first-child {
    border-top-left-radius: ${(props) => props.theme.borderRadius};
    border-bottom-left-radius: ${(props) => props.theme.borderRadius};
  }

  & > div:last-child {
    border-top-right-radius: ${(props) => props.theme.borderRadius};
    border-bottom-right-radius: ${(props) => props.theme.borderRadius};
  }

  & > div:not(:first-child) {
    margin-right: -1px;
  }
`

export const TileWrapper = styled.div<ITileWrapper>`
  height: 100%;
  padding: 8px 10px;
  border: 1px solid
    ${(props) => (props.selected ? props.theme.primaryColor : 'lightgrey')};
  color: ${(props) =>
    props.selected ? props.theme.primaryColor : props.theme.textColor};
  background: ${(props) =>
    props.selected ? `${props.theme.primaryColor}18` : '#fff'};
  z-index: ${(props) => (props.selected ? 2 : 1)};
  font-family: ${(props) => props.theme.fontFamily};

  cursor: pointer;

  &:hover {
    background: ${(props) => `${props.theme.primaryColor}18`};
  }

  & > div {
    text-align: center;
  }
`
