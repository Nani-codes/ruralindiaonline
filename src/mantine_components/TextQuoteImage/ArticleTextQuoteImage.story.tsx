import { Meta, StoryObj } from '@storybook/react';

import ArticleTextQuoteImage from './ArticleTextQuoteImage';

const meta: Meta<typeof ArticleTextQuoteImage> = {
	title: 'Components/Article/Text - Quote - Image',
	component: ArticleTextQuoteImage,
	tags: ['typography', 'title', 'autodocs'],
	args: {
		url: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
		description: 'Size : Mantine XS Font Size',
		credits: 'Color: #828282, Padding: Mantine MD Spacing',
		quote: 'Size : Mantine XL Font Size; Color #B82929; Padding: Base: Mantine SM Spacing, MD: Mantine MD Spacing, XL: Mantine XL Spacing; Line Height: Mantine XL',
		text: `
    <p><b>Size</b> : Mantine MD Font Size</p> 
      
    <p><b>Light Theme Color</b> : #333333, <i>Dark Theme Color</i>: #EOEOEO</p>
    
    <p><b>Padding</b> : Mantine MD Spacing</p>

    <p><b>Margin</b> : Base: SM Spacing, MD: MD Spacing, XL: XL Spacing</p>

    <p><b>Text</b> : Rich Text Enabled</p>
    `,
	},
};

export default meta;
type Story = StoryObj<typeof ArticleTextQuoteImage>;

export const Default: Story = {};
