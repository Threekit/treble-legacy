import React from 'react';

import { Tabs } from './index';
const { TabPane } = Tabs;

const items = [
  {
    label: 'First Section',
    content: 'This is some content in the first section',
  },
  {
    label: 'Second Section',
    content: 'This is different content for a different section',
  },
];

export default {
  title: 'Layouts/Tabs',
  component: TabPane,
};

const Template = args => (
  <Tabs {...args}>
    {items.map((el, i) => (
      <TabPane key={i} label={args.label}>
        {el.content}
      </TabPane>
    ))}
  </Tabs>
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Section',
};
