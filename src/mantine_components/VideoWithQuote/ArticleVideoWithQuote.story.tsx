import { Meta, StoryObj } from '@storybook/react';

import ArticleVideoWithQuote from './ArticleVideoWithQuote';

const meta: Meta<typeof ArticleVideoWithQuote> = {
	title: 'Components/Article/Video With Quote',
	component: ArticleVideoWithQuote,
	tags: ['typography', 'title', 'autodocs'],
	args: {
		url: 'https://www.youtube.com/embed/L07PWfE9M5w?si=XmvZxK-JXTjw_-m4',
		description: 'Size : Mantine XS Font Size, Video Size: 100% Full Width, Min Height: 32 rem',
		quote: 'Size : Mantine XL Font Size; Color #B82929; Padding: Base: Mantine SM Spacing, MD: Mantine MD Spacing, XL: Mantine XL Spacing; Line Height: Mantine XL',
	},
};

export default meta;
type Story = StoryObj<typeof ArticleVideoWithQuote>;

export const Default: Story = {};
