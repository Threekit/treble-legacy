import { useRef, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPlayerElementId } from '../../store/treble';
import { TK_PLAYER_LOADER_DIV } from '../../constants';

type UsePlayer = [undefined] | [(node: null | HTMLDivElement) => void];

const usePlayer = (): UsePlayer => {
  const playerElRef = useRef<HTMLDivElement | null>(null);
  const playerLoaderRef = useRef<HTMLDivElement | null>(null);
  const playerWrapperRef = useRef<HTMLDivElement | null>(null);
  const playerElementId = useSelector(getPlayerElementId);

  const playerRef = useCallback(
    (node: null | HTMLDivElement) => {
      if (node !== null) {
        playerWrapperRef.current = node;

        if (!playerElementId) return;
        playerElRef.current = document.getElementById(
          playerElementId
        ) as HTMLDivElement | null;

        playerWrapperRef.current?.appendChild(playerElRef.current as Node);
        return;
      }
    },
    [playerElementId]
  );

  useEffect(
    () => () => {
      if (!playerElRef.current) return;

      if (!playerLoaderRef.current)
        playerLoaderRef.current = document.getElementById(
          TK_PLAYER_LOADER_DIV
        ) as HTMLDivElement | null;

      if (!playerElRef.current) throw new Error('Move from element not found');
      if (!playerLoaderRef.current)
        throw new Error('Player Loader element not found');

      playerLoaderRef.current.appendChild(playerElRef.current as Node);
    },
    []
  );

  if (!playerElementId) return [undefined];

  return [playerRef];
};

export default usePlayer;
