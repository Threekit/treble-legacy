const AXIS = ['x', 'y', 'z'];
const TRANSFORMS = ['translation', 'rotation', 'scale'];
let player;

const handleListPositioning = async (listNamePattern, config) => {
  if (!listNamePattern) return;
  const listPattern =
    typeof listNamePattern === 'string'
      ? new RegExp(listNamePattern)
      : listNamePattern;
  const transformPattern = new RegExp(/^_(translation|rotation|scale)_(x|y|z)/);

  if (!player) player = await playerApi.enableApi('player');
  await player.api.getConfigurator();

  Object.entries(player.configurator.appliedConfiguration)
    .filter(
      ([attributeName, assetId]) =>
        listPattern.test(attributeName) && assetId?.length
    )
    .forEach(([attributeName, assetId]) => {
      const node = playerApi.scene.get({ id: assetId, evalNode: true });
      const metadata = Object.entries({
        ...node.configurator.metadata,
        ...node.configurator.appliedConfiguration,
      }).reduce((output, [key, val]) => {
        if (val === null) return output;
        const isTransform = transformPattern.test(key);
        if (!isTransform) return output;

        const address = `${isTransform ? '_transform' : ''}${key}`
          .split('_')
          .filter(el => !!el.length);

        address.reduce((result, el, idx) => {
          if (idx === address.length - 1) {
            result[el] = val;
            return;
          }

          if (!result[el]) result[el] = {};
          return result[el];
        }, output);

        return output;
      }, {});

      if (!Object.keys(metadata).length) return;

      const nodeId = playerApi.scene.findNode({
        from: playerApi.instanceId,
        name: attributeName,
      });

      if (metadata.transform) {
        TRANSFORMS.forEach(transformName => {
          let transform = {};
          if (!metadata.transform[transformName]) return;
          transform = playerApi.scene.get({
            id: nodeId,
            plug: 'Transform',
            property: transformName,
          });

          AXIS.forEach(ax => {
            if (metadata.transform[transformName][ax])
              transform[ax] = metadata.transform[transformName][ax];
          });

          playerApi.scene.set(
            {
              id: nodeId,
              plug: 'Transform',
              property: transformName,
            },
            transform
          );
        });
      }
    });
};

export default handleListPositioning;
