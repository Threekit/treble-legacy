import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import useThreekitInitStatus from '../../hooks/useThreekitInitStatus';
import { useThreekitSelector } from '../../store';
import { getPlayerElementId } from '../../store/treble';

export const PortalToArOverlay: React.FC = props => {
  const { children } = props;
  const isLoaded = useThreekitInitStatus();
  const playerEl = useThreekitSelector(getPlayerElementId);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    (() => {
      if (!isLoaded || !playerEl) return;
      if (!isAvailable) return;

      const observer = new MutationObserver(() => {
        if (document.getElementById('threekitArOverlay')) {
          setIsAvailable(true);
          observer.disconnect();
        }
      });

      const playerHtmlEl = document.getElementById(playerEl);

      if (!playerHtmlEl) return;

      observer.observe(playerHtmlEl, {
        attributes: false,
        childList: true,
        characterData: false,
        subtree: true,
      });
    })();
  }, []);

  if (!isLoaded || !playerEl) return <></>;

  const htmlEl = document.getElementById('threekitArOverlay');
  if (!htmlEl) return <></>;

  return createPortal(children, htmlEl);
};

export default PortalToArOverlay;
