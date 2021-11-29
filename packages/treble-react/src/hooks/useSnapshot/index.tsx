import { ISnapshotsCameras, ITakeSnapshotsConfig } from '../../Treble';
import { useThreekitSelector } from '../../store';
import { isThreekitLoaded } from '../../store/threekit';

const useSnapshot = (
  cameras: ISnapshotsCameras,
  config: ITakeSnapshotsConfig
) => {
  const isLoaded = useThreekitSelector<boolean>(isThreekitLoaded);

  if (!isLoaded) return undefined;

  const takeSnapshot = () =>
    window.threekit.treble.takeSnapshots(cameras, config);
  return takeSnapshot;
};

export default useSnapshot;
