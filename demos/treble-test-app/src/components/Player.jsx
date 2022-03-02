import { useEffect, useRef } from 'react';
import { usePlayerPortal } from '@threekit-tools/treble';

const PLAYER_DIV_ID = 'tk-player-component';

export default function Player(props) {
  const [portalPlayerTo, portalBack] = usePlayerPortal();
  const hasMoved = useRef(false);

  useEffect(() => {
    if (portalPlayerTo && !hasMoved.current) {
      portalPlayerTo(PLAYER_DIV_ID);
      hasMoved.current = true;
    }

    return () => {
      if (portalBack) {
        portalBack();
        hasMoved.current = false;
      }
    };
  }, [portalPlayerTo]);

  return (
    <div className="h-full max-w-screen-sm">
      <div id={PLAYER_DIV_ID} className="h-full" />
      {props.children}
    </div>
  );
}
