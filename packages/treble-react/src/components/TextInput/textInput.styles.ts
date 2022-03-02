import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  margin: 0;
  padding: 8px 7px;
  background: #fff;
  border: 1px solid #d9d9d9;
  color: ${props => props.theme.textColor};
  outline: none;
  border-radius: 2px;
  font-size: 14px;
  transition: all 0.3s;
  font-family: ${props => props.theme.fontFamily};

  &:hover {
    border-color: ${props => props.theme.primaryColor};
  }

  &:focus {
    border-color: ${props => props.theme.primaryColor};
    box-shadow: 0 0 0 2px ${props => `${props.theme.primaryColor}33`};
  }
`;
