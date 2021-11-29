import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './attributeValue.styles';
import useAttribute from '../../hooks/useAttribute';
import { ATTRIBUTE_TYPES } from '../../constants';
import { IDisplayAttributeAsset } from '../../threekit';
import { generateDisplayClassName as generateClassName } from '../../utils';

interface IAttributeValue {
  attribute?: string;
  className?: string;
}

export const AttributeValue = (props: IAttributeValue) => {
  const { attribute, className: customClassName } = props;

  const [attributeData] = useAttribute(props.attribute);
  if (!attributeData) return null;

  let value;

  if (attributeData.type === ATTRIBUTE_TYPES.asset) {
    let assetAttribute = attributeData as IDisplayAttributeAsset;
    if (!assetAttribute.value?.assetId) return null;
    value = assetAttribute.values.find(
      el => el.assetId === assetAttribute.value.assetId
    )?.name;
  } else value = attributeData.value;

  if (!attribute) return null;
  const cls = generateClassName('attr-value', customClassName);

  return <Wrapper className={cls}>{value}</Wrapper>;
};

AttributeValue.propTypes = {
  /**
   * The attribute's title/label displayed to the user
   */
  attribute: PropTypes.string,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */
  className: PropTypes.string,
};

AttributeValue.defaultProps = {
  attribute: undefined,
  className: '',
};

export default AttributeValue;
