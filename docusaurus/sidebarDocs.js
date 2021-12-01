const docs = [
  {
    type: 'doc',
    id: 'welcome',
    label: 'Welcome',
  },
  {
    type: 'doc',
    id: 'quick-start-new-project',
    label: 'Quick Start: New Project',
  },
  {
    type: 'doc',
    id: 'quick-start-existing-project',
    label: 'Quick Start: Existing Project',
  },
  {
    type: 'category',
    collapsible: true,
    label: 'Getting Started',
    items: [
      'basic-concepts',
      'best-practices',
      'available-scripts',
      'threekit-config',
      'folder-structure',
    ],
  },
  {
    type: 'category',
    collapsible: true,
    label: 'Treble React',
    items: [
      'treble-react-overview',
      'treble-react-threekit-provider',
      'treble-react-player',
      {
        type: 'category',
        collapsible: false,
        label: 'Forms',
        items: ['forms-overview', 'forms-flat-form'],
      },
      {
        type: 'category',
        collapsible: false,
        label: 'Form Components',
        items: [
          'form-components-overview',
          'form-components-cards',
          'form-components-tiles',
          'form-components-tiles-group',
          'form-components-strips',
        ],
      },
      {
        type: 'category',
        collapsible: false,
        label: 'Widgets',
        items: [
          'widgets-overview',
          'widgets-share',
          'widgets-zoom',
          'widgets-snapshots',
        ],
      },
      {
        type: 'category',
        collapsible: false,
        label: 'Wrappers',
        items: [
          'wrappers-overview',
          'wrappers-await-threekit-load',
          'wrappers-portal-to-element',
        ],
      },
      {
        type: 'category',
        collapsible: false,
        label: 'Layouts',
        items: ['layouts-overview', 'layouts-drawer', 'layouts-modal'],
      },
      {
        type: 'category',
        collapsible: false,
        label: 'Displays',
        items: [
          'display-overview',
          'display-product-name',
          'display-product-description',
          'display-attribute-title',
          'display-attribute-value',
          'display-total-price',
        ],
      },
      'treble-react-hooks',
    ],
  },
  {
    type: 'category',
    collapsible: true,
    label: 'Treble JS API',
    items: [
      'treble-js-overview',
      'treble-js-player-api',
      'treble-js-configurator-api',
      'treble-js-treble-api',
    ],
  },
  {
    type: 'category',
    collapsible: true,
    label: 'Tutorial',
    items: ['how-to-build-custom-components'],
  },
];

module.exports = { docs };
