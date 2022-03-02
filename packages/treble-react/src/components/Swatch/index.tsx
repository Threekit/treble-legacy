import React from 'react';
import PropTypes from 'prop-types';
import FormComponentTitle from '../FormComponentTitle';
import FormComponentDescription from '../FormComponentDescription';
import {
  SwatchWrapper,
  OptionWrapper,
  OptionThumbnail,
  SwatchInfoWrapper,
} from './swatch.styles';
import { FormComponentWrapper as Wrapper } from '../shared.styles';
import { generateInputClassName as generateClassName } from '../../utils';
import { ATTRIBUTE_TYPES } from '../../constants';
import container, {
  IFormComponentProps,
  IOption,
} from '../containers/formInputContainer';

export interface ISwatch extends IFormComponentProps<IOption> {
  showThumbnail?: boolean;
  showPrice?: boolean;
  showDescription?: boolean;
  size?: string;
}

interface IThumbnail {
  name?: string;
  imageUrl?: string;
  color?: string;
  shape?: string;
  className?: string;
  size: string;
}

interface ISwatchInfo {
  title: string;
  description?: string;
  price?: string;
  className?: string;
}

const SwatchInfo = (props: ISwatchInfo) => {
  const { title, price, description } = props;
  return (
    <SwatchInfoWrapper>
      <div>
        <div>{title}</div>
        <div>{price}</div>
        <div>{description}</div>
      </div>
      <div>
        <div />
      </div>
    </SwatchInfoWrapper>
  );
};

const Thumbnail = (props: IThumbnail) => {
  const { imageUrl, color, name, shape, size, className } = props;
  if (!imageUrl && !color) return <div />;
  return (
    <OptionThumbnail
      className={`${className} option-thumbnail`}
      color={color}
      shape={shape}
      size={size}
    >
      {imageUrl ? <img src={imageUrl} alt={name || ''} /> : <span />}
    </OptionThumbnail>
  );
};

export const Swatch = (props: ISwatch) => {
  const {
    title,
    shape,
    description,
    options,
    className: customClassName,
    showThumbnail,
    showPrice,
    showDescription,
    size,
  } = Object.assign({ shape: 'round', size: '60px' }, props);

  const cls = generateClassName('swatch', customClassName, title);

  return (
    <Wrapper className={cls}>
      <FormComponentTitle title={title} className={cls} />
      <FormComponentDescription description={description} className={cls} />
      <SwatchWrapper>
        {options?.map((el, i) => {
          const {
            imageUrl,
            color,
            name,
            description,
            price,
            optionValue,
            selected,
            handleSelect,
          } = Object.assign({}, el, {
            optionValue: el.value,
            color: !showThumbnail ? undefined : el.color,
            imageUrl: !showThumbnail ? undefined : el.imageUrl,
            price: !showPrice ? undefined : el.price,
            description: !showDescription ? undefined : el.description,
          });
          const clsOpt = `${cls}-option option-${i} ${optionValue}${
            selected ? ' selected' : ''
          }`;
          return (
            <OptionWrapper
              key={i}
              onClick={handleSelect}
              selected={selected}
              className={clsOpt}
              shape={shape}
              size={size}
            >
              <div>
                <Thumbnail
                  imageUrl={imageUrl}
                  color={color}
                  shape={shape}
                  className={clsOpt}
                  size={size}
                />
              </div>
              <SwatchInfo
                title={name}
                price={price}
                description={description}
              />
            </OptionWrapper>
          );
        })}
      </SwatchWrapper>
    </Wrapper>
  );
};

Swatch.propTypes = {
  /**
   * Is the attribute name on the initialized asset that we are
   * using this component for. If the attribute prop is used,
   * the component will ignore the props for: `value`, `options`, `onClick`.
   */
  attribute: PropTypes.string,
  /**
   * Used to set the shape of the Swatch Option component. Options
   * include: `square`, `round`
   */
  shape: PropTypes.string,
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
  size: PropTypes.string,
  /**
   * The size of the for a swatch option. The size should be a valid CSS
   * height/width property.
   *
   */
  onClick: PropTypes.func,
  /**
   * The options set to be displayed for the user
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.string,
      value: PropTypes.string,
      imageUrl: PropTypes.string,
      color: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ),
  /**
   * Used to add a custom class name to each of the components html elements
   */
  className: PropTypes.string,
  /**
   * By default the thumbnail (image/color value) is soruced from the `_thumbnail`
   * metadata key in the option's Catalog Item. This metadata key can be overwritten
   * by passing in the prefered key value to the **thumbnailFromMetadata** prop.
   */
  metadataKeyThumbnail: PropTypes.string,
  /**
   * By default the description is soruced from the `_description` metadata
   * key in the option's Catalog Item. This metadata key can be overwritten
   * by passing in the prefered key value to the **metadataKeyDescription**
   * prop.
   */
  metadataKeyDescription: PropTypes.string,
  /**
   * By default the price of an item is soruced from the pricebook entry for
   * the option's Catalog Item. The price can alternatively be soruced from
   * the option's Catalog Item metadata, by specifying the key under which the
   * price can be found as the **metadataKeyPrice** prop.
   */
  metadataKeyPrice: PropTypes.string,
  /**
   * A boolean to set whether or all the Cards should display thumbnails
   * for the options.
   */
  showThumbnail: PropTypes.bool,
  /**
   * A boolean to set whether or all the Cards should display the description
   * for the options.
   */
  showDescription: PropTypes.bool,
  /**
   * A boolean to set whether or all the Cards should display the price
   * for the options/
   */
  showPrice: PropTypes.bool,
};

Swatch.defaultProps = {
  shape: 'round',
  description: undefined,
  className: undefined,
  //  Default use
  attribute: undefined,
  //  Default user overrides
  metadataKeyThumbnail: undefined,
  metadataKeyDescription: undefined,
  metadataKeyPrice: undefined,
  showThumbnail: true,
  showPrice: true,
  showDescription: true,
  //  Custom use
  title: undefined,
  value: undefined,
  options: undefined,
  onClick: undefined,
};

Swatch.componentName = 'swatch';
Swatch.compatibleAttributes = new Set([
  ATTRIBUTE_TYPES.asset,
  ATTRIBUTE_TYPES.string,
]);

export default container<ISwatch>(Swatch);
