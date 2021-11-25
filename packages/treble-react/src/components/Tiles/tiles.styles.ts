import styled from 'styled-components'

interface ITilesWrapper {
  columns: number
}

interface ITileWrapper {
  selected: boolean
}

export const TilesWrapper = styled.div<ITilesWrapper>`
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.columns}, 1fr)`};
  grid-gap: 5px;
`

export const TileWrapper = styled.div<ITileWrapper>`
  height: 100%;
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid
    ${(props) => (props.selected ? props.theme.primaryColor : 'lightgrey')};
  color: ${(props) =>
    props.selected ? props.theme.primaryColor : props.theme.textColor};
  background: ${(props) =>
    props.selected ? `${props.theme.primaryColor}18` : '#fff'};
  font-family: ${(props) => props.theme.fontFamily};

  padding: 8px 10px;

  cursor: pointer;

  &:hover {
    background: ${(props) => `${props.theme.primaryColor}18`};
  }

  & > div {
    text-align: center;
    height: max-content;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`
