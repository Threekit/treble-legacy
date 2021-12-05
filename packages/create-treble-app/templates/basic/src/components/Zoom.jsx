import {
  useZoom,
  ZoomInIcon,
  ZoomOutIcon,
  useThreekitInitStatus,
} from '@threekit-tools/treble';

export default function Zoom() {
  const [zoomIn, zoomOut] = useZoom();
  const hasLoaded = useThreekitInitStatus();

  if (!hasLoaded) return null;

  return (
    <>
      <button onClick={() => zoomOut(1)} className="trbl-wgt-btn">
        <ZoomOutIcon />
      </button>
      <button onClick={() => zoomIn(1)} className="trbl-wgt-btn">
        <ZoomInIcon />
      </button>
    </>
  );
}
