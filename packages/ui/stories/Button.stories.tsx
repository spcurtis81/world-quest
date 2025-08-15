import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../src/primitives/Button';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
};
export default meta;

export const Primary: StoryObj<typeof Button> = {
  args: { children: 'Click me' },
};
