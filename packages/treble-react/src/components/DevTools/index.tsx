import React from 'react';
import useDevTools from '../../hooks/useDevTools';
import Drawer from '../Drawer';
import { Wrapper, Header } from './devTools.styles';

export const DevTools = () => {
  const [showDevTools, setShowDevTools] = useDevTools();

  return (
    <Drawer
      showHeader={false}
      show={showDevTools}
      handleClose={() => setShowDevTools(false)}
    >
      <Wrapper>
        <Header>Treble - Dev Tools</Header>
      </Wrapper>
    </Drawer>
  );
};

export default DevTools;
