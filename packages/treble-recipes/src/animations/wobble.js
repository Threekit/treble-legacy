let player = undefined;

const wobble = (config) => {
  if (animationInProgress) return;
  let animationInProgress = false;
  let animationNodeId = undefined;
  let startTime = undefined;
  let initialRotation = undefined;
  let initialTranslation = undefined;
  if (!player) player = api.enableApi("player");

  const { resumeDelay, nodeName, speed, magnifier } = Object.assign(
    {
      resumeDelay: 3,
      nodeName: undefined,
      speed: 2,
      magnifier: 2,
    },
    config
  );

  const animateFrame = (timestamp) => {
    if (startTime === undefined) {
      startTime = timestamp;

      initialRotation = api.scene.get({
        id: animationNodeId,
        plug: "Transform",
        property: "rotation",
      });
      initialTranslation = api.scene.get({
        id: animationNodeId,
        plug: "Transform",
        property: "translation",
      });
    }

    const elapsed = (timestamp - startTime) / 1000;

    const rotationDelta = {
      x: 6 * magnifier * Math.cos(elapsed / (2.25 * speed)),
      y: 3 * magnifier * Math.sin(elapsed / (2 * speed)),
      z: 2 * magnifier * Math.sin(elapsed / (2 * speed)),
    };
    const translationDelta = {
      x: 0,
      y: (magnifier * Math.sin(elapsed / speed)) / 100,
      z: 0,
    };

    api.scene.set(
      {
        id: animationNodeId,
        plug: "Transform",
        property: "rotation",
      },
      {
        x: initialRotation.x + rotationDelta.x,
        y: initialRotation.y + rotationDelta.y,
        z: initialRotation.z + rotationDelta.z,
      }
    );
    api.scene.set(
      {
        id: animationNodeId,
        plug: "Transform",
        property: "translation",
      },
      {
        x: initialTranslation.x + translationDelta.x,
        y: initialTranslation.y + translationDelta.y,
        z: initialTranslation.z + translationDelta.z,
      }
    );

    if (animationInProgress) window.requestAnimationFrame(animateFrame);
  };

  const tool = (player) => ({
    key: "wobble-on-load",
    label: "wobble-on-load",
    active: true,
    enabled: true,
    handlers: {
      mousedown: async () => {
        console.log("mousedown - wobble on load");
        animationInProgress = false;
      },
      mouseup: async () => {
        if (!resumeDelay) return;
        console.log("mouseup - wobble on load");
        setTimeout(() => {
          console.log("resuming animation");
          startTime = undefined;
          animationInProgress = true;
          window.requestAnimationFrame(animateFrame);
        }, resumeDelay * 1000);
      },
    },
  });

  if (!nodeName) return;
  setTimeout(async () => {
    const assetInstance = await player.getAssetInstance(
      api.scene.find({
        id: player.instanceId,
        plug: "Proxy",
        property: "asset",
      })
    );

    animationNodeId = api.scene.get({
      from: assetInstance,
      name: nodeName,
    }).id;

    animationInProgress = true;
    player.tools.addTool(tool());
    window.requestAnimationFrame(animateFrame);
  }, 0.01 * 1000);

  // player.api.tools.addTool(tool);
};

export default wobble;
