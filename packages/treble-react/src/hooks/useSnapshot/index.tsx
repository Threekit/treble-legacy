import { ISnapshotsCameras, ITakeSnapshotsConfig } from '../../Treble';
import { useThreekitSelector } from '../../store';
import { isThreekitInitialized } from '../../store/treble';

const useSnapshot = (
  cameras: ISnapshotsCameras,
  config: ITakeSnapshotsConfig
) => {
  const isLoaded = useThreekitSelector<boolean>(isThreekitInitialized);

  if (!isLoaded) return undefined;

  const takeSnapshot = () =>
    window.threekit.treble.takeSnapshots(cameras, config);
  return takeSnapshot;
};

export default useSnapshot;
