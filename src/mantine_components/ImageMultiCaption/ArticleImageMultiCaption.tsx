'use client';

import { useAlignStyles } from '@/store/alignment_spacing';
import { useLnStyles, useSizeModifier } from '@/store/language_styles_store';
import { Box, Group, Image, Paper, Stack, Text } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
import sanitizeHtml from 'sanitize-html';

const ImageStack = ({ url, description, credits, height }: { url: string; description: string; credits: string; height: string }) => {
	const imageContainer = useRef<HTMLImageElement>(null);
	const [textWidth, setTextWidth] = useState<number>(0);
	const [ln_styles] = useLnStyles();
	const { width } = useViewportSize();
	const [align_styles] = useAlignStyles();
	useEffect(() => {
		setTextWidth(imageContainer?.current?.width || 0);
	}, [imageContainer.current, imageContainer.current?.width]);
	const [size_modifier] = useSizeModifier();
	const mt = description
		? {
				base: `${align_styles?.xs?.caption_margin_y || 0.5}rem`,
				sm: `${align_styles?.sm?.caption_margin_y || 0.5}rem`,
				md: `${align_styles?.md?.caption_margin_y || 0.5}rem`,
				lg: `${align_styles?.lg?.caption_margin_y || 0.5}rem`,
				xl: `${align_styles?.xl?.caption_margin_y || 0.5}rem`,
				xl2: `${align_styles?.xl2?.caption_margin_y || 0.5}rem`,
		  }
		: {};

	const mt1 = credits
		? {
				base: `${align_styles?.xs?.credits_margin_y || 0.5}rem`,
				sm: `${align_styles?.sm?.credits_margin_y || 0.5}rem`,
				md: `${align_styles?.md?.credits_margin_y || 0.5}rem`,
				lg: `${align_styles?.lg?.credits_margin_y || 0.5}rem`,
				xl: `${align_styles?.xl?.credits_margin_y || 0.5}rem`,
				xl2: `${align_styles?.xl2?.credits_margin_y || 0.5}rem`,
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
		<Stack align='flex-start' gap='0'>
			<Box
				h={{ md: `${height}px` }}
				px={0}
				mt={{
					base: `${align_styles?.xs?.image_margin_y || 3}rem`,
					sm: `${align_styles?.sm?.image_margin_y || 3}rem`,
					md: `${align_styles?.md?.image_margin_y || 3}rem`,
					lg: `${align_styles?.lg?.image_margin_y || 3}rem`,
					xl: `${align_styles?.xl?.image_margin_y || 3}rem`,
					xl2: `${align_styles?.xl2?.image_margin_y || 3}rem`,
				}}>
				<Image
					ref={imageContainer}
					src={url}
					alt={description}
					h={{ base: 'auto', md: `${height}px` }}
					w={{ base: '100%', md: 'auto' }}
					maw='100%'
				/>
			</Box>
			<Box px={0} w='min-content'>
				<Text
					w={textWidth}
					// ta='left'
					pl={width >= 768 ? '0rem' : 'md'}
					c='#828282'
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
					{...(description ? { mt } : {})}>
					<div
						style={{
							// Optional: Change text color for contrast
							overflow: 'hidden', // Prevents overflow without scrollbars
							maxWidth: '100%', // Ensure the div doesn't exceed the width of its parent
							// padding: '10px', // Add some padding for better appearance
							boxSizing: 'border-box', // Include padding in width calculation
							wordWrap: 'break-word', // Allows long words to break and fit within the container
						}}
						dangerouslySetInnerHTML={{ __html: res }}></div>
				</Text>
				<Text
					w={textWidth}
					fs='italic'
					// ta='left'
					pl={width >= 768 ? '0rem' : 'md'}
					c='#B82929'
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
					{...(credits ? { mt1 } : {})}>
					Photo - {credits}
				</Text>
			</Box>
		</Stack>
	);
};

const ArticleImageMultiCaption = ({ images }: ArticleImageMultiCaptionProps) => {
	return (
		<Paper p={0} w='100%' bg='#F4F4F4'>
			<Group align='flex-start' justify='center'>
				{images?.map((image, index) => (
					<ImageStack key={index} {...image} />
				))}
			</Group>
		</Paper>
	);
};

export default ArticleImageMultiCaption;
