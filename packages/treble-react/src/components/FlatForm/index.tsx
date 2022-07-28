import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './flatForm.styles';
import ProductName from '../ProductName';
import ProductDescription from '../ProductDescription';
import formComponents, { FORM_COMPONENT_TYPES } from '../formComponents';
import {
  generateFormClassName as generateClassName,
  filterFormAttributes,
} from '../../utils';
import useConfigurator from '../../hooks/useConfigurator';
import {
  IDisplayAttributeAsset,
  ATTRIBUTE_TYPES,
  ASSET_TYPES,
} from '../../types';

interface FlatFormProps {
  title?: string;
  hideTitle?: boolean;
  alignTitle?: string;
  description?: string;
  hideDescription?: boolean;
  className?: string;
  includeReservedAttributes: boolean;
  // attributes:
}

export const FlatForm = (props: FlatFormProps) => {
  const {
    title,
    hideTitle,
    alignTitle,
    description,
    hideDescription,
    attributes,
    className: customClassName,
    includeReservedAttributes,
  } = Object.assign(
    {
      alignTitle: 'center',
      attributes: {},
      hideTitle: false,
      hideDescription: false,
      includeReservedAttributes: false,
    },
    props
  );
  const [attributesData] = useConfigurator();
  if (!attributesData) return null;

  const filterAttributes = filterFormAttributes(
    attributesData,
    attributes,
    includeReservedAttributes
  );

  const cls = generateClassName('flat-form', customClassName, title);

  return (
    <Wrapper className={cls}>
      {hideTitle ? null : (
        <ProductName
          align={alignTitle}
          title={title}
          className={customClassName}
        />
      )}
      {hideDescription ? null : (
        <ProductDescription
          description={description}
          className={customClassName}
        />
      )}
      {filterAttributes.map((attr, i) => {
        let Component;
        let props = (attributes || {})?.[attr.name]?.props || {};
        let type: string = attr.type;
        if (
          attr.type === ATTRIBUTE_TYPES.ASSET &&
          attr.assetType === ASSET_TYPES.UPLOAD
        ) {
          type = (attr as IDisplayAttributeAsset).assetType;
        } else if (
          attr.type === ATTRIBUTE_TYPES.STRING &&
          attr.values.length === 0
        ) {
          type = FORM_COMPONENT_TYPES.stringInput;
        }
        if ((attributes || {})?.[attr.name]?.component) {
          Component = Object.entries(formComponents[type] || {}).find(
            ([key]) =>
              key === (attributes || {})?.[attr.name]?.component.toLowerCase()
          )?.[1];
        }
        if (!Component) {
          Component = Object.values(formComponents[type] || {})?.[0];
        }
        if (!Component) {
          console.log(
            `No default component available for ${type} type Attributes`
          );
          return null;
        }
        return (
          <Component
            key={i}
            className={customClassName}
            attribute={attr.name}
            {...props}
          />
        );
      })}
    </Wrapper>
  );
};

FlatForm.propTypes = {
  /**
   * Used to add a title to Form (defaults to the intialized Catalog Item's name)
   */
  title: PropTypes.string,
  /**
   * Alignement for the title. Options include `left`, `center` or `right`
   */
  alignTitle: PropTypes.string,
  /**
   * Used to add a description to Form
   */
  description: PropTypes.string,
  /**
   * The attributes prop allows us to specify which components to use for
   * our attributes and what props we want to pass into their components.
   *
   * The attributes prop takes and object with the keys matching the name
   * of the attribute you wish to target and value as an object includeing
   * the component to use and props to pass in.
   */
  attributes: PropTypes.objectOf(
    PropTypes.shape({
      component: PropTypes.string,
      props: PropTypes.object,
    })
  ),
  /**
   *
   * Used to add a custom class name to each of the components html elements
   */
  className: PropTypes.string,
};

FlatForm.defaultProps = {
  alignTitle: 'left',
  attributes: {},
  includeReservedAttributes: false,
};

export default FlatForm;
