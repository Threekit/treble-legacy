import React from 'react';
import { useAttribute } from '@threekit-tools/treble';

export default function TextArea(props) {
  const [attribute, setAttribute] = useAttribute(props.attribute);
  if (!attribute) return <></>;
  return (
    <div>
      <h3 className="text-xl mb-4">{attribute?.label}</h3>
      <textarea
        type="text"
        rows={props.rows || 5}
        maxLength={props.maxLength}
        value={attribute.value}
        onChange={e => setAttribute?.(e.target.value)}
        className="w-full px-2 py-2 rounded-sm bg-white outline-0 border border-solid border-gray-400 hover:border-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
