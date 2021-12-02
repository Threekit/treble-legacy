import styled from 'styled-components';

interface IWrapper {
  align?: string;
}

export const Wrapper = styled.div<IWrapper>`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: ${props => props.align || 'left'};
  font-family: ${props => props.theme.fontFamily};
`;
