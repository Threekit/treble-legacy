import React from 'react';

import { Swatch } from './index';

const props = {
  title: 'Swatch Attribute Title',
  description: 'This is the description for the Swatch attribute.',
  value: 'dortmund',
  showThumbnail: true,
  showDescription: true,
  showPrice: true,
  options: [
    {
      value: 'celtic',
      name: 'Celtic',
      description: 'This is bob',
      price: '$50',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Celtic_FC.svg/1200px-Celtic_FC.svg.png',
    },
    {
      value: 'arsenal',
      name: 'Arsenal',
      description: 'This is bob',
      price: '$500',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
    },
    {
      value: 'dortmund',
      name: 'Dortmund',
      description: 'This is an example of a much longer description.',
      price: '$50',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/1200px-Borussia_Dortmund_logo.svg.png',
    },
    {
      value: 'color',
      name: 'Color',
      description: 'This is bob',
      price: '$50',
      color: '#51a455',
    },
  ],
};

export default {
  title: 'Form Components/Swatch',
  component: Swatch,
  argTypes: { onClick: { action: 'clicked' } },
};

const Template = args => <Swatch {...args} />;

export const Default = Template.bind({});
Default.args = props;

export const Square = Template.bind({});
Square.args = { ...props, shape: 'square' };
