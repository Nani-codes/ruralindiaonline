import { Meta, StoryObj } from '@storybook/react';

import ArticleVideo from './ArticleVideoWithText';

const meta: Meta<typeof ArticleVideo> = {
	title: 'Components/Article/Video With Text',
	component: ArticleVideo,
	tags: ['typography', 'title', 'autodocs'],
	args: {
		url: 'https://www.youtube.com/embed/L07PWfE9M5w?si=XmvZxK-JXTjw_-m4',
		description: 'Size : Mantine XS Font Size, Video Size: 100% Full Width, Min Height: 32 rem',
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
type Story = StoryObj<typeof ArticleVideo>;

export const Default: Story = {};
