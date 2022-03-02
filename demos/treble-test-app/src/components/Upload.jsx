import { useRef, useState } from 'react';
import {
  useAttribute,
  SpinnerIcon,
  AddIcon,
  DeleteIcon,
} from '@threekit-tools/treble';

export default function Upload(props) {
  const [attribute, setAttribute] = useAttribute(props.attribute);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef(null);
  const imgRef = useRef(null);

  const handleUpload = async file => {
    setIsUploading(true);
    await setAttribute(file);
    setIsUploading(false);

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (!imgRef.current) return;
      imgRef.current.src = reader.result;
    };

    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    if (isUploading) return;
    if (attribute?.value.assetId?.length) return;
    inputRef.current?.click();
  };

  if (!attribute) return <></>;
  return (
    <div className="mb-5">
      <h3 className="text-xl mb-4">{attribute?.label}</h3>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={async e => {
          if (!e.target.files?.[0] || !handleUpload) return;
          handleUpload(e.target.files[0]);
        }}
      />
      <button
        type="button"
        onClick={handleClick}
        className={`h-28 w-28 rounded-sm text-base border-dashed hover:border-blue-500 hover:text-blue-500 text-gray-500 bg-white border-gray-300${
          !isUploading && !attribute?.value.assetId?.length
            ? ' cursor-pointer'
            : ''
        }`}
      >
        {isUploading ? (
          <div>
            <SpinnerIcon size="22px" thickness="3px" />
            <div>Uploading...</div>
          </div>
        ) : attribute?.value.assetId.length ? (
          <div className="relative h-full w-full">
            <div className="absolute top-0 left-0 h-full w-full">
              <img src="#" ref={imgRef} className="h-full w-full" />
            </div>
            <div className="absolute top-0 left-0 flex flex-col justify-center h-full w-full cursor-auto bg-gray-200/[0.7] opacity-0 hover:opacity-100 duration-300">
              <div
                className="h-max w-max mx-auto cursor-pointer"
                onClick={e => {
                  handleUpload(undefined);
                  e.stopPropagation();
                }}
              >
                <DeleteIcon />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div>
              <div>
                <AddIcon />
                <div>Upload</div>
              </div>
            </div>
          </>
        )}
      </button>
    </div>
  );
}
