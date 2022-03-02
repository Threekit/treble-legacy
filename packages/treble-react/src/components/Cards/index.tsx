import React from 'react';
import PropTypes from 'prop-types';
import FormComponentTitle from '../FormComponentTitle';
import FormComponentDescription from '../FormComponentDescription';
import { FormComponentWrapper as Wrapper } from '../shared.styles';
import {
  CardsWrapper,
  CardWrapper,
  CardThumbnail,
  CardTitle,
  CardDescription,
  CardPrice,
} from './cards.styles';
import { generateInputClassName as generateClassName } from '../../utils';
import { ATTRIBUTE_TYPES } from '../../constants';
import container, {
  IFormComponentProps,
  IOption,
} from '../containers/formInputContainer';

export interface ICards extends IFormComponentProps<IOption> {
  showThumbnail?: boolean;
  showPrice?: boolean;
  showDescription?: boolean;
}

interface IThumbnail {
  name: string;
  imageUrl?: string;
  color?: string;
  className?: string;
}

interface ITitle {
  name: string;
  className?: string;
}

interface IDescription {
  description?: string;
  className?: string;
}

interface IPrice {
  price?: string;
  className?: string;
}

const Thumbnail = (props: IThumbnail) => {
  const { imageUrl, color, name, className } = props;
  if (!imageUrl && !color) return null;
  return (
    <CardThumbnail className={`${className} option-thumbnail`} color={color}>
      {imageUrl ? <img src={imageUrl} alt={name || ''} /> : <span />}
    </CardThumbnail>
  );
};

const Title = (props: ITitle) => {
  const { name, className } = props;
  if (!name) return null;
  return <CardTitle className={`${className} option-title`}>{name}</CardTitle>;
};

const Description = (props: IDescription) => {
  const { description, className } = props;
  if (!description) return null;
  return (
    <CardDescription className={`${className} option-description`}>
      {description}
    </CardDescription>
  );
};

const Price = (props: IPrice) => {
  const { price, className } = props;
  if (!price) return null;
  return <CardPrice className={`${className} option-price`}>{price}</CardPrice>;
};

export const Cards = (props: ICards) => {
  const {
    title,
    description,
    options,
    className: customClassName,
    showThumbnail,
    showPrice,
    showDescription,
  } = props;

  const cls = generateClassName('cards', customClassName, title);

  return (
    <Wrapper className={cls}>
      <FormComponentTitle title={title} className={cls} />
      <FormComponentDescription description={description} className={cls} />
      <CardsWrapper>
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
            <CardWrapper
              key={i}
              onClick={handleSelect}
              selected={selected}
              className={clsOpt}
            >
              <Thumbnail
                imageUrl={imageUrl}
                color={color}
                name={name}
                className={clsOpt}
              />
              <div>
                <Title name={name} className={clsOpt} />
                <Description description={description} className={clsOpt} />
                <Price price={price} className={clsOpt} />
              </div>
            </CardWrapper>
          );
        })}
      </CardsWrapper>
    </Wrapper>
  );
};

Cards.propTypes = {
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

Cards.defaultProps = {
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

Cards.componentName = 'cards';
Cards.compatibleAttributes = new Set([
  ATTRIBUTE_TYPES.asset,
  ATTRIBUTE_TYPES.string,
]);

export default container<ICards>(Cards);
