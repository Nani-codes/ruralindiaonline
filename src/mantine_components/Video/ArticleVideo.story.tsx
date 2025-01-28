import { Meta, StoryObj } from '@storybook/react';

import ArticleVideo from './ArticleVideo';

const meta: Meta<typeof ArticleVideo> = {
	title: 'Components/Article/Video',
	component: ArticleVideo,
	tags: ['typography', 'title', 'autodocs'],
	args: {
		url: 'https://www.youtube.com/embed/L07PWfE9M5w?si=XmvZxK-JXTjw_-m4',
		description: 'Size : Mantine XS Font Size, Video Size: 100% Full Width, Min Height: 32 rem',
	},
};

export default meta;
type Story = StoryObj<typeof ArticleVideo>;

export const Default: Story = {};
