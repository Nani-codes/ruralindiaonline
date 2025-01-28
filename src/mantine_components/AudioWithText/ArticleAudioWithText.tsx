import { useAlignStyles } from '@/store/alignment_spacing';
import BaseLabel from '../Base/BaseLabel';
import BaseText from '../Base/BaseText';
import { Box, Paper } from '@mantine/core';

const ArticleAudioWithText = ({ url, description, text, width, height }: ArticleAudioWithTextProps) => {
	const [align_styles] = useAlignStyles();

	return (
		<Paper px={0} w={{ base: '20rem', sm: '40rem' }} m='auto' bg='#f4f4f4'>
			<Box
				mt={{
					base: `${align_styles?.xs?.audio_margin_y || 3}rem`,
					sm: `${align_styles?.sm?.audio_margin_y || 3}rem`,
					md: `${align_styles?.md?.audio_margin_y || 3}rem`,
					lg: `${align_styles?.lg?.audio_margin_y || 3}rem`,
					xl: `${align_styles?.xl?.audio_margin_y || 3}rem`,
					xl2: `${align_styles?.xl2?.audio_margin_y || 3}rem`,
				}}>
				<iframe src={url} width={'100%'} height={height ?? '300px'} style={{ minHeight: height ?? '300px' }} />
			</Box>
			<BaseLabel description={description} />
			<BaseText text={text} />
		</Paper>
	);
};

export default ArticleAudioWithText;
