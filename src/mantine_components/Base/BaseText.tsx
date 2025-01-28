import { useAlignStyles } from '@/store/alignment_spacing';
import { useLnStyles, useSizeModifier } from '@/store/language_styles_store';
import { Paper, Text, TypographyStylesProvider, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import test from 'node:test';
import sanitizeHtml from 'sanitize-html';

const BaseText = ({ text }: { text: string }) => {
	const theme = useMantineTheme();
	const { colorScheme } = useMantineColorScheme();
	const [ln_styles] = useLnStyles();
	const [size_modifier] = useSizeModifier();
	const [align_styles] = useAlignStyles();
	const res = sanitizeHtml(text, {
		// allowedTags: [ 'b', 'i', 'em', 'strong', 'a','span','p' ],
		transformTags: {
			// 'span': 'i',
		},
		allowedStyles: {},
		// allowedAttributes: {
		// 	a: ['href'],
		// },
	});

	const mt = text
		? {
				base: `${align_styles?.xs?.text_margin_y || 3}rem`,
				sm: `${align_styles?.sm?.text_margin_y || 3}rem`,
				md: `${align_styles?.md?.text_margin_y || 3}rem`,
				lg: `${align_styles?.lg?.text_margin_y || 3}rem`,
				xl: `${align_styles?.xl?.text_margin_y || 3}rem`,
				xl2: `${align_styles?.xl2?.text_margin_y || 3}rem`,
			}
		: {};

	return (
		<TypographyStylesProvider
			ff={{
				base: ln_styles?.xs?.Text?.font_family,
				sm: ln_styles?.sm?.Text?.font_family,
				md: ln_styles?.md?.Text?.font_family,
				lg: ln_styles?.lg?.Text?.font_family,
				xl: ln_styles?.xl?.Text?.font_family,
				xl2: ln_styles?.xl2?.Text?.font_family,
			}}
			fz={{
				base: (ln_styles?.xs?.Text?.font_size || 1) * size_modifier + 'rem',
				sm: (ln_styles?.sm?.Text?.font_size || 1) * size_modifier + 'rem',
				md: (ln_styles?.md?.Text?.font_size || 1) * size_modifier + 'rem',
				lg: (ln_styles?.lg?.Text?.font_size || 1) * size_modifier + 'rem',
				xl: (ln_styles?.xl?.Text?.font_size || 1) * size_modifier + 'rem',
				xl2: (ln_styles?.xl2?.Text?.font_size || 1) * size_modifier + 'rem',
			}}
			lh={{
				base: ln_styles?.xs?.Text?.line_height + '%',
				sm: ln_styles?.sm?.Text?.line_height + '%',
				md: ln_styles?.md?.Text?.line_height + '%',
				lg: ln_styles?.lg?.Text?.line_height + '%',
				xl: ln_styles?.xl?.Text?.line_height + '%',
				xl2: ln_styles?.xl2?.Text?.line_height + '%',
			}}
			fw={{
				base: ln_styles?.xs?.Text?.font_weight,
				sm: ln_styles?.sm?.Text?.font_weight,
				md: ln_styles?.md?.Text?.font_weight,
				lg: ln_styles?.lg?.Text?.font_weight,
				xl: ln_styles?.xl?.Text?.font_weight,
				xl2: ln_styles?.xl2?.Text?.font_weight,
			}}
			lts={{
				base: ln_styles?.xs?.Text?.letter_spacing + 'rem',
				sm: ln_styles?.sm?.Text?.letter_spacing + 'rem',
				md: ln_styles?.md?.Text?.letter_spacing + 'rem',
				lg: ln_styles?.lg?.Text?.letter_spacing + 'rem',
				xl: ln_styles?.xl?.Text?.letter_spacing + 'rem',
				xl2: ln_styles?.xl2?.Text?.letter_spacing + 'rem',
			}}
			{...(text ? { mt } : {})}
			c={colorScheme === 'light' ? '#202020' : '#E0E0E0'}>
			<div
				style={{ // Optional: Change text color for contrast
					overflow: 'hidden', // Prevents overflow without scrollbars
					maxWidth: '100%', // Ensure the div doesn't exceed the width of its parent
					// padding: '10px', // Add some padding for better appearance
					boxSizing: 'border-box', // Include padding in width calculation
					wordWrap: 'break-word', // Allows long words to break and fit within the container
				}}
				dangerouslySetInnerHTML={{ __html: res }}></div>
		</TypographyStylesProvider>
	);
};

export default BaseText;