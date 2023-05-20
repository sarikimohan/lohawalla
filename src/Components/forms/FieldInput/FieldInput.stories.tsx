// FieldInput.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import FieldInput from './FieldInput';
import style from './FieldInput.stories.module.css'

const meta: Meta<typeof FieldInput> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'FieldInput',
  component: FieldInput,
};

export default meta;
type Story = StoryObj<typeof FieldInput>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <FieldInput type={'number'} placeHolder={''} />,
};

export const Secondary: Story = {
  render: () => <FieldInput type={'number'} placeHolder={''} />,
};

export const Tertiary: Story = {
  render: () => <FieldInput type={'number'} placeHolder={''} />,
};