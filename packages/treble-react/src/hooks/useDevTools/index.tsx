import { useEffect, useState, useRef } from 'react';

type UseDevToolsHook = [boolean, (val: boolean) => void];

export const useDevTools = (): UseDevToolsHook => {
  const [showDevTools, setShowDevTools] = useState(false);
  const pressedKeysRef = useRef({
    t: false,
    k: false,
  });

  const keydownListener = (event: KeyboardEvent) => {
    if (event.altKey && event.code === 'KeyT') pressedKeysRef.current.t = true;
    else if (event.altKey && event.code === 'KeyK')
      pressedKeysRef.current.k = true;

    const allPressed = Object.values(pressedKeysRef.current).reduce(
      (result, bool) => {
        if (!result || !bool) return false;
        return bool;
      },
      true
    );

    if (allPressed) setShowDevTools(true);
  };

  const keyupListener = (event: KeyboardEvent) => {
    if (event.code === 'KeyT') pressedKeysRef.current.t = false;
    else if (event.code === 'KeyK') pressedKeysRef.current.k = false;
  };

  useEffect(() => {
    (() => {
      document.addEventListener('keydown', keydownListener);
      document.addEventListener('keyup', keyupListener);
    })();

    return () => {
      document.removeEventListener('keydown', keydownListener);
      document.removeEventListener('keyup', keyupListener);
    };
  }, []);

  return [showDevTools, (val: boolean) => setShowDevTools(val)];
};

export default useDevTools;
