import type { Meta, StoryObj } from '@storybook/react';

import Clock from './Clock';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Example/Clock',
  component: Clock,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Clock>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Clock',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Clock',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Clock',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Clock',
  },
};
