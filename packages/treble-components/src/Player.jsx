import { usePlayer } from '@threekit-tools/treble';

export default function Player(props) {
  const [playerRef] = usePlayer();

  return (
    <div className="h-full max-w-screen-sm">
      <div ref={playerRef} className="h-full" />
      {props.children}
    </div>
  );
}
