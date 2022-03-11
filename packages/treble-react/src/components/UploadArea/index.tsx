import React, { useRef, useState } from 'react';
import { ATTRIBUTE_TYPES } from '../../constants';
import FormComponentTitle from '../FormComponentTitle';
import FormComponentDescription from '../FormComponentDescription';
import { FormComponentWrapper as Wrapper } from '../shared.styles';
import { generateInputClassName as generateClassName } from '../../utils';
import { ImageIcon, SpinnerIcon } from '../../icons';
import container, {
  IFormComponentProps,
  IOptionShared,
} from '../containers/formInputContainer';
import { UploadWrapper, UploadingWrapper } from './uploadArea.styles';

export interface IUpload
  extends Pick<
    IFormComponentProps<IOptionShared>,
    'title' | 'description' | 'className' | 'value'
  > {
  onChange: (file: File) => Promise<void>;
}

export const UploadArea = (props: IUpload) => {
  const {
    title,
    description,
    value,
    onChange,
    className: customClassName,
  } = props;
  const [isUploading, setIsUploading] = useState(false);
  const [filename, setFilename] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const cls = generateClassName('upload', customClassName, title);

  const handleClick = () => {
    if (isUploading) return;
    inputRef.current?.click();
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    await onChange(file);
    setIsUploading(false);
    setFilename(file.name);

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
      <UploadWrapper className={cls}>
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
            <UploadingWrapper>
              <div>
                <SpinnerIcon size="28px" />
              </div>
              <div>Uploading...</div>
            </UploadingWrapper>
          ) : (value as string)?.length ? (
            <UploadingWrapper>
              <div>
                <img ref={imgRef} src="#" />
              </div>
              <div>
                <div>{filename}</div>
                <div>Upload another file.</div>
              </div>
            </UploadingWrapper>
          ) : (
            <div>
              <div>
                <ImageIcon />
              </div>
              <div>Click to upload</div>
              <div>Supported file types: PNG, JPEG, SVG</div>
            </div>
          )}
        </button>
      </UploadWrapper>
    </Wrapper>
  );
};

UploadArea.componentName = 'upload-area';
UploadArea.compatibleAttributes = new Set([ATTRIBUTE_TYPES.asset]);

export default container<IUpload>(UploadArea);
