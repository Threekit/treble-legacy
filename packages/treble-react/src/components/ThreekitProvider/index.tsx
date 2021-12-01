import React, { useEffect } from 'react';
import store, { useThreekitDispatch } from '../../store';
import {
  ILaunchConfig,
  launch,
  IThreekitCredentials,
} from '../../store/threekit';

import { Provider } from 'react-redux';

import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import GlobalStyle from './GlobalStyles.styles';

interface ICredentials {
  preview: IThreekitCredentials;
  'admin-fts': IThreekitCredentials;
}

interface Theme {
  [key: string]: string | number;
}

export interface ThreekitProviderProps {
  credentials: ICredentials;
  playerConfig?: ILaunchConfig;
  theme?: Theme;
  threekitEnv?: string;
  children: React.ReactNode;
}

const App = (props: ThreekitProviderProps) => {
  const dispatch = useThreekitDispatch();

  useEffect(() => {
    const init = () => {
      const threekitEnv = props.threekitEnv || process.env.THREEKIT_ENV;
      const threekitConfig = Object.assign(
        { threekitEnv },
        props.credentials,
        props.playerConfig
      );
      dispatch(launch(threekitConfig));
    };
    init();
    return;
  }, [props.credentials, props.threekitEnv, , props.playerConfig]);

  return <>{props.children}</>;
};

const ThreekitProvider = (props: ThreekitProviderProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App
          theme={props.theme}
          credentials={props.credentials}
          playerConfig={props.playerConfig}
          threekitEnv={props.threekitEnv}
        >
          {props.children}
        </App>
      </ThemeProvider>
    </Provider>
  );
};

export default ThreekitProvider;
