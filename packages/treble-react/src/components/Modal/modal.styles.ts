import styled from 'styled-components';

export const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background: #33333377;

  position: fixed;
  top: 0;
  left: 0;
`;

export const Wrapper = styled.div`
  min-width: 400px;
  max-width: 100%;
  min-height: 200px;
  opacity: 1;
  overflow: scroll;
  background: #fff;
  border-radius: ${props => props.theme.borderRadius};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: ${props => props.theme.fontFamily};

  & > div:nth-child(2) {
    cursor: pointer;
  }
`;

export const Content = styled.div`
  font-family: ${props => props.theme.fontFamily};
`;
