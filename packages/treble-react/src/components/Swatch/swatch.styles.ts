import styled from 'styled-components';

interface IOption {
  shape?: string;
}

interface IOptionWrapper extends IOption {
  selected: boolean;
}

export const SwatchWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & > div {
    margin-bottom: 5px;
  }

  & > div:not(:last-child) {
    margin-right: 5px;
  }
`;

export const OptionWrapperStyles = styled.div<IOptionWrapper>`
  height: 60px;
  width: 60px;
  border-radius: ${props =>
    props.shape === 'round' ? '50%' : props.theme.borderRadius};

  & > div:first-child {
    height: 60px;
    width: 60px;
    border-radius: ${props =>
      props.shape === 'round' ? '50%' : props.theme.borderRadius};
    border: 2px solid
      ${props => (props.selected ? props.theme.primaryColor : '#00000000')};

    padding: 2px;

    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      ${props =>
        props.selected
          ? ''
          : `border: 2px solid ${props.theme.primaryColor}55;`}
    }
  }
`;

export const OptionThumbnail = styled.div<IOption>`
  height: 52px;
  width: 52px;
  text-align: center;
  display: block;

  border-radius: ${props =>
    props.shape === 'round' ? '50%' : props.theme.borderRadius};
  overflow: hidden;

  ${props => (props.color ? `background: ${props.color};` : '')}

  img {
    height: 100%;
    width: auto;
    object-fit: cover;
  }
`;

export const SwatchInfoWrapper = styled.div`
  width: max-content;
  position: relative;
  top: -100%;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  padding-bottom: 4px;
  color: white;
  font-family: ${props => props.theme.fontFamily};

  display: none;

  & > div:nth-child(1) {
    background: rgba(0, 0, 0, 0.6);
    padding: 4px 6px;
    border-radius: ${props => props.theme.borderRadius};
    max-width: 250px;
  }

  & > div:nth-child(2) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    & > div {
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;

      border-top: 8px solid rgba(0, 0, 0, 0.6);

      overflow: hidden;
      pointer-events: none;
    }
  }
`;

export const OptionWrapper = styled(OptionWrapperStyles)`
  &:hover {
    ${SwatchInfoWrapper} {
      display: block;
    }
  }
`;
