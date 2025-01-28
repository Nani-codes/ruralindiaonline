import { Meta, StoryObj } from '@storybook/react';

import ArticleAudioWithText from './ArticleAudioWithText';

const meta: Meta<typeof ArticleAudioWithText> = {
	title: 'Components/Article/Audio - Text',
	component: ArticleAudioWithText,
	tags: ['typography', 'title', 'autodocs'],
	args: {
		url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1722695025&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true',
		description: 'Size : Mantine XS Font Size, Audio Size: 100% Full Width, Min Height: 300px',
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
type Story = StoryObj<typeof ArticleAudioWithText>;

export const Default: Story = {};
