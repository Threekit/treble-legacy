import { useThreekitSelector } from '../../store';
import { getPlayerInteraction } from '../../store/treble';

export interface DraggablePlayerTipProps {
  color?: string;
  duration?: number;
}

const useFirstPlayerInteraction = (): undefined | boolean => {
  const awaitingFirstInteraction = useThreekitSelector(getPlayerInteraction);
  return awaitingFirstInteraction;
};

export default useFirstPlayerInteraction;
