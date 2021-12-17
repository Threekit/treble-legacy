import React, { useEffect } from 'react';
import store, { useThreekitDispatch } from '../../store';
import { launch, ILaunchConfig } from '../../store/threekit';

import { Provider } from 'react-redux';

import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import GlobalStyle from './GlobalStyles.styles';

interface Theme {
  [key: string]: string | number;
}

export interface ThreekitProviderProps extends Partial<ILaunchConfig> {
  theme?: Theme;
  children: React.ReactNode;
}

const App = (props: ThreekitProviderProps) => {
  const dispatch = useThreekitDispatch();

  useEffect(() => {
    const init = () => {
      const { playerConfig, project, locale, threekitEnv } = props;
      dispatch(launch({ playerConfig, project, locale, threekitEnv }));
    };
    init();
    return;
  }, [props.project, props.threekitEnv, props.playerConfig]);

  return <>{props.children}</>;
};

const ThreekitProvider = (props: ThreekitProviderProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App
          locale={props.locale}
          project={props.project}
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
