import { useEffect, useRef } from 'react';
import useAnimationStart from '../../hooks/useAnimationStart';
import {
  ICoordinates,
  PLUG_TYPES,
  TRANSFORM_PROPERTY_TYPES,
  PRIVATE_APIS,
} from '../../types';

interface BreatheAnimationProps {
  magnifier?: number;
  speed?: number;
  resumeDelay?: number;
  nodeName: string;
}

export const BreatheAnimation = (props: BreatheAnimationProps) => {
  const readyToAnimate = useAnimationStart();
  let initialTranslation = useRef<null | ICoordinates>(null);
  let initialRotation = useRef<null | ICoordinates>(null);
  let animationInProgress = useRef<boolean>(false);
  let animationNodeId = useRef<undefined | string>(undefined);
  let startTime = useRef<null | number>(null);
  let timeoutId = useRef<null | NodeJS.Timeout>(null);

  const { speed, magnifier, resumeDelay, nodeName } = Object.assign(
    {
      speed: 4,
      magnifier: 2,
      resumeDelay: undefined,
      nodeName: undefined,
    },
    props
  );

  useEffect(() => {
    if (!readyToAnimate) return;
    if (!nodeName) return;

    const ruleName = `wobble-animation`;

    const animateFrame = (timestamp: number) => {
      if (
        !initialTranslation.current ||
        !initialRotation.current ||
        !animationNodeId.current
      )
        return;
      if (startTime.current === null) startTime.current = timestamp;

      // initialRotation.current = window.threekit.player.scene.get({
      //   id: animationNodeId.current,
      //   plug: 'Transform',
      //   property: 'rotation',
      // });
      // initialTranslation.current = window.threekit.player.scene.get({
      //   id: animationNodeId.current,
      //   plug: 'Transform',
      //   property: 'translation',
      // });

      const elapsed = (timestamp - startTime.current) / 1000;

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

      window.threekit.player.scene.set(
        {
          id: animationNodeId.current,
          plug: PLUG_TYPES.TRANSFORM,
          property: TRANSFORM_PROPERTY_TYPES.ROTATION,
        },
        {
          x: initialRotation.current.x + rotationDelta.x,
          y: initialRotation.current.y + rotationDelta.y,
          z: initialRotation.current.z + rotationDelta.z,
        }
      );
      window.threekit.player.scene.set(
        {
          id: animationNodeId.current,
          plug: PLUG_TYPES.TRANSFORM,
          property: TRANSFORM_PROPERTY_TYPES.TRANSLATION,
        },
        {
          x: initialTranslation.current.x + translationDelta.x,
          y: initialTranslation.current.y + translationDelta.y,
          z: initialTranslation.current.z + translationDelta.z,
        }
      );

      if (animationInProgress.current)
        window.requestAnimationFrame(animateFrame);
    };

    (async () => {
      const player = window.threekit.player.enableApi(PRIVATE_APIS.PLAYER);
      const assetInstance = await player.getAssetInstance(
        window.threekit.player.scene.find({
          id: window.threekit.player.instanceId,
          plug: PLUG_TYPES.PROXY,
          property: 'asset',
        })
      );

      animationNodeId.current = window.threekit.player.scene.get({
        from: assetInstance,
        name: nodeName,
      }).id;

      initialRotation.current = window.threekit.player.scene.get({
        id: animationNodeId.current,
        plug: PLUG_TYPES.TRANSFORM,
        property: TRANSFORM_PROPERTY_TYPES.ROTATION,
      });

      initialTranslation.current = window.threekit.player.scene.get({
        id: animationNodeId.current,
        plug: PLUG_TYPES.TRANSFORM,
        property: TRANSFORM_PROPERTY_TYPES.TRANSLATION,
      });

      animationInProgress.current = true;

      window.threekit.player.tools.addTool({
        key: ruleName,
        label: 'wobble-animation',
        active: true,
        enabled: true,
        handlers: {
          mousedown: async () => {
            animationInProgress.current = false;
            if (resumeDelay === undefined)
              window.threekit.player.tools.removeTool(ruleName);
          },
          mouseup: async () => {
            if (resumeDelay === undefined) return;
            if (timeoutId.current) {
              clearTimeout(timeoutId.current);
              timeoutId.current = null;
            }

            timeoutId.current = setTimeout(() => {
              initialRotation.current = window.threekit.player.scene.get({
                id: animationNodeId.current,
                plug: PLUG_TYPES.TRANSFORM,
                property: TRANSFORM_PROPERTY_TYPES.ROTATION,
              });
              initialTranslation.current = window.threekit.player.scene.get({
                id: animationNodeId.current,
                plug: PLUG_TYPES.TRANSFORM,
                property: TRANSFORM_PROPERTY_TYPES.TRANSLATION,
              });
              startTime.current = null;
              animationInProgress.current = true;
              window.requestAnimationFrame(animateFrame);
            }, resumeDelay * 1000);
          },
        },
      });

      window.requestAnimationFrame(animateFrame);
    })();
  }, [readyToAnimate]);

  return null;
};

export default BreatheAnimation;
