import { Box, Paper } from '@mantine/core';

import BaseLabel from '../Base/BaseLabel';

import ReactPlayer from 'react-player/lazy';
import { useAlignStyles } from '@/store/alignment_spacing';

const ArticleVideo = ({ url, description, vh }: ArticleVideoProps) => {
	const [align_styles] = useAlignStyles();
	return (
		<Box>
			<Box
				w={{ base: '100%', md: '40rem' }}
				h={vh ? `${vh}px` : '390px'}
				px={0}
				mx='auto'
				mt={{
					base: `${align_styles?.xs?.video_margin_y || 3}rem`,
					sm: `${align_styles?.sm?.video_margin_y || 3}rem`,
					md: `${align_styles?.md?.video_margin_y || 3}rem`,
					lg: `${align_styles?.lg?.video_margin_y || 3}rem`,
					xl: `${align_styles?.xl?.video_margin_y || 3}rem`,
					xl2: `${align_styles?.xl2?.video_margin_y || 3}rem`,
				}}>
				<ReactPlayer url={url} width={'100%'} height={vh ? `${vh}px` : '390px'} style={{ margin: 'auto' }} />
			</Box>
			<Paper px={0} w={{ base: '20rem', sm: '40rem' }} m='auto' bg='#f4f4f4'>
				<BaseLabel description={description} />
			</Paper>
		</Box>
	);
};

export default ArticleVideo;
