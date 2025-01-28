import { Meta, StoryObj } from '@storybook/react';

import TextWithQuote from './TextWithQuote';

const meta: Meta<typeof TextWithQuote> = {
	title: 'Components/Article/Text - Quote',
	component: TextWithQuote,
	tags: ['typography', 'title', 'autodocs'],
	args: {
		quote: 'Size : Mantine XL Font Size; Color #B82929; Width: 100vw; Padding: 0; Line Height: Mantine XL',
		text: 'Size : Mantine XL Font Size; Color #B82929; Width: 100vw; Padding: 0; Line Height: Mantine XL',
		locale: 'en',
	},
};

export default meta;
type Story = StoryObj<typeof TextWithQuote>;

export const Default: Story = {};
