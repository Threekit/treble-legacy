import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './flatForm.styles';
import ProductName from '../ProductName';
import ProductDescription from '../ProductDescription';
import formComponents from '../formComponents';
import {
  generateFormClassName as generateClassName,
  filterFormAttributes,
} from '../../utils';
import useConfigurator from '../../hooks/useConfigurator';

interface FlatFormProps {
  title?: string;
  alignTitle?: string;
  description?: string;
  className?: string;
  includeReservedAttributes: boolean;
  // attributes:
}

export const FlatForm = (props: FlatFormProps) => {
  const {
    title,
    alignTitle,
    description,
    attributes,
    className: customClassName,
    includeReservedAttributes,
  } = Object.assign(
    {
      alignTitle: 'center',
      attributes: {},
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
      <ProductName
        align={alignTitle}
        title={title}
        className={customClassName}
      />
      <ProductDescription
        description={description}
        className={customClassName}
      />
      {filterAttributes.map((attr, i) => {
        let Component;
        let props = (attributes || {})?.[attr.name]?.props || {};
        if ((attributes || {})?.[attr.name]?.component) {
          Component = Object.entries(formComponents[attr.type] || {}).find(
            ([key]) =>
              key === (attributes || {})?.[attr.name]?.component.toLowerCase()
          )?.[1];
        }
        if (!Component) {
          Component = Object.values(formComponents[attr.type] || {})?.[0];
        }
        if (!Component) {
          console.log(
            `No default component available for ${attr.type} type Attributes`
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
