import { useAlignStyles } from '@/store/alignment_spacing';
import { useLnStyles, useSizeModifier } from '@/store/language_styles_store';
import { TypographyStylesProvider, useMantineTheme } from '@mantine/core';
import sanitizeHtml from 'sanitize-html'
const BaseQuote = ({ quote }: { quote: string }) => {
	const [ln_styles] = useLnStyles();
	const [size_modifier] = useSizeModifier();
	const [align_styles] = useAlignStyles();

	const mt = quote
		? {
				base: `${align_styles?.xs?.quote_margin_y || 3}rem`,
				sm: `${align_styles?.sm?.quote_margin_y || 3}rem`,
				md: `${align_styles?.md?.quote_margin_y || 3}rem`,
				lg: `${align_styles?.lg?.quote_margin_y || 3}rem`,
				xl: `${align_styles?.xl?.quote_margin_y || 3}rem`,
				xl2: `${align_styles?.xl2?.quote_margin_y || 3}rem`,
			}
		: {};
	const res = sanitizeHtml(quote, {
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
		<TypographyStylesProvider
			ff={{
				base: ln_styles?.xs?.Quote?.font_family,
				sm: ln_styles?.sm?.Quote?.font_family,
				md: ln_styles?.md?.Quote?.font_family,
				lg: ln_styles?.lg?.Quote?.font_family,
				xl: ln_styles?.xl?.Quote?.font_family,
				xl2: ln_styles?.xl2?.Quote?.font_family,
			}}
			fz={{
				base: (ln_styles?.xs?.Quote?.font_size || 1) * size_modifier + 'rem',
				sm: (ln_styles?.sm?.Quote?.font_size || 1) * size_modifier + 'rem',
				md: (ln_styles?.md?.Quote?.font_size || 1) * size_modifier + 'rem',
				lg: (ln_styles?.lg?.Quote?.font_size || 1) * size_modifier + 'rem',
				xl: (ln_styles?.xl?.Quote?.font_size || 1) * size_modifier + 'rem',
				xl2: (ln_styles?.xl2?.Quote?.font_size || 1) * size_modifier + 'rem',
			}}
			lh={{
				base: ln_styles?.xs?.Quote?.line_height + '%',
				sm: ln_styles?.sm?.Quote?.line_height + '%',
				md: ln_styles?.md?.Quote?.line_height + '%',
				lg: ln_styles?.lg?.Quote?.line_height + '%',
				xl: ln_styles?.xl?.Quote?.line_height + '%',
				xl2: ln_styles?.xl2?.Quote?.line_height + '%',
			}}
			fw={{
				base: ln_styles?.xs?.Quote?.font_weight,
				sm: ln_styles?.sm?.Quote?.font_weight,
				md: ln_styles?.md?.Quote?.font_weight,
				lg: ln_styles?.lg?.Quote?.font_weight,
				xl: ln_styles?.xl?.Quote?.font_weight,
				xl2: ln_styles?.xl2?.Quote?.font_weight,
			}}
			lts={{
				base: ln_styles?.xs?.Quote?.letter_spacing + 'rem',
				sm: ln_styles?.sm?.Quote?.letter_spacing + 'rem',
				md: ln_styles?.md?.Quote?.letter_spacing + 'rem',
				lg: ln_styles?.lg?.Quote?.letter_spacing + 'rem',
				xl: ln_styles?.xl?.Quote?.letter_spacing + 'rem',
				xl2: ln_styles?.xl2?.Quote?.letter_spacing + 'rem',
			}}
			{...(quote ? { mt } : {})}
			c='#B82929'>
			<div dangerouslySetInnerHTML={{ __html: res }}></div>
		</TypographyStylesProvider>
	);
};

export default BaseQuote;
