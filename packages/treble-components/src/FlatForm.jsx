import React from 'react';
import { useConfigurator } from '@threekit-tools/treble';
import FormComponent from './FormComponent';

export const FlatForm = props => {
  const [attributes] = useConfigurator();
  if (!attributes) return null;

  return Object.values(attributes).map(attr => (
    <FormComponent
      attribute={attr.name}
      includeNestedConfigurator={props.includeNestedConfigurator}
    />
  ));
};

export default FlatForm;
