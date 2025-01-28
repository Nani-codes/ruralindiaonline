import { useAlignStyles } from '@/store/alignment_spacing';
import { useLnStyles, useSizeModifier } from '@/store/language_styles_store';
import { Text } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import sanitizeHtml from 'sanitize-html';
const BaseLabel = ({ description }: { description: string | null | undefined }) => {
	// Check if the description is falsy and avoid rendering
	if (!description || description.trim() === '' || description.trim().toLowerCase() === 'null') {
		return null;
	}
	// console.log(description, typeof description);
	const [ln_styles] = useLnStyles();
	const [size_modifier] = useSizeModifier();
	const { width } = useViewportSize();
	const [align_styles] = useAlignStyles();

	const mt = description
		? {
				base: `${align_styles?.xs?.caption_margin_y || 1}rem`,
				sm: `${align_styles?.sm?.caption_margin_y || 1}rem`,
				md: `${align_styles?.md?.caption_margin_y || 1}rem`,
				lg: `${align_styles?.lg?.caption_margin_y || 1}rem`,
				xl: `${align_styles?.xl?.caption_margin_y || 1}rem`,
				xl2: `${align_styles?.xl2?.caption_margin_y || 1}rem`,
		  }
		: {};
	const res = sanitizeHtml(description, {
		// allowedTags: [ 'b', 'i', 'em', 'strong', 'a','span','p' ],
		transformTags: {
			// 'span': 'i',
		},
		allowedStyles: {},
		// allowedAttributes: {
		// 	a: ['href'],
		// },
	});
	return (
		<Text
			ff={{
				base: ln_styles?.xs?.Caption?.font_family,
				sm: ln_styles?.sm?.Caption?.font_family,
				md: ln_styles?.md?.Caption?.font_family,
				lg: ln_styles?.lg?.Caption?.font_family,
				xl: ln_styles?.xl?.Caption?.font_family,
				xl2: ln_styles?.xl2?.Caption?.font_family,
			}}
			fz={{
				base: (ln_styles?.xs?.Caption?.font_size || 1) * size_modifier + 'rem',
				sm: (ln_styles?.sm?.Caption?.font_size || 1) * size_modifier + 'rem',
				md: (ln_styles?.md?.Caption?.font_size || 1) * size_modifier + 'rem',
				lg: (ln_styles?.lg?.Caption?.font_size || 1) * size_modifier + 'rem',
				xl: (ln_styles?.xl?.Caption?.font_size || 1) * size_modifier + 'rem',
				xl2: (ln_styles?.xl2?.Caption?.font_size || 1) * size_modifier + 'rem',
			}}
			lh={{
				base: ln_styles?.xs?.Caption?.line_height + '%',
				sm: ln_styles?.sm?.Caption?.line_height + '%',
				md: ln_styles?.md?.Caption?.line_height + '%',
				lg: ln_styles?.lg?.Caption?.line_height + '%',
				xl: ln_styles?.xl?.Caption?.line_height + '%',
				xl2: ln_styles?.xl2?.Caption?.line_height + '%',
			}}
			fw={{
				base: ln_styles?.xs?.Caption?.font_weight,
				sm: ln_styles?.sm?.Caption?.font_weight,
				md: ln_styles?.md?.Caption?.font_weight,
				lg: ln_styles?.lg?.Caption?.font_weight,
				xl: ln_styles?.xl?.Caption?.font_weight,
				xl2: ln_styles?.xl2?.Caption?.font_weight,
			}}
			lts={{
				base: ln_styles?.xs?.Caption?.letter_spacing + 'rem',
				sm: ln_styles?.sm?.Caption?.letter_spacing + 'rem',
				md: ln_styles?.md?.Caption?.letter_spacing + 'rem',
				lg: ln_styles?.lg?.Caption?.letter_spacing + 'rem',
				xl: ln_styles?.xl?.Caption?.letter_spacing + 'rem',
				xl2: ln_styles?.xl2?.Caption?.letter_spacing + 'rem',
			}}
			{...(description ? { mt } : {})}
			// ta='left'
			px={width >= 768 ? '0rem' : 'md'}
			c='#828282'>
			<div dangerouslySetInnerHTML={{ __html: res }}></div>
		</Text>
	);
};

export default BaseLabel;
