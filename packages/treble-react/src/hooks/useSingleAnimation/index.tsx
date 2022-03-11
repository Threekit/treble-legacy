import { useState, useRef } from 'react';
import useThreekitInitStatus from '../useThreekitInitStatus';
import { easeInOutCubic } from '../../utils';
import { ICoordinates } from '../../types';

interface NodeConfig {
  nodeId: string;
  paddingStart: number;
  paddingEnd: number;
  delay: number;
  duration: number;
  translation: ICoordinates;
  rotation: ICoordinates;
  scale: ICoordinates;
}

interface AnimationConfig {
  duration: number;
  nodes: Array<NodeConfig>;
}

interface AnimationRef {
  assetId: undefined | string;
  totalDuration: number;
  isTransformed: boolean;
  startTime: undefined | number;
  nodes: Record<string, NodeConfig>;
}

const prepAnimateConfig = (
  config: AnimationConfig
): Promise<[string, number, Record<string, NodeConfig>]> =>
  new Promise(async resolve => {
    let totalDuration = config.duration * 1000 || 0;
    const player = window.threekit.player.enableApi('player');
    const assetId: string = await player.getAssetInstance(
      window.threekit.player.scene.find({
        id: window.threekit.player.instanceId,
        plug: 'Proxy',
        property: 'asset',
      })
    );

    const nodesRaw: Record<string, NodeConfig> = Object.entries(
      config.nodes
    ).reduce((output, [name, nodeData]) => {
      const nodeId = window.threekit.player.scene.get({
        from: assetId,
        name,
      }).id;

      const node: NodeConfig = Object.assign(
        { nodeId },
        { duration: (nodeData.duration || config.duration || 0) * 1000 },
        { paddingStart: (nodeData.delay || 0) * 1000 },
        'translation' in nodeData
          ? {
              translation: [
                window.threekit.player.scene.get({
                  from: assetId,
                  id: nodeId,
                  plug: 'Transform',
                  property: 'translation',
                }),
                Object.assign({ x: 0, y: 0, z: 0 }, nodeData.translation),
              ],
            }
          : {},
        'rotation' in nodeData
          ? {
              rotation: [
                window.threekit.player.scene.get({
                  from: assetId,
                  id: nodeId,
                  plug: 'Transform',
                  property: 'rotation',
                }),
                Object.assign({ x: 0, y: 0, z: 0 }, nodeData.rotation),
              ],
            }
          : {},
        'scale' in nodeData
          ? {
              scale: [
                window.threekit.player.scene.get({
                  from: assetId,
                  id: nodeId,
                  plug: 'Transform',
                  property: 'scale',
                }),
                Object.assign({ x: 0, y: 0, z: 0 }, nodeData.scale),
              ],
            }
          : {}
      );

      const duration = node.duration + node.paddingStart;
      if (duration > totalDuration) totalDuration = duration;

      return Object.assign(output, { [name]: node });
    }, {});

    const nodes: Record<string, NodeConfig> = Object.entries(nodesRaw).reduce(
      (output, [nodeName, nodeData]) => {
        let paddingEnd = 0;
        if (totalDuration !== nodeData.duration + nodeData.paddingStart)
          paddingEnd =
            totalDuration - (nodeData.duration + nodeData.paddingStart);

        return Object.assign(output, {
          [nodeName]: {
            ...nodeData,
            paddingEnd,
          },
        });
      },
      {}
    );

    resolve([assetId, totalDuration, nodes]);
  });

const useAnimation = (animationConfig: AnimationConfig) => {
  const [animationInProgress, setAnimationInProgress] = useState(false);
  const ref = useRef<AnimationRef>({
    assetId: undefined,
    startTime: 0,
    totalDuration: 0,
    nodes: {},
    isTransformed: false,
  });

  const isLoaded = useThreekitInitStatus();

  if (!isLoaded) return [undefined, undefined];

  const animateFrame = (timestamp: number) => {
    // if (startTime.current === undefined) startTime.current = timestamp;
    // const elapsed = timestamp - startTime.current;
    if (ref.current.startTime === undefined) ref.current.startTime = timestamp;
    const elapsed = timestamp - ref.current.startTime;

    Object.values(ref.current.nodes).forEach(nodeConfig => {
      if (!ref.current.isTransformed) {
        //    If its too early we don't animate
        if (elapsed < nodeConfig.paddingStart) return;
        //    If its too early we don't animate
        if (elapsed > nodeConfig.duration + nodeConfig.paddingStart) return;
      } else if (ref.current.isTransformed) {
        //    If its too early we don't animate
        if (elapsed < nodeConfig.paddingEnd) return;
        //    If its too early we don't animate
        if (elapsed > nodeConfig.duration + nodeConfig.paddingEnd) return;
      }

      const progressTime = !ref.current.isTransformed
        ? elapsed - nodeConfig.paddingStart
        : elapsed - nodeConfig.paddingEnd;

      const animationPercent = easeInOutCubic(
        progressTime / nodeConfig.duration
      );

      let translation: ICoordinates;
      let rotation: ICoordinates;
      let scale: ICoordinates;

      if ('translation' in nodeConfig) {
        translation = Object.keys(nodeConfig.translation[1]).reduce(
          (output, axis) => {
            const value = !ref.current.isTransformed
              ? nodeConfig.translation[0][axis] +
                nodeConfig.translation[1][axis] * animationPercent
              : nodeConfig.translation[1][axis] +
                nodeConfig.translation[0][axis] -
                nodeConfig.translation[1][axis] * animationPercent;
            return Object.assign(output, { [axis]: value });
          },
          {} as ICoordinates
        );
        window.threekit.player.scene.set(
          {
            from: ref.current.assetId,
            id: nodeConfig.nodeId,
            plug: 'Transform',
            property: 'translation',
          },
          translation
        );
      }
      if ('rotation' in nodeConfig) {
        rotation = Object.keys(nodeConfig.rotation[1]).reduce(
          (output, axis) => {
            const value = !ref.current.isTransformed
              ? nodeConfig.rotation[0][axis] +
                nodeConfig.rotation[1][axis] * animationPercent
              : nodeConfig.rotation[1][axis] +
                nodeConfig.rotation[0][axis] -
                nodeConfig.rotation[1][axis] * animationPercent;
            return Object.assign(output, { [axis]: value });
          },
          {} as ICoordinates
        );
        window.threekit.player.scene.set(
          {
            from: ref.current.assetId,
            id: nodeConfig.nodeId,
            plug: 'Transform',
            property: 'rotation',
          },
          rotation
        );
      }
      if ('scale' in nodeConfig) {
        scale = Object.keys(nodeConfig.scale[1]).reduce((output, axis) => {
          const value = !ref.current.isTransformed
            ? nodeConfig.scale[0][axis] +
              nodeConfig.scale[1][axis] * animationPercent
            : nodeConfig.scale[1][axis] +
              nodeConfig.scale[0][axis] -
              nodeConfig.scale[1][axis] * animationPercent;
          return Object.assign(output, { [axis]: value });
        }, {} as ICoordinates);
        window.threekit.player.scene.set(
          {
            from: ref.current.assetId,
            id: nodeConfig.nodeId,
            plug: 'Transform',
            property: 'scale',
          },
          scale
        );
      }
    });

    if (elapsed < ref.current.totalDuration) {
      window.requestAnimationFrame(animateFrame);
    } else {
      setAnimationInProgress(false);
      ref.current.startTime = undefined;
      ref.current.isTransformed = !ref.current.isTransformed;
    }
  };

  const handleClickAnimate = async () => {
    ref.current.startTime = undefined;
    if (!ref.current.nodes) {
      [ref.current.assetId, ref.current.totalDuration, ref.current.nodes] =
        await prepAnimateConfig(animationConfig);
      ref.current.isTransformed = false;
    }

    setAnimationInProgress(true);
    window.requestAnimationFrame(animateFrame);
  };

  return [animationInProgress, handleClickAnimate];
};

export default useAnimation;
