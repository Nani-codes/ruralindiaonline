import { Box, Image, Paper, useMantineTheme } from '@mantine/core';

import BaseCredits from '../Base/BaseCredits';
import BaseLabel from '../Base/BaseLabel';
import { useAlignStyles } from '@/store/alignment_spacing';

const ArticleImage = ({ url, description, credits }: ArticleImageProps) => {
	const theme = useMantineTheme();
	const [align_styles] = useAlignStyles();
	return (
		<Paper p={0} w={{ base: '100%', sm: '40rem' }} m='auto' bg='#F4F4F4'>
			<Box
				w={{ base: '100%', sm: '40rem' }}
				m='auto'
				bg='#F4F4F4'
				mt={{
					base: `${align_styles?.xs?.image_margin_y || 3}rem`,
					sm: `${align_styles?.sm?.image_margin_y || 3}rem`,
					md: `${align_styles?.md?.image_margin_y || 3}rem`,
					lg: `${align_styles?.lg?.image_margin_y || 3}rem`,
					xl: `${align_styles?.xl?.image_margin_y || 3}rem`,
					xl2: `${align_styles?.xl2?.image_margin_y || 3}rem`,
				}}>
				<Image src={url} alt={description} w={{ base: '100%', sm: '40rem' }} maw='100%' />
			</Box>
			<Paper px={0} w={{ base: '20rem', sm: '40rem' }} m='auto' bg='#f4f4f4'>
				<BaseLabel description={description} />
				<BaseCredits credits={credits} />
			</Paper>
		</Paper>
	);
};

export default ArticleImage;
