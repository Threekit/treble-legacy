import styled from 'styled-components';

interface IUploadWrapper {
  fullWidth?: boolean;
  uploaded: boolean;
}

const SIZE = '110px';
const PADDING = '6px';

export const UploadWrapper = styled.span<IUploadWrapper>`
  position: relative;
  overflow: hidden;
  display: inline-block;

  & button {
    height: ${SIZE};
    width: ${props => (props.fullWidth ? '100%' : SIZE)};
    /* padding: 6px; */
    overflow: hidden;
    font-family: ${props => props.theme.fontFamily};
    font-size: ${props => props.theme.fontBaseSize};
    color: ${props => props.theme.textColor};
    text-align: center;
    background: white;
    cursor: ${props => (props.uploaded ? 'default' : 'pointer')};
    border-radius: ${props => props.theme.borderRadius || '2px'};
    border: 1px
      ${props =>
        `${props.uploaded ? 'solid' : 'dashed'} ${
          props.theme.borderColorBase
        }`};
    transition: all 0.16s ease-in-out;

    img {
      height: 100%;
      width: 100%;
    }
  }

  .tk-icon {
    transition: all 0.16s ease-in-out;
  }

  & button:hover {
    border-color: ${props => props.theme.primaryColor};
    color: ${props => props.theme.primaryColor};

    .tk-icon {
      ${props => (props.uploaded ? '' : `stroke: ${props.theme.primaryColor}`)};
    }
  }

  & input[type='file'] {
    display: none;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;

  & > div {
    height: calc(${SIZE} - (2 * (${PADDING} + 1px)));
    width: calc(${SIZE} - (2 * (${PADDING} + 1px)));
  }
`;

export const ImageActionArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: calc(${SIZE} - (2 * (${PADDING} + 1px)));
  width: calc(${SIZE} - (2 * (${PADDING} + 1px)));

  transition: all 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.6);

    & > div {
      opacity: 1;
    }
  }

  & > div {
    opacity: 0;
    cursor: pointer;
  }

  & > div:hover {
    .tk-icon {
      stroke: ${props => props.theme.primaryColor};
    }
  }

  .tk-icon {
    stroke: white;
  }

  & > div {
    height: max-content;
    width: max-content;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const IconWrapper = styled.div`
  margin-bottom: 12px;
`;
