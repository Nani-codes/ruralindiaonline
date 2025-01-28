import { Meta, StoryObj } from '@storybook/react';

import ArticleText from './ArticleText';

const meta: Meta<typeof ArticleText> = {
  title: 'Components/Article/Text',
  component: ArticleText,
  tags: ['typography', 'title', 'autodocs'],
  args: {
    text: `
    <p><b>Size</b> : Mantine MD Font Size</p> 
      
    <p><b>Light Theme Color</b> : #333333, <i>Dark Theme Color</i>: #EOEOEO</p>
    
    <p><b>Padding</b> : Mantine MD Spacing</p>

    <p><b>Margin</b> : Base: SM Spacing, MD: MD Spacing, XL: XL Spacing</p>

    <p><b>Text</b> : Rich Text Enabled</p>
    `,
    locale: 'en',
  },
};

export default meta;
type Story = StoryObj<typeof ArticleText>;

export const Default: Story = {};
