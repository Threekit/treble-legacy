import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormComponentTitle from '../FormComponentTitle';
import FormComponentDescription from '../FormComponentDescription';
import {
  DropdownWrapper,
  DropdownMain,
  DropdownOptions,
  OptionWrapper,
  OptionThumbnail,
  OptionTitle,
  OptionDescription,
  OptionPrice,
  IconWrapper,
} from './dropdown.styles';
import { CaretDownIcon } from '../../icons';
import { generateInputClassName as generateClassName } from '../../utils';
import { ATTRIBUTE_TYPES } from '../../constants';
import container, {
  IFormComponentProps,
  IOption,
} from '../containers/formInputContainer';

export interface IDropdown extends IFormComponentProps<IOption> {
  showThumbnail?: boolean;
  showPrice?: boolean;
  showDescription?: boolean;
  dropdownMaxHeight?: string;
}

interface IThumbnail {
  name?: string;
  imageUrl?: string;
  color?: string;
  className?: string;
}

interface ITitle {
  name?: string;
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
  if (!imageUrl && !color) return <div />;
  return (
    <OptionThumbnail className={`${className} option-thumbnail`} color={color}>
      {imageUrl ? <img src={imageUrl} alt={name || ''} /> : null}
    </OptionThumbnail>
  );
};

const Title = ({ name, className }: ITitle) => {
  if (!name) return null;
  return (
    <OptionTitle className={`${className} option-title`}>{name}</OptionTitle>
  );
};

const Description = (props: IDescription) => {
  const { description, className } = props;
  if (!description) return null;
  return (
    <OptionDescription className={`${className} option-description`}>
      {description}
    </OptionDescription>
  );
};

const Price = (props: IPrice) => {
  const { price, className } = props;
  if (!price) return <div />;
  return (
    <OptionPrice className={`${className} option-price`}>{price}</OptionPrice>
  );
};

export const Dropdown = (props: IDropdown) => {
  const {
    title,
    description,
    options,
    value,
    onClick,
    className: customClassName,
    showThumbnail,
    showPrice,
    showDescription,
    dropdownMaxHeight,
  } = props;

  const [hide, setHide] = useState(true);
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (!e) return;
      if (!ref.current?.contains(e.target as Node)) setHide(true);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hide, ref]);

  const handleClick = (value: string) => {
    if (!onClick) return;
    onClick(value);
    setHide(true);
  };

  const cls = generateClassName('dropdown', customClassName, title);

  const selectedOpt = options?.find(el => el.value === value);

  return (
    <div className={cls}>
      <FormComponentTitle title={title} className={cls} />
      <FormComponentDescription description={description} className={cls} />
      <DropdownWrapper
        // active={!hide}
        ref={ref}
        className={`${cls} dropdown`}
      >
        <DropdownMain
          active={!hide}
          className={`${cls} selected`}
          onClick={() => setHide(!hide)}
          hasPlaceholder={!value}
        >
          <Thumbnail
            imageUrl={selectedOpt?.imageUrl}
            color={selectedOpt?.color}
            name={selectedOpt?.name}
            className={`${cls} selected`}
          />
          <div>
            <Title name={selectedOpt?.name} />
            <Description
              description={selectedOpt?.description}
              className={`${cls} selected`}
            />
          </div>
          <Price price={selectedOpt?.price} className={cls} />
          <IconWrapper>
            <CaretDownIcon />
          </IconWrapper>
        </DropdownMain>
        <DropdownOptions hide={hide} dropdownMaxHeight={dropdownMaxHeight}>
          <div>
            {options?.map((el, i) => {
              const { imageUrl, color, name, description, price, optionValue } =
                Object.assign({}, el, {
                  optionValue: el.value,
                  color: !showThumbnail ? undefined : el.color,
                  imageUrl: !showThumbnail ? undefined : el.imageUrl,
                  price: !showPrice ? undefined : el.price,
                  description: !showDescription ? undefined : el.description,
                });
              const selected = value === optionValue;
              const clsOpt = `${cls}-option option-${i} ${optionValue}`;
              return (
                <OptionWrapper
                  key={i}
                  onClick={() => handleClick(optionValue)}
                  className={clsOpt}
                  selected={selected}
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
                  </div>
                  <Price price={price} className={clsOpt} />
                </OptionWrapper>
              );
            })}
          </div>
        </DropdownOptions>
      </DropdownWrapper>
    </div>
  );
};

Dropdown.propTypes = {
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
   * for the options.
   */
  showPrice: PropTypes.bool,
  /**
   * The maximum height the dropdown area should extend to before scrolling
   * is introduced
   */
  dropdownMaxHeight: PropTypes.string,
};

Dropdown.defaultProps = {
  description: undefined,
  className: undefined,
  //  Default use
  attribute: undefined,
  //  Default user overrides
  metadataKeyThumbnail: '_thumbnail',
  metadataKeyDescription: undefined,
  metadataKeyPrice: undefined,
  showThumbnail: true,
  showPrice: true,
  showDescription: true,
  //  Custom use
  value: undefined,
  options: undefined,
  onClick: undefined,
  dropdownMaxHeight: '220px',
};

Dropdown.componentName = 'dropdown';
Dropdown.compatibleAttributes = new Set([
  ATTRIBUTE_TYPES.asset,
  ATTRIBUTE_TYPES.string,
]);

export default container<IDropdown>(Dropdown);
