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
    min-height: 40px;
    height: max-content;
    width: ${props =>
      props.fullWidth ? '100%' : props.iconOnly ? '40px' : 'max-content'};
    padding: ${props => (props.iconOnly ? '0px' : '10px 16px')};
    overflow: hidden;
    font-family: ${props => props.theme.fontFamily};
    font-size: ${props => props.theme.fontBaseSize};
    color: ${props => props.theme.textColor};
    text-align: center;
    background: white;
    cursor: pointer;
    border-radius: ${props => props.theme.borderRadius || '2px'};
    border: 1px solid ${props => props.theme.borderColorBase};
    transition: all 0.16s ease-in-out;
  }

  .tk-icon {
    transition: all 0.16s ease-in-out;
  }

  & button:hover {
    border: 1px solid ${props => props.theme.primaryColor};
    color: ${props => props.theme.primaryColor};

    .tk-icon {
      stroke: ${props => props.theme.primaryColor};
    }
  }

  & input[type='file'] {
    display: none;
  }
`;

export const UploadingWrapper = styled.div`
  display: grid;
  grid-template-columns: max-content max-content;
  grid-gap: 8px;

  & > div {
    height: max-content;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  img {
    height: 72px;
  }
`;
