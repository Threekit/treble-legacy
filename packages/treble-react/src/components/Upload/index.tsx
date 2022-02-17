import React, { createRef, useState } from 'react';
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
import { UploadWrapper, UploadingWrapper } from './upload.styles';

export interface IUpload
  extends Pick<
    IFormComponentProps<IOptionShared>,
    'title' | 'description' | 'className' | 'value'
  > {
  onChange: (file: File) => Promise<void>;
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
  const [filename, setFilename] = useState<string | undefined>(undefined);
  const inputRef = createRef<HTMLInputElement>();

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
      const imgEl = document.getElementById('trbl-upload-img');
      if (!imgEl) return;
      // @ts-ignore
      imgEl.src = reader.result;
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
          ) : value?.length ? (
            <UploadingWrapper>
              <div>
                <img src="#" id="trbl-upload-img" />
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

Upload.componentName = 'upload';
Upload.compatibleAttributes = new Set([ATTRIBUTE_TYPES.asset]);

export default container<IUpload>(Upload);
