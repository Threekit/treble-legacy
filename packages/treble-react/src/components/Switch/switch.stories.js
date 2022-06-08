import React from 'react';

import { Switch } from './index';

const props = {
  title: 'Swatch Attribute Title',
  description: 'This is the description for the Swatch attribute.',
  value: true,
};

export default {
  title: 'Form Components/Switch',
  component: Switch,
  argTypes: { onClick: { action: 'clicked' } },
};

const Template = args => <Switch {...args} />;

export const SwitchComponent = Template.bind({});
SwitchComponent.args = props;
