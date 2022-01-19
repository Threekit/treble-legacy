import { ITranslationMap } from './api/products';
import {
  IThreekitCamera,
  IConfigurationColor,
  ICoordinates,
  IQuaternion,
  IThreekitDisplayAttribute,
} from './threekit';
import {
  ATTRIBUTE_TYPES,
  //  Class Names
  INPUT_COMPONENT_CLASS_NAME,
  WIDGET_CLASS_NAME,
  LAYOUT_CLASS_NAME,
  TOOL_CLASS_NAME,
  DISPLAY_CLASS_NAME,
  CLASS_NAME_PREFIX,
  FORM_CLASS_NAME,
  TK_SAVED_CONFIG_PARAM_KEY,
} from './constants';
import { ITrebleConfig } from './threekit';

interface ICameraPosition {
  position: ICoordinates;
  quaternion: IQuaternion;
}

interface IAttributeComponentProps {
  component?: string;
  props?: { [key: string]: any };
}

interface IAttributesComponentProps {
  [attributeName: string]: undefined | false | IAttributeComponentProps;
}

export const generateClassName =
  (baseClass: string) =>
  (component: string, customClassName?: string, title?: string) => {
    let result = `${baseClass}-${component}`;
    if (title) result += ` ${regularToKebabCase(title)}`;
    if (customClassName) result += ` ${customClassName}`;
    result += ` ${CLASS_NAME_PREFIX}-${component}`;
    return result;
  };

export const generateInputClassName = generateClassName(
  INPUT_COMPONENT_CLASS_NAME
);
export const generateWidgetClassName = generateClassName(WIDGET_CLASS_NAME);
export const generateLayoutClassName = generateClassName(LAYOUT_CLASS_NAME);
export const generateToolClassName = generateClassName(TOOL_CLASS_NAME);
export const generateDisplayClassName = generateClassName(DISPLAY_CLASS_NAME);
export const generateFormClassName = generateClassName(FORM_CLASS_NAME);

export const IsJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const isObject = (object: Record<string, any>): boolean =>
  object != null && typeof object === 'object';

export const objectToQueryStr = (obj: Record<string, any>): string => {
  if (!obj || !Object.keys(obj).length) return '';
  return Object.entries(obj).reduce<string>((output, [key, val], i) => {
    if (i) output += '&';
    if (val !== undefined)
      output += `${key}=${IsJsonString(val) ? JSON.stringify(val) : val}`;
    return output;
  }, '?');
};

export const getParams = () => {
  let query = window.location.search.substr(1);
  return query.split('&').reduce((output, part) => {
    let [key, value] = part.split('=');
    if (!key?.length) return output;
    const preppedValue = decodeURIComponent(value);
    output[decodeURIComponent(key)] = IsJsonString(preppedValue)
      ? JSON.parse(preppedValue)
      : preppedValue;
    return output;
  }, {} as Record<string, string | { [key: string]: any }>);
};

export const getResumableUrl = (configurationId: string) => {
  const params = Object.assign(getParams(), {
    [TK_SAVED_CONFIG_PARAM_KEY]: configurationId,
  });
  const url = window.location.href.replace(window.location.search, '');
  return `${url}${objectToQueryStr(params)}`;
};

export const shallowCompare = (
  value1: Record<string, any>,
  value2: Record<string, any>
) => {
  if (typeof value1 !== typeof value2) return false;

  if (Array.isArray(value1)) {
    if (value1.length !== value2.length) return false;
    for (let i = 0; i < value1.length; i++)
      if (value1[i] !== value2[i]) return false;
  }

  if (typeof value1 !== 'object') return value1 === value2;

  const keys1 = Object.keys(value1);
  const keys2 = Object.keys(value2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (value1[key] !== value2[key]) {
      return false;
    }
  }

  return true;
};

export const deepCompare = (
  item1: Record<string, any>,
  item2: Record<string, any>
): boolean => {
  //  Are the items the same type
  if (typeof item1 !== typeof item2) return false;
  //  If that type is Array we deepCompare each item
  //  against its counter part
  //  The same arrays in different orders will fail this check
  else if (Array.isArray(item1)) {
    if (item1.length !== item2.length) return false;
    for (let i = 0; i < item1.length; i++)
      if (!deepCompare(item1[i], item2[i])) return false;
    //  If they're objects...
  } else if (isObject(item1)) {
    const keys1 = Object.keys(item1);
    const keys2 = Object.keys(item2);

    //  We makre sure they have the same keys...
    if (keys1.length !== keys2.length) {
      return false;
    }

    //  and then deep compare each value
    for (const key of keys1) {
      if (!deepCompare(item1[key], item2[key])) return false;
    }

    //  This leaves us with literals that can be
    //  compared directly
  } else if (item1 !== item2) return false;

  return true;
};

export const regularToKebabCase = (str: string) =>
  !str?.length
    ? ''
    : str
        .split(' ')
        .filter(word => word?.length)
        .map(word => word.trim().toLowerCase())
        .join('-');

export const hexToRgb = (hex: string) =>
  (
    hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (_: string, r: string, g: string, b: string) =>
          '#' + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g) as Array<string>
  ).map(x => parseInt(x, 16));

export const rgbToHex = (r: number, g: number, b: number) =>
  '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

export const inflateRgb = (rgbObj: IConfigurationColor): IConfigurationColor =>
  Object.entries(rgbObj).reduce(
    (output, [key, value]) =>
      ['r', 'g', 'b'].includes(key)
        ? Object.assign(output, { [key]: Math.round(255 * value) })
        : output,
    {} as IConfigurationColor
  );

export const deflateRgb = (rgbObj: IConfigurationColor): IConfigurationColor =>
  Object.entries(rgbObj).reduce<IConfigurationColor>(
    (output, [key, value]) =>
      ['r', 'g', 'b'].includes(key)
        ? Object.assign(output, { [key]: value / 255 })
        : output,
    {} as IConfigurationColor
  );

export const findHitNode = (hitNodes: any, name: string | RegExp) => {
  if (!hitNodes.length) return undefined;
  const hierarchy = [...hitNodes[0].hierarchy];
  hierarchy.reverse();

  return (
    hierarchy.find(el =>
      typeof name === 'string' ? name === el.name : name.test(el.name)
    ) || undefined
  );
};

export const getCameraPosition = (cameraApi: IThreekitCamera) => ({
  position: cameraApi.getPosition(),
  quaternion: cameraApi.getQuaternion(),
});

export const setCameraPosition = (
  cameraApi: IThreekitCamera,
  cameraPosition: ICameraPosition
) => {
  cameraApi.setPosition(cameraPosition.position);
  cameraApi.setQuaternion(cameraPosition.quaternion);
};

export const dataURItoBlob = (dataURI: string): Blob => {
  var byteString: string;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else byteString = unescape(dataURI.split(',')[1]);

  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};

export const dataURItoFile = (dataURI: string, filename: string): File => {
  var arr = dataURI.split(','),
    mime = (arr[0].match(/:(.*?);/) as Object)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const copyToClipboard = (
  data: string | Record<string, string | number | boolean>
) => {
  if (!data) return;
  const str = typeof data === 'string' ? data : JSON.stringify(data);
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const easeInOutCubic = (val: number): number =>
  val < 0.5 ? 4 * val * val * val : 1 - Math.pow(-2 * val + 2, 3) / 2;

export const metadataValueToObject = (
  data: string
): Record<string, string | number> =>
  data.split(',').reduce((output, keVal) => {
    const [key, value] = keVal
      .trim()
      .split('=')
      .map(el => el.trim());
    return Object.assign(output, { [key]: parseFloat(value) || value });
  }, {});

/**
 * A function to load the Threekit JS Player API script
 *
 * @param threekitDomain The threekit environement to use. i.e. preview.threekit.com
 * @returns
 */
export const createThreekitScriptEl = (threekitDomain: string) =>
  new Promise<void>(resolve => {
    const script = document.createElement('script');
    script.src = `${threekitDomain}/app/js/threekit-player-bundle.js`;
    script.id = 'threekit-player-bundle';
    script.onload = () => resolve();
    document.head.appendChild(script);
  });

export const translateAttribute = (
  attributes: Array<IThreekitDisplayAttribute>,
  translations?: ITranslationMap,
  language?: string
): IThreekitDisplayAttribute => {
  const hasTranslation = !!language && !!translations;
  return attributes.reduce((output, attribute) =>
    Object.assign(output, {
      [attribute.name]: Object.assign(
        {},
        attribute,
        {
          label: hasTranslation
            ? translations?.[attribute.name]?.[language] || attribute.name
            : attribute.name,
        },
        attribute.type === 'String'
          ? {
              values: attribute.values.map(el =>
                Object.assign({}, el, {
                  label: hasTranslation
                    ? translations?.[el.label]?.[language] || el.label
                    : attribute.name,
                })
              ),
            }
          : attribute.type === 'Asset'
          ? {
              values: attribute.values.map(el =>
                Object.assign({}, el, {
                  label: hasTranslation
                    ? translations?.[el.name]?.[language] || el.name
                    : attribute.name,
                })
              ),
            }
          : undefined
      ),
    })
  );
};

export const selectionToConfiguration = (
  value: string | number | boolean | IConfigurationColor,
  attributeType: string
) => {
  switch (attributeType) {
    case ATTRIBUTE_TYPES.number:
    case ATTRIBUTE_TYPES.string:
      return value;
    case ATTRIBUTE_TYPES.asset:
      return { assetId: value };
    case ATTRIBUTE_TYPES.color:
      return deflateRgb(value as IConfigurationColor);
    default:
      return value;
  }
};

export const filterFormAttributes = (
  attributes: Record<string, IThreekitDisplayAttribute>,
  attributeComponentProps: IAttributesComponentProps,
  includeReservedAttributes: boolean
) => {
  if (!attributes) return [];
  if (
    (!attributeComponentProps ||
      !Object.keys(attributeComponentProps).length) &&
    includeReservedAttributes
  )
    return Object.values(attributes);
  return Object.values(attributes).filter(attr => {
    if (!attr) return false;
    if (!includeReservedAttributes && attr?.name?.[0] === '_') return false;
    if (attributeComponentProps && attr?.name in attributeComponentProps) {
      if (!attributeComponentProps[attr.name]) return false;
    }
    return true;
  });
};

export const isUuid = (str?: string) => {
  if (!str || typeof str !== 'string') return false;
  const check = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );
  return check.test(str);
};

export const loadTrebleConfig = () => {
  let config: Partial<ITrebleConfig> = {};
  try {
    const project = require(`/threekit.config.js`).default;
    if (project) config.project = project;
  } catch (e) {
    console.log(e);
  }
  try {
    const player = require('/.treble/player.config.js').default;
    if (player) config.player = player;
  } catch (e) {
    console.log(e);
  }
  try {
    const treble = require('/.treble/treble.config.js').default;
    if (treble) config.treble = treble;
  } catch (e) {
    console.log(e);
  }
  return config;
};
