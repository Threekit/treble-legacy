import styled from 'styled-components';

interface ICardWrapperStyles {
  selected: boolean;
}

export const CardsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  transition: all 0.2s;

  & > div {
    margin-bottom: 5px;
  }

  & > div:not(:last-child) {
    margin-right: 5px;
  }
`;

export const CardWrapperStyles = styled.div<ICardWrapperStyles>`
  /* min-height: 234px; */
  width: 170px;
  border-radius: ${props => props.theme.borderRadius};
  border: 1px solid lightgrey;

  background: #fff;

  padding: 14px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  cursor: pointer;
`;

export const CardThumbnail = styled.div`
  height: 120px;
  width: 100%;
  margin-bottom: 5px;
  text-align: center;
  display: block;

  ${props => (props.color ? `background: ${props.color};` : '')}

  img {
    height: 120px;
    width: auto;
    object-fit: cover;
  }
`;

export const CardTitle = styled.div`
  color: ${props => props.theme.textColor};
  font-weight: 400;
  font-size: 14px;
  font-family: ${props => props.theme.fontFamily};
  line-height: 20px;
  text-align: center;
  transition: all 0.2s;
`;

export const CardDescription = styled.div`
  color: ${props => props.theme.textColorSecondary};
  font-weight: 400;
  font-size: 13px;
  font-family: ${props => props.theme.fontFamily};
  line-height: 20px;
  text-align: center;
  padding-bottom: 5px;
  transition: all 0.2s;
`;

export const CardPrice = styled.div`
  color: ${props => props.theme.textColorSecondary};
  font-weight: 600;
  font-size: 14px;
  font-family: ${props => props.theme.fontFamily};
  line-height: 20px;
  text-align: center;
  transition: all 0.2s;
`;

export const CardWrapper = styled(CardWrapperStyles)`
  border: 1px solid
    ${props => (props.selected ? props.theme.primaryColor : 'lightgrey')};

  background: ${props =>
    props.selected ? `${props.theme.primaryColor}18` : '#fff'};

  ${CardTitle} {
    color: ${props =>
      props.selected ? props.theme.primaryColor : props.theme.textColor};
  }

  ${CardDescription} {
    color: ${props =>
      props.selected
        ? props.theme.primaryColor
        : props.theme.textColorSecondary};
  }
  ${CardPrice} {
    color: ${props =>
      props.selected
        ? props.theme.primaryColor
        : props.theme.textColorSecondary};
  }

  &:hover {
    background: ${props => `${props.theme.primaryColor}18`};
  }
`;
