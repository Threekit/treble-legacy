import styled from 'styled-components'

export const Wrapper = styled.div`
  background: #fff;
  height: 32px;
  padding: 0px 12px;
  box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05),
    0px 6px 16px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  margin-top: 12px;

  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.fontBaseSize};
  color: ${(props) => props.theme.textColor};

  display: flex;
  flex-direction: row;

  user-select: none;

  & > div:nth-child(2) {
    height: max-content;
  }

  & > div {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`

export const IconWrapper = styled.div`
  height: 20px;
  width: 20px;
  margin-right: 6px;
  overflow: hidden;

  .tk-icon {
    stroke: ${(props) => props.theme.primaryColor} !important;
  }
`
