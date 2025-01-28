import { Meta, StoryObj } from '@storybook/react';

import ArticleImage from './ArticleImageWithQuote';

const meta: Meta<typeof ArticleImage> = {
  title: 'Components/Article/Image With Quote',
  component: ArticleImage,
  tags: ['typography', 'title', 'autodocs'],
  args: {
    url: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
    description: 'Size : Mantine XS Font Size',
    credits: 'Color: #828282, Padding: Mantine MD Spacing',
    quote:
      'Size : Mantine XL Font Size; Color #B82929; Padding: Base: Mantine SM Spacing, MD: Mantine MD Spacing, XL: Mantine XL Spacing; Line Height: Mantine XL',
    locale: 'en',
  },
};

export default meta;
type Story = StoryObj<typeof ArticleImage>;

export const Default: Story = {};
