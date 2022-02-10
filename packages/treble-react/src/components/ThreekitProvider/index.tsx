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
  theme?: Theme;
  reducer?: Record<string, Reducer>;
  children: React.ReactNode;
}

const App = (props: ThreekitProviderProps) => {
  const dispatch = useThreekitDispatch();

  useEffect(() => {
    const init = () => {
      const { playerConfig, project, locale, threekitEnv, eventHandlers } =
        props;
      dispatch(
        launch({ playerConfig, project, locale, threekitEnv, eventHandlers })
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
