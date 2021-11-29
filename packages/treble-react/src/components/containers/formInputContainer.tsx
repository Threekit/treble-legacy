import React, { FunctionComponent } from 'react';
import useAttribute, { AttributeValue } from '../../hooks/useAttribute';
import usePlayerLoadingStatus from '../../hooks/usePlayerLoadingStatus';
import {
  IAttributeColor,
  IDisplayAttributeAssetValue,
  IThreekitDisplayAttribute,
  IDisplayAttributeAsset,
  IDisplayAttributeString,
} from '../../threekit';
import { inflateRgb } from '../../utils';
import {
  METADATA_RESERVED,
  ATTRIBUTE_TYPES,
  SORT_OPTIONS,
} from '../../constants';

export interface IOptionShared {
  name: string;
  value: string;
}

export interface IOption extends IOptionShared {
  description?: string;
  price?: string;
  color?: string;
  imageUrl?: string;
  // label: string;
}

export interface IFormContainerProps {
  attribute?: string;

  metadataKeyThumbnail?: string;
  metadataKeyDescription?: string;
  metadataKeyPrice?: string;
  hideAttributeTitle?: string;
  sort?: string;

  title?: string;
  description?: string;
  value?: string;
  onClick?: (value: string) => void;
  className?: string;
}

export interface IFormComponentProps<T extends IOptionShared> {
  title?: string;
  description?: string;
  value?: string;
  onClick?: (value: string) => void;
  className?: string;
  options: null | undefined | Array<T>;
}

export interface IFormComponent<P> extends FunctionComponent<P> {
  compatibleAttributes: Set<string>;
}

interface MetadataKeys {
  imgBaseUrl?: string;
  metadataKeyThumbnail?: string;
  metadataKeyPrice?: string;
  metadataKeyDescription?: string;
}

interface IPrepAttributeConfig {
  metadataKeys: MetadataKeys;
  sort?: string;
}

export const prepAttributeForComponent = (
  attribute: IThreekitDisplayAttribute,
  config: IPrepAttributeConfig
) => {
  const { metadataKeyThumbnail, metadataKeyPrice, metadataKeyDescription } =
    config.metadataKeys;

  const { sort } = config;

  const thumbnailKey = metadataKeyThumbnail || METADATA_RESERVED.thumbnail;
  const priceKey = metadataKeyPrice || METADATA_RESERVED.price;
  const descriptionKey =
    metadataKeyDescription || METADATA_RESERVED.description;

  let options;
  let selected = attribute.value;

  if (attribute.type === ATTRIBUTE_TYPES.string) {
    const stringAttribute = attribute as IDisplayAttributeString;
    options = stringAttribute.values.map(el => ({ ...el, name: el.label }));
  } else if (attribute.type === ATTRIBUTE_TYPES.asset) {
    const assetAttribute = attribute as IDisplayAttributeAsset;
    selected = assetAttribute.value?.assetId;
    options = assetAttribute.values
      ? assetAttribute.values
          .map(el => prepCatalogItem(el))
          .sort((a, b) => {
            if (!sort || !Object.keys(SORT_OPTIONS).includes(sort)) return 1;
            if (sort === SORT_OPTIONS.ascending)
              return a.name < b.name ? -1 : 1;
            if (sort === SORT_OPTIONS.descending)
              return a.name < b.name ? 1 : -1;
            return 1;
          })
      : [];
  } else if (attribute.type === ATTRIBUTE_TYPES.color) {
    const colorAttribute = attribute as IAttributeColor;
    selected = inflateRgb(colorAttribute.value);
  }

  function prepCatalogItem(
    item: IDisplayAttributeAssetValue
  ): IDisplayAttributeAssetValue {
    return Object.assign(
      {},
      item,
      {
        value: item.assetId,
      },
      item.metadata[thumbnailKey]
        ? (item.metadata[thumbnailKey] as string)?.startsWith('#') ||
          (item.metadata[thumbnailKey] as string)?.startsWith('rgb')
          ? {
              color: item.metadata[thumbnailKey],
            }
          : {
              imageUrl: item.metadata[thumbnailKey],
            }
        : undefined,
      item.metadata[priceKey]
        ? {
            price: item.metadata[priceKey],
          }
        : undefined,
      item.metadata[descriptionKey]
        ? {
            description: item.metadata[descriptionKey],
          }
        : undefined
    );
  }

  return { selected, options };
};

function formComponentContainer<P extends IFormContainerProps>(
  FormComponent: IFormComponent<Omit<P, 'options'>>
  // FormComponent: IFormComponent<P>
) {
  return (props: P) => {
    const {
      attribute,
      metadataKeyThumbnail,
      metadataKeyDescription,
      metadataKeyPrice,
      hideAttributeTitle,
      sort,
    } = props;

    const isLoading = usePlayerLoadingStatus();

    const [attributeData, setAttribute] = useAttribute(attribute);
    if (!attributeData) return null;

    if (!FormComponent.compatibleAttributes.has(attributeData.type)) {
      console.log('Incompatible attribute type for this component');
      return null;
    }

    const { selected, options } = prepAttributeForComponent(attributeData, {
      metadataKeys: {
        metadataKeyThumbnail,
        metadataKeyDescription,
        metadataKeyPrice,
      },
      sort,
    });

    const handleSetAttribute = (value: AttributeValue) =>
      setAttribute && setAttribute(value);

    let preppedProps = { ...props };
    if (!hideAttributeTitle && !preppedProps.title)
      preppedProps.title = attributeData.label;

    return (
      <FormComponent
        {...preppedProps}
        title={props.title || attribute}
        value={selected}
        onClick={handleSetAttribute}
        onChange={handleSetAttribute}
        options={options}
        isPlayerLoading={isLoading}
      />
    );
  };
}

export default formComponentContainer;
