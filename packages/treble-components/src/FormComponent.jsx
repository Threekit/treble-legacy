import { useAttribute, useNestedConfigurator } from '@threekit-tools/treble';
import { Cards } from './Cards';
import { ColorSwatch } from './ColorSwatch';
import { Strips } from './Strips';
import { Tiles } from './Tiles';
import { TilesGroup } from './TilesGroup';

const FORM_COMPONENTS = {
  cards: Cards,
  'color-swatch': ColorSwatch,
  strips: Strips,
  tiles: Tiles,
  'tiles-group': TilesGroup,
};

const ATTRIBUTE_TYPE_DEFAULTS = {
  Asset: FORM_COMPONENTS.tiles,
  String: FORM_COMPONENTS.tiles,
};

function NestedFormComponent(props) {
  const [nestedAttrs] = useNestedConfigurator(props.address);

  if (!Object.values(nestedAttrs || {}).length) return <></>;

  return Object.values(nestedAttrs).map(attr => {
    if (!attr.values.length) return null;

    let Component = ATTRIBUTE_TYPE_DEFAULTS[attribute.type];

    if (!Component) {
      console.log(
        `No default component available for ${attribute.type} type Attributes`
      );
      return <></>;
    }

    if (attr.type !== 'Asset') return <Component attribute={attr} />;

    return (
      <>
        <Component attribute={attr} />
        <NestedFormComponent address={[...props.address, attr.name]} />
      </>
    );
  });
}

function RootFormComponent(props) {
  const [attribute] = useAttribute(props.attribute);
  if (!attribute) return <></>;

  const hasNesting =
    attribute.type === 'Asset' && props.includeNestedConfigurator;

  let Component = ATTRIBUTE_TYPE_DEFAULTS[attribute.type];

  if (!Component) {
    console.log(
      `No default component available for ${attribute.type} type Attributes`
    );
    return <></>;
  }

  if (!hasNesting) return <Component attribute={attribute} />;

  return (
    <>
      <Component attribute={attribute} />
      <NestedFormComponent address={[props.attribute]} />
    </>
  );
}

export default function FormComponent(props) {
  if (!props.attribute?.length && !props.address?.length) return <></>;
  if (!props.address?.length)
    return (
      <RootFormComponent
        attribute={props.attribute}
        includeNestedConfigurator={props.includeNestedConfigurator}
      />
    );
  return (
    <NestedFormComponent address={props.address} attribute={props.attribute} />
  );
}
