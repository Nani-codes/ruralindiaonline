import { Box, Image, Paper } from '@mantine/core';

import BaseCredits from '../Base/BaseCredits';
import BaseLabel from '../Base/BaseLabel';
import BaseQuote from '../Base/BaseQuote';
import { useAlignStyles } from '@/store/alignment_spacing';

const ArticleImageWithQuote = ({ url, description, credits, quote }: ArticleImageWithQuoteProps) => {
	const [align_styles] = useAlignStyles();
	return (
		<Box>
			<Paper
				m='auto'
				bg='#f4f4f4'
				w={'100%'}
				mt={{
					base: `${align_styles?.xs?.image_margin_y || 3}rem`,
					sm: `${align_styles?.sm?.image_margin_y || 3}rem`,
					md: `${align_styles?.md?.image_margin_y || 3}rem`,
					lg: `${align_styles?.lg?.image_margin_y || 3}rem`,
					xl: `${align_styles?.xl?.image_margin_y || 3}rem`,
					xl2: `${align_styles?.xl2?.image_margin_y || 3}rem`,
				}}>
				<Image src={url} alt={description} w='100%' maw='100%' h='auto' />
			</Paper>
			<Paper px={0} w={{ base: '20rem', sm: '40rem' }} m='auto' bg='#f4f4f4'>
				<BaseLabel description={description} />
				<BaseCredits credits={credits} />
				<BaseQuote quote={quote} />
			</Paper>
		</Box>
	);
};

export default ArticleImageWithQuote;
