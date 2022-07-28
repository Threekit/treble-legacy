import styled from 'styled-components';

export type Positions =
  | 'top-right'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-left';

interface PositionProps {
  position: Positions;
}

export const Wrapper = styled.div`
  height: 40px;
  width: 40px;
  position: relative;
`;

const ShareWrapperStyles = styled.div<PositionProps>`
  position: relative;
`;

export const Content = styled.div`
  padding: 24px 18px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  font-size: 16px;
  width: 290px;

  display: flex;
  flex-direction: row;
  justify-content: center;

  input {
    background: #555555;
    color: #ffffff;
    border: none;
    outline: none;
    padding: 9px;
    border-radius: 4px;
    font-size: 13px;
    text-overflow: ellipsis;
    width: 180px;
  }

  button {
    color: #2a94f5;
    font-size: 13px;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
  }
`;

export const Caret = styled.div`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 8px solid rgba(0, 0, 0, 0.9);

  position: absolute;
`;

export const ShareWrapper = styled(ShareWrapperStyles)`
  top: ${props => (props.position.includes('top') ? '14px' : '-100%')};
  left: ${props => (props.position.includes('right') ? '-250px' : 'auto')};
  transform: ${props =>
    props.position.includes('top')
      ? ''
      : 'translateY(calc(0px - 14px - 100%))'};

  ${Caret} {
    left: ${props => (props.position.includes('right') ? '260px' : '10px')};
    top: ${props => (props.position.includes('top') ? '0' : 'auto')};

    transform: ${props =>
      props.position.includes('top') ? 'translateY(-100%) scaleY(-1)' : ''};
  }
`;
