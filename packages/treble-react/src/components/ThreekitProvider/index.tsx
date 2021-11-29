import React, { useEffect } from 'react';
import store, { useThreekitDispatch } from '../../store';
import { ILaunchConfig, launch } from '../../store/threekit';

import { Provider } from 'react-redux';

import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import GlobalStyle from './GlobalStyles.styles';

export interface ThreekitProviderProps {
  config: ILaunchConfig;
  threekitEnv?: string;
  children: React.ReactNode;
}

const App = (props: ThreekitProviderProps) => {
  const dispatch = useThreekitDispatch();

  useEffect(() => {
    const init = () => {
      const threekitEnv = props.threekitEnv || process.env.THREEKIT_ENV;
      const threekitConfig = Object.assign({ threekitEnv }, props.config);
      dispatch(launch(threekitConfig));
    };
    init();
    return;
  }, [props.config, props.threekitEnv]);

  return <>{props.children}</>;
};

const ThreekitProvider = (props: ThreekitProviderProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App config={props.config} threekitEnv={props.threekitEnv}>
          {props.children}
        </App>
      </ThemeProvider>
    </Provider>
  );
};

export default ThreekitProvider;
