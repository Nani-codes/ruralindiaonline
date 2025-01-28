import { Meta, StoryObj } from '@storybook/react';

import ArticleAudio from './ArticleAudio';

const meta: Meta<typeof ArticleAudio> = {
	title: 'Components/Article/Audio',
	component: ArticleAudio,
	tags: ['typography', 'title', 'autodocs'],
	args: {
		url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1722695025&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true',
		description: 'Size : Mantine XS Font Size, Audio Size: 100% Full Width, Min Height: 300px',
	},
};

export default meta;
type Story = StoryObj<typeof ArticleAudio>;

export const Default: Story = {};
