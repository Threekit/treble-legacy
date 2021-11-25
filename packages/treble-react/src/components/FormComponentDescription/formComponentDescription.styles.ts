import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-bottom: 12px;
  color: ${(props) => props.theme.textColorSecondary};
  font-size: ${(props) => props.theme.fontBaseSize};
  line-height: 21px;
  font-family: ${(props) => props.theme.fontFamily};
`
