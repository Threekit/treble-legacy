const useZoom = (): [(step: number) => void, (step: number) => void] => {
  const zoomIn = (step: number) =>
    window.threekit.player.camera.zoom(Math.abs(step) || 1);
  const zoomOut = (step: number) =>
    window.threekit.player.camera.zoom(step ? -1 * Math.abs(step) : -1);

  return [zoomIn, zoomOut];
};

export default useZoom;
