import { Meta, StoryObj } from '@storybook/react';

import ArticleImage from './ArticleImageFullWidth';

const meta: Meta<typeof ArticleImage> = {
	title: 'Components/Article/Image',
	component: ArticleImage,
	tags: ['typography', 'title', 'autodocs'],
	args: {
		url: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
		description: 'Size : Mantine XS Font Size',
		credits: 'Color: #B82929, Padding: Mantine MD Spacing',
	},
};

export default meta;
type Story = StoryObj<typeof ArticleImage>;

export const Default: Story = {};
