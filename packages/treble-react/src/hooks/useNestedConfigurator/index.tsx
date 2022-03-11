import { useState, useEffect, useRef } from 'react';
import {
  IHydratedAttribute,
  ISetConfiguration,
  IThreekitDisplayAttribute,
  IThreekitPrivateConfigurator,
} from '../../types';
import { useThreekitSelector, useThreekitDispatch } from '../../store';
import {
  isPlayerLoading,
  isThreekitInitialized,
  setPlayerLoading,
} from '../../store/treble';
import { hydrateAttribute } from '../../utils';
import { getHydrationData } from '../../store/attributes';

type UseNestedConfiguratorError = [undefined, undefined];
type UseNestedConfiguratorSuccess = [
  Record<string, IHydratedAttribute>,
  (val: ISetConfiguration) => Promise<void>
];

const useNestedConfigurator = (
  address: string | Array<string>
): UseNestedConfiguratorError | UseNestedConfiguratorSuccess => {
  const dispatch = useThreekitDispatch();
  const hasInitialized = useThreekitSelector(isThreekitInitialized);
  const playerLoading = useThreekitSelector(isPlayerLoading);
  const [_, translations, language] = useThreekitSelector(getHydrationData);
  const [attributes, setAttributes] =
    useState<Array<IThreekitDisplayAttribute>>();
  const configurator = useRef<undefined | IThreekitPrivateConfigurator>();

  useEffect(() => {
    (() => {
      if (!hasInitialized) return;
      if (playerLoading) return;

      configurator.current =
        window.threekit.treble.getNestedConfigurator(address);

      if (!configurator.current) return;
      const updatedAttrs = configurator.current?.getDisplayAttributes();
      setAttributes(updatedAttrs);
    })();
  }, [hasInitialized, address, playerLoading]);

  if (!hasInitialized || !configurator.current || !attributes)
    return [undefined, undefined];

  const handleSelect = async (config: ISetConfiguration) => {
    dispatch(setPlayerLoading(true));
    await configurator.current?.setConfiguration(config);
    dispatch(setPlayerLoading(false));
    const updatedAttrs = configurator.current?.getDisplayAttributes();
    if (updatedAttrs) setAttributes(updatedAttrs);
  };

  const attributeObj: Record<string, IThreekitDisplayAttribute> =
    attributes.reduce(
      (output, attr) => Object.assign(output, { [attr.name]: attr }),
      {}
    );

  const preppedAttributes = hydrateAttribute(
    [attributeObj, translations, language],
    handleSelect
  );

  return [preppedAttributes, handleSelect];
};

export default useNestedConfigurator;
