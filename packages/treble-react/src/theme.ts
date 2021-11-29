export const deviceSizes = {
  tablet: '800px',
};

export const MEDIA_QUERIES = {
  tablet: `(max-width: ${deviceSizes.tablet})`,
  desktop: `(min-width: ${deviceSizes.tablet})`,
};

const theme = {
  mediaQueries: MEDIA_QUERIES,
  primaryColor: '#1890ff',
  linkColor: '#1890ff',
  successColor: '#52c41a',
  warningColor: '#faad14',
  errorColor: '#f5222d',
  fontBaseSize: '14px',
  headingColor: 'rgba(0, 0, 0, 0.85)',
  textColor: 'rgba(0, 0, 0, 0.65)',
  textColorSecondary: 'rgba(0, 0, 0, 0.45)',
  disabledColor: 'rgba(0, 0, 0, 0.25)',
  borderRadius: '2px',
  borderColorBase: '#d9d9d9',
  boxShadowBase:
    '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);',
  widgetSize: '36px',
  fontFamily: '"Open Sans", sans-serif',
};

export default theme;
