import { useEffect, useRef } from 'react';
import useAnimationStart from '../../hooks/useAnimationStart';
import {
  ICoordinates,
  PLUG_TYPES,
  TRANSFORM_PROPERTY_TYPES,
  PRIVATE_APIS,
} from '../../types';

enum RotationDirections {
  CLOCKWISE = 'clockwise',
  COUNTER_CLOCKWISE = 'counter-clockwise',
}

interface TurntableAnimationProps {
  speed?: number;
  resumeDelay?: number;
  rotationDirection?: RotationDirections;
  nodeName: string;
}

export const TurntableAnimation = (props: TurntableAnimationProps) => {
  const readyToAnimate = useAnimationStart();
  let initialRotation = useRef<null | ICoordinates>(null);
  let animationInProgress = useRef<boolean>(false);
  let rotationNodeId = useRef<undefined | string>(undefined);
  let startTime = useRef<null | number>(null);
  let timeoutId = useRef<null | NodeJS.Timeout>(null);

  const { speed, resumeDelay, rotationDirection, nodeName } = Object.assign(
    {
      speed: 4,
      resumeDelay: undefined,
      rotationDirection: RotationDirections.CLOCKWISE,
      nodeName: undefined,
    },
    props
  );

  useEffect(() => {
    if (!readyToAnimate) return;
    if (!nodeName) return;

    const ruleName = `turntable-animation`;

    const animateFrame = (timestamp: number) => {
      if (!initialRotation?.current || !rotationNodeId.current) return;
      if (startTime.current === null) startTime.current = timestamp;

      const elapsed = timestamp - startTime.current;
      const tAnimPercent = (elapsed / (1000 * 60)) % 1;
      const rotation = speed * 360 * tAnimPercent;

      const currentRotation = Object.assign({}, initialRotation.current, {
        y:
          rotationDirection === RotationDirections.CLOCKWISE
            ? initialRotation.current.y + rotation
            : initialRotation.current.y - rotation,
      });

      window.threekit.player.scene.set(
        {
          id: rotationNodeId.current,
          plug: PLUG_TYPES.TRANSFORM,
          property: TRANSFORM_PROPERTY_TYPES.ROTATION,
        },
        currentRotation
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

      rotationNodeId.current = window.threekit.player.scene.get({
        from: assetInstance,
        name: nodeName,
      })?.id;

      if (!rotationNodeId.current) return;

      initialRotation.current = window.threekit.player.scene.get({
        id: rotationNodeId.current,
        plug: PLUG_TYPES.TRANSFORM,
        property: TRANSFORM_PROPERTY_TYPES.ROTATION,
      });

      animationInProgress.current = true;

      window.threekit.player.tools.addTool({
        key: ruleName,
        label: 'turntable-animation',
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
                id: rotationNodeId.current,
                plug: PLUG_TYPES.TRANSFORM,
                property: TRANSFORM_PROPERTY_TYPES.ROTATION,
              });
              startTime.current = null;
              animationInProgress.current = true;
              window.requestAnimationFrame(animateFrame);
            }, resumeDelay * 1000);
          },
        },
      });

      window.requestAnimationFrame(animateFrame);

      return () => {
        if (resumeDelay !== undefined)
          window.threekit.player.tools.removeTool(ruleName);
      };
    })();
  }, [readyToAnimate]);

  return null;
};

export default TurntableAnimation;
