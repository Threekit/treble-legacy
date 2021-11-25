import styled from 'styled-components'

interface IDropdownWrapper {
  isLoading?: boolean
  // active: boolean;
}

interface IDropdownMain {
  active: boolean
  hasPlaceholder: boolean
}

interface IDropdownOptions {
  hide: boolean
  dropdownMaxHeight?: string
}

interface IOptionWrapperStyles {
  selected: boolean
}

export const DropdownWrapper = styled.div<IDropdownWrapper>`
  position: relative;
  background-color: #fff;
  /* width: max-content ; */
  width: 100%;
  margin-bottom: 15px;

  border-radius: ${(props) => props.theme.borderRadius};

  transition: all 0.2s;

  cursor: ${(props) => (props.isLoading ? 'wait' : 'pointer')};
`

export const DropdownMain = styled.div<IDropdownMain>`
  min-height: 36px;
  height: max-content;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.active ? props.theme.primaryColor : props.theme.borderColorBase};
  border-radius: ${(props) => props.theme.borderRadius};
  font-family: ${(props) => props.theme.fontFamily};

  display: grid;
  grid-template-columns: max-content auto max-content max-content;

  cursor: pointer;

  padding: 5px 12px;

  &:hover {
    border-color: ${(props) => props.theme.primaryColor};
  }

  & > div:nth-child(1) {
    color: ${(props) =>
      props.active
        ? props.theme.disabledColor
        : props.hasPlaceholder
        ? props.theme.disabledColor
        : props.theme.headingColor};
  }

  & > div:nth-child(2) {
    height: max-content;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`

export const DropdownOptions = styled.div<IDropdownOptions>`
  max-height: ${(props) => (props.hide ? '0px' : props.dropdownMaxHeight)};
  height: auto;
  width: 100%;

  background: #fff;
  box-shadow: ${(props) => props.theme.boxShadowBase};
  opacity: ${(props) => (props.hide ? 0 : 1)};

  overflow: hidden;

  transition: all 0.2s;

  margin-top: 3px;
  z-index: 100;

  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.primaryColor};
  border-radius: ${(props) => props.theme.borderRadius};

  & > div {
    padding: 4px 0;
    overflow: scroll;
    max-height: ${(props) => props.dropdownMaxHeight};

    display: flex;
    flex-direction: column;
    margin-bottom: 3px;
  }
`

export const OptionWrapperStyles = styled.div<IOptionWrapperStyles>`
  height: max-content;
  width: 100%;
  border-radius: ${(props) => props.theme.borderRadius};

  padding: 8px 15px;

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

export const OptionThumbnail = styled.div`
  height: 48px;
  width: 48px;
  margin-bottom: 5px;
  margin-right: 8px;

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

export const OptionTitle = styled.div`
  font-weight: 400;
  font-size: 14px;
  font-family: ${(props) => props.theme.fontFamily};
`

export const OptionDescription = styled.div`
  color: ${(props) => props.theme.textColor};
  font-weight: 400;
  font-size: 13px;
  padding-bottom: 5px;
  margin-right: 10px;
  font-family: ${(props) => props.theme.fontFamily};
`

export const OptionPrice = styled.div`
  color: ${(props) => props.theme.textColorSecondary};
  font-weight: 600;
  font-size: 14px;
  text-align: right;
  font-family: ${(props) => props.theme.fontFamily};

  height: max-content;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`

export const IconWrapper = styled.div`
  margin-left: 8px;
  height: 20px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`

export const OptionWrapper = styled(OptionWrapperStyles)`
  background: ${(props) =>
    props.selected ? props.theme.primaryColor : '#fff'};

  ${OptionDescription} {
    color: ${(props) => (props.selected ? '#fff' : props.theme.textColor)};
  }

  ${OptionTitle} {
    color: ${(props) => (props.selected ? '#fff' : props.theme.textColor)};
  }
  ${OptionPrice} {
    color: ${(props) => (props.selected ? '#fff' : props.theme.textColor)};
  }

  &:hover {
    ${(props) =>
      props.selected ? '' : `background: ${props.theme.primaryColor}18;`}
  }
`
