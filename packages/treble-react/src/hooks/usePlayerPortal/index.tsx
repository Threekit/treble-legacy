import { useSelector } from 'react-redux';
import { getPlayerElementId } from '../../store/threekit';

const usePlayerPortal = () => {
  const playerElementId = useSelector(getPlayerElementId);

  if (!playerElementId) return undefined;

  const portalPlayerTo = (toEl: string) => {
    if (!toEl) return;

    const playerEl = document.getElementById(playerElementId);
    const playerWrapperEl = document.getElementById(toEl);

    if (!playerEl) throw new Error('Move from element not found');
    if (!playerWrapperEl) throw new Error('Move To element not found');

    playerWrapperEl.appendChild(playerEl);
  };

  return portalPlayerTo;
};

export default usePlayerPortal;
