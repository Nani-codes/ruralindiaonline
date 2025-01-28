import { Box, Paper } from '@mantine/core';

import BaseLabel from '../Base/BaseLabel';

import { useAlignStyles } from '@/store/alignment_spacing';

const ArticleAudio = ({ url, description }: ArticleAudioProps) => {
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
				<iframe src={url} width={'100%'} height={'30px'} style={{ minHeight: '30px' }} />
			</Box>
			<BaseLabel description={description} />
		</Paper>
	);
};

export default ArticleAudio;
