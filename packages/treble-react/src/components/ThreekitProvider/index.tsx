import React, { useEffect } from 'react';
import createStore, { useThreekitDispatch } from '../../store';
import { Reducer } from 'redux';
import { launch, ILaunchConfig } from '../../store/treble';

import { Provider } from 'react-redux';

import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import GlobalStyle from './GlobalStyles.styles';

interface Theme {
  [key: string]: string | number;
}

export interface ThreekitProviderProps extends Partial<ILaunchConfig> {
  productId?: string;
  theme?: Theme;
  reducer?: Record<string, Reducer>;
  children: React.ReactNode;
}

const App = (props: ThreekitProviderProps) => {
  const dispatch = useThreekitDispatch();
  const {
    playerConfig,
    productId,
    project,
    locale,
    threekitEnv,
    eventHandlers,
  } = props;

  useEffect(() => {
    const init = () => {
      dispatch(
        launch({
          playerConfig,
          productId,
          project,
          locale,
          threekitEnv,
          eventHandlers,
        })
      );
    };
    init();
    return;
  }, [props.project, props.threekitEnv, props.playerConfig]);

  return <>{props.children}</>;
};

const ThreekitProvider = (props: ThreekitProviderProps) => {
  return (
    <Provider store={createStore(props.reducer)}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App
          locale={props.locale}
          productId={props.productId}
          project={props.project}
          playerConfig={props.playerConfig}
          threekitEnv={props.threekitEnv}
          eventHandlers={props.eventHandlers}
        >
          {props.children}
        </App>
      </ThemeProvider>
    </Provider>
  );
};

export default ThreekitProvider;
