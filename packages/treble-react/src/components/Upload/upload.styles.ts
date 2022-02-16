import styled from 'styled-components';

interface IUploadWrapper {
  fullWidth?: boolean;
  iconOnly?: boolean;
}

export const UploadWrapper = styled.span<IUploadWrapper>`
  position: relative;
  overflow: hidden;
  display: inline-block;

  & button {
    height: 40px;
    width: ${props =>
      props.fullWidth ? '100%' : props.iconOnly ? '40px' : 'max-content'};
    padding: ${props => (props.iconOnly ? '0px' : '10px 16px')};
    overflow: hidden;
    font-family: ${props => props.theme.fontFamily};
    font-size: ${props => props.theme.fontBaseSize};
    color: ${props => props.theme.textColor};
    background: white;
    cursor: pointer;
    border-radius: ${props => props.theme.borderRadius || '2px'};
    border: 1px solid ${props => props.theme.textColor};
    transition: all 0.16s ease-in-out;
  }

  & button:hover {
    border: 1px solid ${props => props.theme.primaryColor};
    color: ${props => props.theme.primaryColor};
  }

  & input[type='file'] {
    display: none;
  }
`;
