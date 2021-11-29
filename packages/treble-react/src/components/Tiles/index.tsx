import React from 'react';
import PropTypes from 'prop-types';
import FormComponentTitle from '../FormComponentTitle';
import FormComponentDescription from '../FormComponentDescription';
import { TilesWrapper, TileWrapper } from './tiles.styles';
import { FormComponentWrapper as Wrapper } from '../shared.styles';
import { generateInputClassName as generateClassName } from '../../utils';
import { ATTRIBUTE_TYPES } from '../../constants';
import container, {
  IFormComponentProps,
  IOptionShared,
} from '../containers/formInputContainer';

export interface ITiles extends IFormComponentProps<IOptionShared> {
  columns?: number;
}

export const Tiles = (props: ITiles) => {
  const {
    title,
    description,
    options,
    value,
    onClick,
    className: customClassName,
    columns,
  } = Object.assign({ columns: 2 }, props);

  const cls = generateClassName('tiles', customClassName, title);

  return (
    <Wrapper className={cls}>
      <FormComponentTitle title={title} className={cls} />
      <FormComponentDescription description={description} className={cls} />
      <TilesWrapper columns={columns}>
        {options?.map((el, i) => {
          const { name, value: optionValue } = el;
          const selected = value === optionValue;
          const clsOpt = `${cls}-option option-${i} ${optionValue}${
            selected ? ' selected' : ''
          }`;
          return (
            <TileWrapper
              key={i}
              onClick={() => onClick && onClick(optionValue)}
              selected={selected}
              className={clsOpt}
            >
              <div>{name}</div>
            </TileWrapper>
          );
        })}
      </TilesWrapper>
    </Wrapper>
  );
};

Tiles.propTypes = {
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
  /**
   * Defines how many columns to organize the tiles into.
   */
  columns: PropTypes.number,
};

Tiles.defaultProps = {
  description: undefined,
  className: undefined,
  columns: 2,
  //  Default use
  attribute: undefined,
  //  Custom use
  title: undefined,
  value: undefined,
  options: undefined,
  onClick: undefined,
};

Tiles.componentName = 'tiles';
Tiles.compatibleAttributes = new Set([
  ATTRIBUTE_TYPES.asset,
  ATTRIBUTE_TYPES.string,
]);

export default container<ITiles>(Tiles);
