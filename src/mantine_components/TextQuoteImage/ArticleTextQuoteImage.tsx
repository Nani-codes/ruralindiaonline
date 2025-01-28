import { Box, Image, Paper } from '@mantine/core';

import BaseCredits from '../Base/BaseCredits';
import BaseLabel from '../Base/BaseLabel';
import BaseQuote from '../Base/BaseQuote';
import BaseText from '../Base/BaseText';
import { useAlignStyles } from '@/store/alignment_spacing';

const ArticleTextQuoteImage = ({ url, description, credits, quote, text }: ArticleTextQuoteImageProps) => {
	const [align_styles] = useAlignStyles();
	return (
		<Box>
			<Paper
				p={0}
				w={{ base: '100%', lg: '60rem' }}
				mx='auto'
				bg='#F4F4F4'
				mt={{
					base: `${align_styles?.xs?.image_margin_y || 3}rem`,
					sm: `${align_styles?.sm?.image_margin_y || 3}rem`,
					md: `${align_styles?.md?.image_margin_y || 3}rem`,
					lg: `${align_styles?.lg?.image_margin_y || 3}rem`,
					xl: `${align_styles?.xl?.image_margin_y || 3}rem`,
					xl2: `${align_styles?.xl2?.image_margin_y || 3}rem`,
				}}>
				<Image src={url} alt={description} w='100%' h='auto' />
				<Paper px={0} w={{ base: '20rem', sm: '40rem' }} m='auto' bg='#f4f4f4'>
					<BaseLabel description={description} />
					{credits && <BaseCredits credits={credits} />}
					<BaseText text={text} />
					<BaseQuote quote={quote} />
				</Paper>
			</Paper>
		</Box>
	);
};

export default ArticleTextQuoteImage;
