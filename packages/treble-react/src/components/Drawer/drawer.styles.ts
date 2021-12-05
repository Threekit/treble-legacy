import styled from 'styled-components';

interface IWrapper {
  show: boolean;
  transitionDuration: string;
}

export const Background = styled.div<IWrapper>`
  height: 100vh;
  width: 100vw;
  background: #33333377;

  opacity: ${props => (props.show ? 1 : 0)};
  transition: all ${props => props.transitionDuration};

  position: fixed;
  top: 0;
  left: 0;
`;

export const Wrapper = styled.div<IWrapper>`
  min-width: 400px;
  height: 100vh;
  background: #fff;
  border-radius: ${props => props.theme.borderRadius};
  opacity: 1;
  z-index: 10;

  transform: translateX(${props => (props.show ? '0%' : '100%')});
  transition: all ${props => props.transitionDuration};

  position: absolute;
  top: 0;
  right: 0;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: ${props => props.theme.fontFamily};
  padding: 20px;

  & > div {
    /* height: max-content;
    position: relative;
    top: 50%;
    transform: translateY(-50%); */
  }

  & > div:nth-child(2) {
    cursor: pointer;
    height: 20px;
  }
`;

export const Content = styled.div`
  font-family: ${props => props.theme.fontFamily};
`;
