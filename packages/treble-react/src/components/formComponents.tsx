import { ATTRIBUTE_TYPES, ASSET_TYPES } from '../constants';

import Cards, { Cards as CardsComponent } from './Cards';
import Dropdown, { Dropdown as DropdownComponent } from './Dropdown';
import Strips, { Strips as StripsComponent } from './Strips';
import Swatch, { Swatch as SwatchComponent } from './Swatch';
import Tiles, { Tiles as TilesComponent } from './Tiles';
import TilesGroup, { TilesGroup as TilesGroupComponent } from './TilesGroup';
import Upload, { Upload as UploadComponent } from './Upload';

export const formComponents = {
  [ATTRIBUTE_TYPES.asset]: {
    //  First option is default
    [StripsComponent.componentName]: Strips,
    [CardsComponent.componentName]: Cards,
    [DropdownComponent.componentName]: Dropdown,
    [SwatchComponent.componentName]: Swatch,
    [TilesComponent.componentName]: Tiles,
    [TilesGroupComponent.componentName]: TilesGroup,
  },
  [ATTRIBUTE_TYPES.string]: {
    //  First option is default
    [TilesComponent.componentName]: Tiles,
    [DropdownComponent.componentName]: Dropdown,
    [CardsComponent.componentName]: Cards,
    [StripsComponent.componentName]: Strips,
    [SwatchComponent.componentName]: Swatch,
    [TilesGroupComponent.componentName]: TilesGroup,
    // [TextInputComponent.componentName]: TextInput,
  },
  [ASSET_TYPES.upload]: {
    [UploadComponent.componentName]: Upload,
  },
  //   [ATTRIBUTE_TYPES.color]: {
  //     //  First option is default
  //     [ColorPickerComponent.componentName]: ColorPicker,
  //   },
};

export default formComponents;
