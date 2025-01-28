import { useAlignStyles } from '@/store/alignment_spacing';
import { useLnStyles, useSizeModifier } from '@/store/language_styles_store';
import { Text, useMantineTheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

const BaseCredits = ({ credits }: { credits: string }) => {
	const [ln_styles] = useLnStyles();
	const [size_modifier] = useSizeModifier();
	const [align_styles] = useAlignStyles();
	const { width } = useViewportSize();
	return (
		<Text
			ff={{
				base: ln_styles?.xs?.Credits?.font_family,
				sm: ln_styles?.sm?.Credits?.font_family,
				md: ln_styles?.md?.Credits?.font_family,
				lg: ln_styles?.lg?.Credits?.font_family,
				xl: ln_styles?.xl?.Credits?.font_family,
				xl2: ln_styles?.xl2?.Credits?.font_family,
			}}
			fz={{
				base: (ln_styles?.xs?.Credits?.font_size || 1) * size_modifier + 'rem',
				sm: (ln_styles?.sm?.Credits?.font_size || 1) * size_modifier + 'rem',
				md: (ln_styles?.md?.Credits?.font_size || 1) * size_modifier + 'rem',
				lg: (ln_styles?.lg?.Credits?.font_size || 1) * size_modifier + 'rem',
				xl: (ln_styles?.xl?.Credits?.font_size || 1) * size_modifier + 'rem',
				xl2: (ln_styles?.xl2?.Credits?.font_size || 1) * size_modifier + 'rem',
			}}
			lh={{
				base: ln_styles?.xs?.Credits?.line_height + '%',
				sm: ln_styles?.sm?.Credits?.line_height + '%',
				md: ln_styles?.md?.Credits?.line_height + '%',
				lg: ln_styles?.lg?.Credits?.line_height + '%',
				xl: ln_styles?.xl?.Credits?.line_height + '%',
				xl2: ln_styles?.xl2?.Credits?.line_height + '%',
			}}
			fw={{
				base: ln_styles?.xs?.Credits?.font_weight,
				sm: ln_styles?.sm?.Credits?.font_weight,
				md: ln_styles?.md?.Credits?.font_weight,
				lg: ln_styles?.lg?.Credits?.font_weight,
				xl: ln_styles?.xl?.Credits?.font_weight,
				xl2: ln_styles?.xl2?.Credits?.font_weight,
			}}
			lts={{
				base: ln_styles?.xs?.Credits?.letter_spacing + 'rem',
				sm: ln_styles?.sm?.Credits?.letter_spacing + 'rem',
				md: ln_styles?.md?.Credits?.letter_spacing + 'rem',
				lg: ln_styles?.lg?.Credits?.letter_spacing + 'rem',
				xl: ln_styles?.xl?.Credits?.letter_spacing + 'rem',
				xl2: ln_styles?.xl2?.Credits?.letter_spacing + 'rem',
			}}
			// mt={{
			// 	base: `${align_styles?.xs?.credits_margin_y || 1}rem`,
			// 	sm: `${align_styles?.sm?.credits_margin_y || 1}rem`,
			// 	md: `${align_styles?.md?.credits_margin_y || 1}rem`,
			// 	lg: `${align_styles?.lg?.credits_margin_y || 1}rem`,
			// 	xl: `${align_styles?.xl?.credits_margin_y || 1}rem`,
			// 	xl2: `${align_styles?.xl2?.credits_margin_y || 1}rem`,
			// }}
			// ta='left'
			px={width >= 768 ? '0rem' : 'md'}
			c='#B82929'>
			Photo - {credits}
		</Text>
	);
};

export default BaseCredits;
