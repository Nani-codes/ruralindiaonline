import { Meta, StoryObj } from '@storybook/react';

import ArticleImageSingleCaption from './ArticleImageSingleCaption';

const meta: Meta<typeof ArticleImageSingleCaption> = {
	title: 'Components/Article/Image - Multi Caption',
	component: ArticleImageSingleCaption,
	tags: ['typography', 'title', 'autodocs'],
	args: {
		images: [
			{
				url: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
			},
		],
		credits: 'Color: #828282, Padding: Mantine MD Spacing',
		description: 'Size : Mantine XS Font Size',
		text: 'Color: #828282, Padding: Mantine MD Spacing',
		height: '360',
	},
};

export default meta;
type Story = StoryObj<typeof ArticleImageSingleCaption>;

export const Default: Story = {};
