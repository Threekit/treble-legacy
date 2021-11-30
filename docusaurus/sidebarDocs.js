const docs = {
  Welcome: ['welcome'],
  'Getting Started': [
    'quick-start-new-project',
    'quick-start-existing-project',
    'basic-concepts',
    'best-practices',
    'available-scripts',
    'threekit-config',
    'folder-structure',
  ],
  'Treble React': [
    'treble-react-overview',
    'treble-react-threekit-provider',
    'treble-react-player',
    {
      type: 'category',
      label: 'Components',
      items: [
        'components-overview',
        'components-forms',
        'components-form-components',
        'components-widgets',
        'components-layouts',
        'components-display',
        'components-wrappers',
      ],
    },
    'treble-react-hooks',
  ],
  'Treble JS API': [
    'treble-js-overview',
    'treble-js-player-api',
    'treble-js-configurator-api',
    'treble-js-treble-api',
  ],
  Tutorials: ['how-to-build-custom-components'],
};

module.exports = { docs };
