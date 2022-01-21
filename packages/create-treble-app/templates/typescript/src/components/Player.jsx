import { useEffect, useRef } from 'react';
import { usePlayerPortal } from '@threekit-tools/treble';

const PLAYER_DIV_ID = 'tk-player-component';

export default function Player(props) {
  const hasMoved = useRef(false);
  const [portalPlayerTo, portalBack] = usePlayerPortal();

  useEffect(() => {
    if (portalPlayerTo && !hasMoved.current) {
      portalPlayerTo(PLAYER_DIV_ID);
      hasMoved.current = true;
    }

    return () => {
      if (portalBack) portalBack();
    };
  });

  return (
    <div className="h-full">
      <div id={PLAYER_DIV_ID} className="h-full" />
      {props.children}
    </div>
  );
}
