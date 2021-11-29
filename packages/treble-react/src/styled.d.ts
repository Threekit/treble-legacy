import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mediaQueries: {
      tablet: string;
      desktop: string;
    };

    primaryColor: string;
    linkColor: string;
    successColor: string;
    warningColor: string;
    errorColor: string;
    fontBaseSize: string;
    headingColor: string;
    textColor: string;
    textColorSecondary: string;
    disabledColor: string;
    borderRadius: string;
    borderColorBase: string;
    boxShadowBase: string;
    widgetSize: string;
    fontFamily: string;
  }
}
