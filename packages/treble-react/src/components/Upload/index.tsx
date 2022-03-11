import React, { useRef, useState } from 'react';
import { ATTRIBUTE_TYPES } from '../../constants';
import FormComponentTitle from '../FormComponentTitle';
import FormComponentDescription from '../FormComponentDescription';
import { FormComponentWrapper as Wrapper } from '../shared.styles';
import { generateInputClassName as generateClassName } from '../../utils';
import { SpinnerIcon, AddIcon, DeleteIcon } from '../../icons';
import container, {
  IFormComponentProps,
  IOptionShared,
} from '../containers/formInputContainer';
import {
  UploadWrapper,
  IconWrapper,
  ImageWrapper,
  ImageActionArea,
} from './upload.styles';

export interface IUpload
  extends Pick<
    IFormComponentProps<IOptionShared>,
    'title' | 'description' | 'className' | 'value'
  > {
  onChange: (file: File | undefined) => Promise<void>;
}

export const Upload = (props: IUpload) => {
  const {
    title,
    description,
    value,
    onChange,
    className: customClassName,
  } = props;
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const cls = generateClassName('upload', customClassName, title);

  const handleClick = () => {
    if (isUploading) return;
    if (typeof value === 'string' && value?.length) return;
    inputRef.current?.click();
  };

  const handleUpload = async (file: File | undefined) => {
    setIsUploading(true);
    await onChange(file);
    setIsUploading(false);

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (!imgRef.current) return;
      // @ts-ignore
      imgRef.current.src = reader.result;
    };

    reader.readAsDataURL(file);
  };

  return (
    <Wrapper>
      <FormComponentTitle title={title} className={cls} />
      <FormComponentDescription description={description} className={cls} />
      <UploadWrapper
        className={cls}
        uploaded={!!(!isUploading && (value as string)?.length)}
      >
        <input
          type="file"
          ref={inputRef}
          onChange={async e => {
            if (!e.target.files?.[0] || !onChange) return;
            handleUpload(e.target.files[0]);
          }}
        />
        <button type="button" onClick={handleClick}>
          {isUploading ? (
            <>
              <IconWrapper>
                <SpinnerIcon size="28px" />
              </IconWrapper>
              <div>Uploading...</div>
            </>
          ) : (value as string)?.length ? (
            <ImageWrapper>
              <div>
                <img ref={imgRef} src="#" />
              </div>
              <ImageActionArea>
                <div
                  onClick={e => {
                    handleUpload(undefined);
                    e.stopPropagation();
                  }}
                >
                  <DeleteIcon />
                </div>
              </ImageActionArea>
            </ImageWrapper>
          ) : (
            <>
              <IconWrapper>
                <AddIcon />
              </IconWrapper>
              <div>Upload</div>
            </>
          )}
        </button>
      </UploadWrapper>
    </Wrapper>
  );
};

Upload.componentName = 'upload';
Upload.compatibleAttributes = new Set([ATTRIBUTE_TYPES.asset]);

export default container<IUpload>(Upload);
