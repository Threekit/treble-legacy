import React from 'react';
// import PropTypes from 'prop-types';
import FormComponentTitle from '../FormComponentTitle';
import FormComponentDescription from '../FormComponentDescription';
import { Input } from './textInput.styles';
import { FormComponentWrapper as Wrapper } from '../shared.styles';
import { generateInputClassName as generateClassName } from '../../utils';
import { ATTRIBUTE_TYPES } from '../../types';
import container, {
  IFormComponentProps,
} from '../containers/formInputContainer';

export interface ITextInput extends IFormComponentProps<undefined> {
  maxLength?: number;
}

export const TextInput = (props: ITextInput) => {
  const {
    title,
    description,
    value,
    onChange,
    maxLength,
    className: customClassName,
  } = props;
  const cls = generateClassName('text-input', customClassName, title);

  if (typeof value !== 'string') return <></>;

  return (
    <Wrapper className={cls}>
      <FormComponentTitle title={title} className={cls} />
      <FormComponentDescription description={description} className={cls} />
      <Input
        type="text"
        maxLength={maxLength}
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        className={cls}
      />
    </Wrapper>
  );
};

TextInput.componentName = 'text-input';
TextInput.compatibleAttributes = new Set([ATTRIBUTE_TYPES.STRING]);

export default container<ITextInput>(TextInput);
