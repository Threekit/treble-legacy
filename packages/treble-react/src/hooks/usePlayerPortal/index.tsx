import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { getPlayerElementId } from '../../store/threekit';
import { TK_PLAYER_LOADER_DIV } from '../../constants';

interface IHtmlElements {
  player: HTMLElement | null;
  playerLoader: HTMLElement | null;
  playerWrapper: HTMLElement | null;
}

type UsePlayerPortal =
  | [undefined, undefined]
  | [(toEl: string) => void, () => void];

const usePlayerPortal = (): UsePlayerPortal => {
  const htmlElements = useRef<IHtmlElements>({
    player: null,
    playerLoader: null,
    playerWrapper: null,
  });
  const playerElementId = useSelector(getPlayerElementId);

  if (!playerElementId) return [undefined, undefined];

  const portalPlayerTo = (toEl: string) => {
    if (!toEl) return;

    if (!htmlElements.current.player)
      htmlElements.current.player = document.getElementById(playerElementId);
    htmlElements.current.playerWrapper = document.getElementById(toEl);

    if (!htmlElements.current.player)
      throw new Error('Move from element not found');
    if (!htmlElements.current.playerWrapper)
      throw new Error('Move To element not found');

    htmlElements.current.playerWrapper.appendChild(htmlElements.current.player);
  };

  const returnPlayer = () => {
    if (!htmlElements.current.player)
      htmlElements.current.player = document.getElementById(playerElementId);

    if (!htmlElements.current.playerLoader)
      htmlElements.current.playerLoader =
        document.getElementById(TK_PLAYER_LOADER_DIV);

    if (!htmlElements.current.player)
      throw new Error('Move from element not found');
    if (!htmlElements.current.playerLoader)
      throw new Error('Player Loader element not found');

    htmlElements.current.playerLoader.appendChild(htmlElements.current.player);
  };

  return [portalPlayerTo, returnPlayer];
};

export default usePlayerPortal;
