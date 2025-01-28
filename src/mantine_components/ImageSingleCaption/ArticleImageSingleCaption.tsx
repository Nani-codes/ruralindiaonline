import { useAlignStyles } from '@/store/alignment_spacing';
import { Box, Container, Group, Image, Paper, Stack } from '@mantine/core';
import { useRef } from 'react';
import BaseLabel from '../Base/BaseLabel';
import BaseCredits from '../Base/BaseCredits';
import BaseText from '../Base/BaseText';
import { useViewportSize } from '@mantine/hooks';

const ImageStack = ({ url, height, isSecondImage }: { url: string; height: string; isSecondImage?: boolean }) => {
	const imageContainer = useRef<HTMLImageElement>(null);
	const [align_styles] = useAlignStyles();

	return (
		<Stack align='flex-start' gap='0'>
			<Box
				h={{ md: `${height}px` }}
				px={0}
				mt={{
					base: isSecondImage ? 32 : `${align_styles?.xs?.image_margin_y || 3}rem`,
					sm: isSecondImage ? 32 : `${align_styles?.sm?.image_margin_y || 3}rem`,
					md: isSecondImage ? 32 : `${align_styles?.md?.image_margin_y || 3}rem`,
					lg: isSecondImage ? 32 : `${align_styles?.lg?.image_margin_y || 3}rem`,
					xl: `${align_styles?.xl?.image_margin_y || 3}rem`,
					xl2: `${align_styles?.xl2?.image_margin_y || 3}rem`,
				}}>
				<Image
					ref={imageContainer}
					src={url}
					h={{ base: 'auto', md: `${height}px` }}
					w={{ base: '100vw', sm2: '100vw', md: '100vw', lg: 'auto' }}
					maw='100%'
				/>
			</Box>
		</Stack>
	);
};

	const ArticleImageSingleCaption = ({ images, description, height, text, credits }: ArticleImageSingleCaptionProps) => {
		const { width } = useViewportSize();

		
		return (
			<Box>
				<Paper p={0} w='100%' bg='#F4F4F4'>
					<Group align='flex-start' justify='center' gap={width >= 1280 ? '1rem' : '0rem'}>
						{images?.map((image, index) => (
							<div>
								<ImageStack key={index} {...image} height={height} isSecondImage={index == 1 || index == 2} />
								<BaseCredits credits={credits[index].credit.data.attributes.Name} />
							</div>

						))}
					</Group>
				</Paper>
				<Paper px={0} w={{ base: '100vw', sm: '40rem' }} m='auto' bg='#f4f4f4'>
					<BaseLabel description={description} />
					<BaseText text={text} />
				</Paper>
			</Box>
		);
	};

export default ArticleImageSingleCaption;
