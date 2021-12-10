import { useEffect, useRef } from 'react';
import { usePlayerPortal } from '@threekit-tools/treble';

const PLAYER_DIV_ID = 'tk-player-component';

export default function Player(props) {
  const portalPlayerTo = usePlayerPortal();
  const hasMoved = useRef(false);

  useEffect(() => {
    if (portalPlayerTo && !hasMoved.current) {
      portalPlayerTo(PLAYER_DIV_ID);
      hasMoved.current = true;
    }
  });

  return (
    <div className="h-full">
      <div id={PLAYER_DIV_ID} />
      {props.children}
    </div>
  );
}
