import { Meta, StoryObj } from '@storybook/react';

import ArticleQuote from './ArticleQuote';

const meta: Meta<typeof ArticleQuote> = {
  title: 'Components/Article/Quote',
  component: ArticleQuote,
  tags: ['typography', 'title', 'autodocs'],
  args: {
    quote:
      'Size : Mantine XL Font Size; Color #B82929; Padding: Base: Mantine SM Spacing, MD: Mantine MD Spacing, XL: Mantine XL Spacing; Line Height: Mantine XL',
    locale: 'en',
  },
};

export default meta;
type Story = StoryObj<typeof ArticleQuote>;

export const Default: Story = {};
