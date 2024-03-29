import { ATTRIBUTE_TYPES, ASSET_TYPES } from '../types';

import Cards, { Cards as CardsComponent } from './Cards';
import Dropdown, { Dropdown as DropdownComponent } from './Dropdown';
import Strips, { Strips as StripsComponent } from './Strips';
import Swatch, { Swatch as SwatchComponent } from './Swatch';
import Tiles, { Tiles as TilesComponent } from './Tiles';
import TilesGroup, { TilesGroup as TilesGroupComponent } from './TilesGroup';
import Upload, { Upload as UploadComponent } from './Upload';
// import UploadArea, { UploadArea as UploadAreaComponent } from './UploadArea';
import TextInput, { TextInput as TextInputComponent } from './TextInput';
import Switch, { Switch as SwitchComponent } from './Switch';

export const FORM_COMPONENT_TYPES = {
  stringInput: 'string-input',
};

//  First option for each attribute type is the default value
export const formComponents = {
  [ATTRIBUTE_TYPES.ASSET]: {
    [StripsComponent.componentName]: Strips,
    [CardsComponent.componentName]: Cards,
    [DropdownComponent.componentName]: Dropdown,
    [SwatchComponent.componentName]: Swatch,
    [TilesComponent.componentName]: Tiles,
    [TilesGroupComponent.componentName]: TilesGroup,
  },
  [ATTRIBUTE_TYPES.STRING]: {
    [TilesComponent.componentName]: Tiles,
    [DropdownComponent.componentName]: Dropdown,
    [CardsComponent.componentName]: Cards,
    [StripsComponent.componentName]: Strips,
    [SwatchComponent.componentName]: Swatch,
    [TilesGroupComponent.componentName]: TilesGroup,
    [TextInputComponent.componentName]: TextInput,
  },
  [FORM_COMPONENT_TYPES.stringInput]: {
    [TextInputComponent.componentName]: TextInput,
  },
  [ASSET_TYPES.UPLOAD]: {
    [UploadComponent.componentName]: Upload,
    // [UploadAreaComponent.componentName]: UploadArea,
  },
  [ATTRIBUTE_TYPES.BOOLEAN]: {
    [SwitchComponent.componentName]: Switch,
    // [UploadAreaComponent.componentName]: UploadArea,
  },
  //   [ATTRIBUTE_TYPES.color]: {
  //     //  First option is default
  //     [ColorPickerComponent.componentName]: ColorPicker,
  //   },
};

export default formComponents;
