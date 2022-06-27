let player = undefined;

const turntable = config => {
  if (animationInProgress) return;
  let animationInProgress = false;
  let initialRotation = undefined;
  let rotationNodeId = undefined;
  let startTime = undefined;
  if (!player) player = api.enableApi('player');

  const { speed, resumeDelay, rotationDirection, nodeName } = Object.assign(
    {
      speed: 4,
      resumeDelay: 3,
      rotationDirection: 'clockwise',
      nodeName: undefined,
    },
    config
  );

  const animateFrame = timestamp => {
    if (startTime === undefined) startTime = timestamp;

    const elapsed = timestamp - startTime;
    const tAnimPercent = (elapsed / (1000 * 60)) % 1;
    const rotation = speed * 360 * tAnimPercent;

    const currentRotation = Object.assign({}, initialRotation, {
      y:
        rotationDirection === 'clockwise'
          ? initialRotation.y + rotation
          : initialRotation.y - rotation,
    });

    api.scene.set(
      {
        id: rotationNodeId,
        plug: 'Transform',
        property: 'rotation',
      },
      currentRotation
    );

    if (animationInProgress) window.requestAnimationFrame(animateFrame);
  };

  const tool = player => ({
    key: 'rotate-on-load',
    label: 'rotate-on-load',
    active: true,
    enabled: true,
    handlers: {
      mousedown: async () => {
        console.log('clicked - rotate on load');
        animationInProgress = false;
      },
      mouseup: async () => {
        if (!resumeDelay) return;
        setTimeout(() => {
          initialRotation = api.scene.get({
            id: rotationNodeId,
            plug: 'Transform',
            property: 'rotation',
          });
          startTime = undefined;
          animationInProgress = true;
          window.requestAnimationFrame(animateFrame);
        }, resumeDelay * 1000);
      },
    },
  });

  if (!nodeName) return;
  setTimeout(async () => {
    console.log('running turntable');
    const assetInstance = await player.getAssetInstance(
      api.scene.find({
        id: player.instanceId,
        plug: 'Proxy',
        property: 'asset',
      })
    );

    rotationNodeId = api.scene.get({
      from: assetInstance,
      name: nodeName,
    }).id;

    initialRotation = api.scene.get({
      id: rotationNodeId,
      plug: 'Transform',
      property: 'rotation',
    });

    animationInProgress = true;
    player.tools.addTool(tool());
    window.requestAnimationFrame(animateFrame);
    // player.api.tools.addTool(tool);
  }, 0.01 * 1000);
};

export default turntable;
