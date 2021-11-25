import styled from 'styled-components'

interface IStripWrapper {
  selected: boolean
}

export const StripsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > div:not(:first-child) {
    margin-top: 8px;
  }
`

export const StripWrapperStyles = styled.div<IStripWrapper>`
  height: max-content;
  width: 100%;
  border-radius: ${(props) => props.theme.borderRadius || '2px'};
  border: 1px solid lightgrey;
  background: #fff;

  padding: 5px 12px;

  display: grid;
  grid-template-columns: max-content auto max-content;
  grid-gap: 8px;

  cursor: pointer;

  & > div:nth-child(2) {
    height: max-content;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`

export const StripThumbnail = styled.div`
  height: 48px;
  width: 48px;
  margin-right: 5px;

  position: relative;
  top: 50%;
  transform: translateY(-50%);

  ${(props) =>
    props.color
      ? `background: ${props.color}; border-radius: ${props.theme.borderRadius};`
      : ''}

  img {
    height: 100%;
    width: auto;
    object-fit: cover;
  }
`

export const StripTitle = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-family: ${(props) => props.theme.fontFamily};
`

export const StripDescription = styled.div`
  color: ${(props) => props.theme.textColor};
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  padding-bottom: 5px;
  margin-right: 10px;
  font-family: ${(props) => props.theme.fontFamily};
`

export const StripPrice = styled.div`
  color: ${(props) => props.theme.textColorSecondary};
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  font-family: ${(props) => props.theme.fontFamily};

  height: max-content;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`

export const StripWrapper = styled(StripWrapperStyles)`
  border: 1px solid
    ${(props) => (props.selected ? props.theme.primaryColor : 'lightgrey')};
  background: ${(props) =>
    props.selected ? `${props.theme.primaryColor}18` : '#fff'};

  ${StripDescription} {
    color: ${(props) =>
      props.selected ? props.theme.primaryColor : props.theme.textColor};
  }

  ${StripTitle} {
    color: ${(props) =>
      props.selected ? props.theme.primaryColor : props.theme.textColor};
  }
  ${StripPrice} {
    color: ${(props) =>
      props.selected ? props.theme.primaryColor : props.theme.textColor};
  }

  &:hover {
    background: ${(props) => `${props.theme.primaryColor}18`};
  }
`
