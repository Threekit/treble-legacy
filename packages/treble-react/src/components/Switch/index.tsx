import React from 'react';
import PropTypes from 'prop-types';
import FormComponentTitle from '../FormComponentTitle';
import FormComponentDescription from '../FormComponentDescription';
import { SwitchWrapper, Checkbox, Knob, Layer } from './switch.styles';
import { FormComponentWrapper as Wrapper } from '../shared.styles';
import { generateInputClassName as generateClassName } from '../../utils';
import { ATTRIBUTE_TYPES } from '../../types';
import container, {
  IFormComponentProps,
  IOption,
} from '../containers/formInputContainer';

export interface ISwitch extends IFormComponentProps<IOption> {
  showDescription?: boolean;
}

export const Switch = (props: ISwitch) => {
  const {
    title,
    value,
    onChange,
    description,
    className: customClassName,
    showDescription,
  } = props;

  const cls = generateClassName('Switch', customClassName, title);

  return (
    <Wrapper className={cls}>
      <FormComponentTitle title={title} className={cls} />
      <FormComponentDescription
        description={showDescription ? description : undefined}
        className={cls}
      />
      <SwitchWrapper>
        <Checkbox
          type="checkbox"
          checked={!!value}
          onChange={() => onChange?.(!!!value)}
        />
        <Knob />
        <Layer />
      </SwitchWrapper>
    </Wrapper>
  );
};

Switch.propTypes = {
  /**
   * Is the attribute name on the initialized asset that we are
   * using this component for. If the attribute prop is used,
   * the component will ignore the props for: `value`, `options`, `onClick`.
   */
  attribute: PropTypes.string,
  /**
   * Used to add a title to the input
   */
  title: PropTypes.string,
  /**
   * Used to provide a custom description for the input component
   */
  description: PropTypes.string,
  /**
   * Selected value from the option set. Should match the 'value' property
   * of one of the items in the options array.
   */
  value: PropTypes.bool,
  /**
   * The size of the for a Switch option. The size should be a valid CSS
   * height/width property.
   *
   */
  onClick: PropTypes.func,
  /**
   * Used to add a custom class name to each of the components html elements
   */
  className: PropTypes.string,
  /**
   * By default the description is soruced from the `_description` metadata
   * key in the option's Catalog Item. This metadata key can be overwritten
   * by passing in the prefered key value to the **metadataKeyDescription**
   * prop.
   */
  metadataKeyDescription: PropTypes.string,
  /**
   * A boolean to set whether or all the Cards should display the description
   * for the options.
   */
  showDescription: PropTypes.bool,
};

Switch.defaultProps = {
  description: undefined,
  className: undefined,
  //  Default use
  attribute: undefined,
  //  Default user overrides
  metadataKeyDescription: undefined,
  showDescription: true,
  //  Custom use
  title: undefined,
  value: undefined,
  onClick: undefined,
};

Switch.componentName = 'Switch';
Switch.compatibleAttributes = new Set([ATTRIBUTE_TYPES.BOOLEAN]);

export default container<ISwitch>(Switch);
