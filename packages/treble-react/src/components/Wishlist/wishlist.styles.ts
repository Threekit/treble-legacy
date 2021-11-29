import styled from 'styled-components';

export const WishlistWrapper = styled.div`
  max-height: calc(100vh - 60px);
  margin: 0 12px;
  padding: 20px 12px;
  overflow: scroll;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
`;

export const WishlistItemWrapper = styled.div`
  height: min-content;
  padding: 12px 15px;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 0px 4px 16px 0px #00000029;

  cursor: pointer;
`;

export const WishlistThumbnail = styled.div`
  width: 220px;

  img {
    width: 100%;
  }
`;

export const WishlistTitle = styled.div`
  text-align: center;
  margin: 8px 0;
`;

export const WishlistActionArea = styled.div`
  display: grid;
  grid-template-columns: auto max-content max-content;
  grid-gap: 8px;
`;
