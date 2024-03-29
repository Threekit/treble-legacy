import React from 'react';
import PropTypes from 'prop-types';
import FormComponentTitle from '../FormComponentTitle';
import FormComponentDescription from '../FormComponentDescription';
import { TilesGroupWrapper, TileWrapper } from './tilesGroup.styles';
import { FormComponentWrapper as Wrapper } from '../shared.styles';
import { generateInputClassName as generateClassName } from '../../utils';
import { ATTRIBUTE_TYPES } from '../../types';
import container, {
  IFormComponentProps,
  IOptionShared,
} from '../containers/formInputContainer';

export interface ITilesGroup extends IFormComponentProps<IOptionShared> {
  columns?: number;
}

export const TilesGroup = (props: ITilesGroup) => {
  const {
    stretch,
    title,
    description,
    options,
    className: customClassName,
  } = Object.assign({ stretch: true }, props);

  const cls = generateClassName('tiles-group', customClassName, title);

  return (
    <Wrapper className={cls}>
      <FormComponentTitle title={title} className={cls} />
      <FormComponentDescription description={description} className={cls} />
      <TilesGroupWrapper stretch={stretch}>
        {options?.map((el, i) => {
          const { name, value: optionValue, selected, handleSelect } = el;
          const clsOpt = `${cls}-option option-${i} ${optionValue}${
            selected ? ' selected' : ''
          }`;
          return (
            <TileWrapper
              key={i}
              onClick={handleSelect}
              selected={selected}
              className={clsOpt}
            >
              <div>{name}</div>
            </TileWrapper>
          );
        })}
      </TilesGroupWrapper>
    </Wrapper>
  );
};

TilesGroup.propTypes = {
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
  value: PropTypes.string,
  /**
   * Handles the user seletion by passing the value of the selected
   * option as the argument into the onClick callback.
   */
  onClick: PropTypes.func,
  /**
   * The options set to be displayed for the user
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      value: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ),
  /**
   * Used to add a custom class name to each of the components html elements
   */
  className: PropTypes.string,
};

TilesGroup.defaultProps = {
  description: undefined,
  className: undefined,
  //  Default use
  attribute: undefined,
  //  Custom use
  title: undefined,
  value: undefined,
  options: undefined,
  onClick: undefined,
};

TilesGroup.componentName = 'tiles-group';
TilesGroup.compatibleAttributes = new Set([
  ATTRIBUTE_TYPES.ASSET,
  ATTRIBUTE_TYPES.STRING,
]);

export default container<ITilesGroup>(TilesGroup);
