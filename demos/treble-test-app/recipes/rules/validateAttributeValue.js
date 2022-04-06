let configurator;

const validateAttributeValue = async (attributes) => {
  if (!configurator) configurator = await api.getConfigurator();
  if (!configurator) return;

  const attrs = Array.isArray(attributes) ? attributes : [attributes];

  const validatedConfig = configurator
    .getDisplayAttributes()
    .reduce((output, attr) => {
      if (attr.type.toLowerCase() !== "asset" || !attrs.includes(attr.name))
        return output;
      const isValid = !!attr.values.find(
        (val) => val.assetId === attr.value.assetId
      );
      if (isValid) return output;
      return Object.assign({}, output, {
        [attr.name]: { assetId: attr.values[0].assetId },
      });
    }, undefined);

  if (validatedConfig) configurator.setConfiguration(validatedConfig);
};

export default validateAttributeValue;
