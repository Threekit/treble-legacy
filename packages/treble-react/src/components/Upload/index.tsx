import React, { createRef, useState } from 'react';
import { UploadWrapper } from './upload.styles';
import { ATTRIBUTE_TYPES } from '../../constants';
import FormComponentTitle from '../FormComponentTitle';
import FormComponentDescription from '../FormComponentDescription';
import { FormComponentWrapper as Wrapper } from '../shared.styles';
import { generateInputClassName as generateClassName } from '../../utils';
import container, {
  IFormComponentProps,
  IOptionShared,
} from '../containers/formInputContainer';

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
  const [uploading, setUploading] = useState(false);
  const inputRef = createRef<HTMLInputElement>();

  const cls = generateClassName('upload', customClassName, title);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    await onChange(file);
    setUploading(false);
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
          {value?.length
            ? 'Uploaded'
            : uploading
            ? 'Uploading...'
            : 'Upload a file'}
        </button>
      </UploadWrapper>
    </Wrapper>
  );
};

Upload.componentName = 'upload';
Upload.compatibleAttributes = new Set([ATTRIBUTE_TYPES.asset]);

export default container<IUpload>(Upload);
