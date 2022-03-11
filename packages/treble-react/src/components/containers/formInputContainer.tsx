import React, { FunctionComponent } from 'react';
import useAttribute, { RawAttributeValue } from '../../hooks/useAttribute';
import usePlayerLoadingStatus from '../../hooks/usePlayerLoadingStatus';
import { IHydratedAttribute, IHydratedAttributeAssetValue } from '../../types';
import { inflateRgb } from '../../utils';
import { METADATA_RESERVED, SORT_OPTIONS } from '../../constants';

export interface IOptionShared {
  name: string;
  value: string;
  handleSelect: () => Promise<void>;
  selected: boolean;
  // label: string;
}

export interface IOption extends IOptionShared {
  description?: string;
  price?: string;
  color?: string;
  imageUrl?: string;
}
interface MetadataKeys {
  imgBaseUrl?: string;
  metadataKeyThumbnail?: string;
  metadataKeyPrice?: string;
  metadataKeyDescription?: string;
}
export interface IFormContainerProps
  extends Pick<
    MetadataKeys,
    'metadataKeyThumbnail' | 'metadataKeyPrice' | 'metadataKeyDescription'
  > {
  attribute?: string;

  hideAttributeTitle?: string;
  sort?: string;

  title?: string;
  description?: string;
  value?: string | boolean;
  onClick?: (value: RawAttributeValue) => Promise<void>;
  onChange?: (value: RawAttributeValue) => Promise<void>;
  className?: string;
}

export interface IFormComponentProps<T extends IOptionShared | undefined>
  extends Pick<
    IFormContainerProps,
    'title' | 'description' | 'value' | 'onClick' | 'onChange' | 'className'
  > {
  options: null | undefined | Array<T>;
}

export interface IFormComponent<P> extends FunctionComponent<P> {
  compatibleAttributes: Set<string>;
}

interface IHydrateAttributeConfig {
  metadataKeys: MetadataKeys;
  sort?: string;
}

export const hydrateAttributeForComponent = (
  attribute: IHydratedAttribute,
  config: IHydrateAttributeConfig
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

  if (attribute.type === 'String') {
    options = attribute.values.map(el => ({
      ...el,
      name: el.label,
    }));
  } else if (attribute.type === 'Asset') {
    selected = attribute.value?.assetId;
    options = attribute.values
      ? attribute.values
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
  } else if (attribute.type === 'Color') {
    selected = inflateRgb(attribute.value);
  }

  function prepCatalogItem(
    item: IHydratedAttributeAssetValue
  ): IHydratedAttributeAssetValue {
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
    if (!attribute) return <FormComponent {...props} />;
    if (!attributeData) return null;

    if (!FormComponent.compatibleAttributes.has(attributeData.type)) {
      console.log('Incompatible attribute type for this component');
      return null;
    }

    const { selected, options } = hydrateAttributeForComponent(attributeData, {
      metadataKeys: {
        metadataKeyThumbnail,
        metadataKeyDescription,
        metadataKeyPrice,
      },
      sort,
    });

    const handleSetAttribute = (value: RawAttributeValue) =>
      setAttribute?.(value);

    let preppedProps = { ...props };
    if (!hideAttributeTitle && !preppedProps.title)
      preppedProps.title = attributeData.label;

    return (
      <FormComponent
        {...preppedProps}
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
