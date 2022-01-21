import {
  useSnapshot,
  DownloadIcon,
  useThreekitInitStatus,
} from '@threekit-tools/treble';

export default function Snapshots(props) {
  const { cameras, config } = props;
  const preppedConfig = Object.assign({ output: 'download' }, config);

  const takeSnapshot = useSnapshot(cameras || undefined, preppedConfig);
  const hasLoaded = useThreekitInitStatus();

  if (!hasLoaded) return null;

  return (
    <button onClick={takeSnapshot} className="trbl-wgt-btn">
      <DownloadIcon />
    </button>
  );
}
