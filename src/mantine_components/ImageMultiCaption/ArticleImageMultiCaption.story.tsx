import { Meta, StoryObj } from '@storybook/react';

import ArticleImageMultiCaption from './ArticleImageMultiCaption';

const meta: Meta<typeof ArticleImageMultiCaption> = {
	title: 'Components/Article/Image - Multi Caption',
	component: ArticleImageMultiCaption,
	tags: ['typography', 'title', 'autodocs'],
	args: {
		images: [
			{
				url: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
				description: 'Size : Mantine XS Font Size',
				credits: 'Color: #828282, Padding: Mantine MD Spacing',
				height: '420',
			},
		],
	},
};

export default meta;
type Story = StoryObj<typeof ArticleImageMultiCaption>;

export const Default: Story = {};
