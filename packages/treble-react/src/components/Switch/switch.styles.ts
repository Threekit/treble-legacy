import styled from 'styled-components';

export const Layer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  width: 100%;
  border-radius: 100px;
  background-color: #bbb;
  transition: 0.3s ease all;
  z-index: 1;
`;

export const Knob = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;

  &:before {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 20px;
    height: 10px;
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    padding: 9px 4px;
    background-color: #fff;
    border-radius: 50%;
    transition: 0.3s ease all, left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
  }
`;

export const Checkbox = styled.input`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
`;

export const SwitchWrapper = styled.div`
  position: relative;
  width: 74px;
  height: 36px;
  overflow: hidden;

  & ${Checkbox}:active + ${Knob}:before {
    width: 46px;
    border-radius: 100px;
  }

  & ${Checkbox}:checked + ${Knob}:before {
    content: '';
    left: 42px;
  }

  & ${Checkbox}:checked:active + ${Knob}:before {
    margin-left: -26px;
  }

  & ${Checkbox}:checked ~ ${Layer} {
    background-color: ${props => props.theme.primaryColor};
  }
`;
