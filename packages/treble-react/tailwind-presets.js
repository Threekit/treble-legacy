// eslint-disable-next-line
const plugin = require('tailwindcss/plugin');

// eslint-disable-next-line
module.exports = {
  purge: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  mode: 'jit',
  variants: {},
  theme: {
    extend: {
      colors: {
        primary: '#1890ff',
      },
      height: { 50: '12rem' },
      width: { 50: '12rem' },
      minWidth: {
        11: '2.75rem',
      },
      boxShadow: {
        trbl: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        wishlist: '0px 4px 16px rgba(0, 0, 0, 0.16)',
      },
    },
  },
  corePlugins: {
    // preflight: false,
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      const tooltip = {
        '.trbl-tooltip': {
          paddingBottom: `${theme('spacing.2')}`,
          width: 'max-content',
          borderRadius: theme('borderRadius.sm'),
          position: 'relative',
          top: '-100%',
          left: '50%',
          transform: 'translate(-50%, -100%)',
          color: 'white',
        },
        '.trbl-tooltip-triangle': {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',

          '& > div': {
            width: `${theme('spacing.0')}`,
            height: `${theme('spacing.0')}`,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid rgba(0, 0, 0, 0.6)',
            overflow: 'hidden',
            pointerEvents: 'none',
          },
        },
      };

      addComponents(tooltip);
    }),
    plugin(function ({ addComponents, theme }) {
      const widgetBtn = {
        '.trbl-wgt-btn': {
          borderRadius: `${theme('borderRadius.full')}`,
          height: '40px',
          width: '40px',
          border: 'none',
          color: '#000',
          background: 'rgba(251,251,251,0.5)',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.16s ease-in-out',
          '&:hover': {
            background: 'rgba(240,240,240,0.75)',
            boxShadow: '0px 0px 4px rgb(0 0 0 / 25%)',
          },
        },
      };

      addComponents(widgetBtn);
    }),
  ],
};
