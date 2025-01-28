'use client';

import { useEffect, useState } from 'react';

import ArticleAudioWithText from '@/mantine_components/AudioWithText/ArticleAudioWithText';
import ArticleImage from '@/mantine_components/Image/ArticleImage';
import ArticleImageFullWidth from '@/mantine_components/ImageFullWidth/ArticleImageFullWidth';
import ArticleImageMultiCaption from '@/mantine_components/ImageMultiCaption/ArticleImageMultiCaption';
import ArticleImageSingleCaption from '@/mantine_components/ImageSingleCaption/ArticleImageSingleCaption';
import ArticleImageWithQuote from '@/mantine_components/ImageWithQuote/ArticleImageWithQuote';
import ArticleQuote from '@/mantine_components/Quote/ArticleQuote';
import ArticleText from '@/mantine_components/Text/ArticleText';
import ArticleTextQuoteImage from '@/mantine_components/TextQuoteImage/ArticleTextQuoteImage';
import ArticleVideo from '@/mantine_components/Video/ArticleVideo';
import ArticleVideoWithQuote from '@/mantine_components/VideoWithQuote/ArticleVideoWithQuote';
import ArticleVideoWithText from '@/mantine_components/VideoWithText/ArticleVideoWithText';
import { BASE_URL } from '@/config';
import ColumnarText from '@/mantine_components/ColumnarText/ColumnarText';
import Image from 'next/image';
import Link from 'next/link';
import TextWithQuote from '@/mantine_components/TextWithQuote/TextWithQuote';
import axios from 'axios';
import styless from '../../../pages/article/Modular.module.css';
import { useAlignStyles } from '@/store/alignment_spacing';
import { Paper } from '@mantine/core';

export default function ModularContent({ article }: any) {
	const articleId = article.id;
	const [modularContent, setModularContent] = useState(null);
	const [align_styles, setAlignStyles] = useAlignStyles();

	useEffect(() => {
		// axios({
		// 	url: `${BASE_URL}api/articles/${articleId}?populate=deep`,
		// 	method: 'GET',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// })
		// 	.then((response) => {
		// 		setModularContent(response.data.data);
		// 	})
		// 	.catch((error) => {
		// 		console.error(`Failed to fetch modular content data: ${error.message}`);
		// 	});

		setModularContent(article);

		if (!align_styles) {
			axios({
				url: `${BASE_URL}api/alignment-spacing?populate=deep`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((response) => {
					setAlignStyles(response.data?.data?.attributes);
				})
				.catch((error) => {
					console.error(`Failed to fetch alignment spacing data: ${error.message}`);
				});
		}
	}, [articleId]);

	const [modularContentArray, setModularContentArray] = useState([]);

	useEffect(() => {
		const modularContentString = JSON.stringify(modularContent, null, 2);
		const modularContentObject = JSON.parse(modularContentString);
		const modularContentAttributes = modularContentObject?.attributes;
		setModularContentArray(modularContentAttributes?.Modular_Content || []);
	}, [modularContent]);		
	return (
		<>
			<style>
				{`
			@media (max-width: 360px) {
				.paper-responsive {
					padding: 2rem;
				}
			}
		`}
			</style>
			<div className='paper-responsive'>
				{modularContentArray.map((content: any, index: number) => {
					switch (content.__component) {
						case 'modular-content.text':
							return <ArticleText key={index} text={content.Text} />;							
						case 'modular-content.columnar-text':
							return (
								<ColumnarText
									key={index}
									texts={content.Content.map((texts: { Paragraph: string }) => texts.Paragraph)}
								/>
							);
						case 'modular-content.quote-with-text':
							return <TextWithQuote key={index} quote={content?.Quote} text={content?.Text_Content} />;
						case 'modular-content.full-width-quote':
							return <ArticleQuote key={index} quote={content?.full_width_quote} />;
						case 'modular-content.audio-embed-url':
							// const extractUrl = (iframeStringOrUrl: any) => {
							// 	if (iframeStringOrUrl.includes('<iframe')) {
							// 		const tempDiv = document.createElement('div');
							// 		tempDiv.innerHTML = iframeStringOrUrl;
							// 		const iframe = tempDiv.querySelector('iframe');
							// 		return iframe ? iframe.src : null;
							// 	}
							// 	return iframeStringOrUrl;
							// };

							// const audioUrl = extractUrl(content?.audio_embed_url);
							// return (
							// 	<ArticleAudioWithText key={index} url={audioUrl} description={content?.caption} text={content?.content} />
							// );
							const extractIframeDetails = (iframeStringOrUrl: any) => {
								// Initialize default attributes
								let result = {
									url: iframeStringOrUrl,
									width: null,
									height: null,
								};

								// Check if the input contains an <iframe> tag
								if (iframeStringOrUrl.includes('<iframe')) {
									const tempDiv = document.createElement('div');
									tempDiv.innerHTML = iframeStringOrUrl;
									const iframe = tempDiv.querySelector('iframe');

									if (iframe) {
										result.url = iframe.src || null;
										result.width = iframe.getAttribute('width') || null;
										result.height = iframe.getAttribute('height') || null;
									}
								}

								return result;
							};

							// Extract the details from the audio_embed_url
							const {
								url: audioUrl,
								width: iframeWidth,
								height: iframeHeight,
							} = extractIframeDetails(content?.audio_embed_url);

							return (
								<ArticleAudioWithText
									key={index}
									url={audioUrl}
									width={iframeWidth} // Pass the extracted width
									height={iframeHeight} // Pass the extracted height
									description={content?.caption}
									text={content?.content}
								/>
							);
						case 'modular-content.embed-with-text':
							return (
								<ArticleVideoWithText
									key={index}
									url={content?.video_url}
									description={content?.Video_caption}
									text={content?.content}
									vh={content?.video_height}
								/>
							);
						case 'modular-content.video-embed-url':
							return (
								<ArticleVideo
									key={index}
									url={content?.video_embed_url}
									description={content?.Video_caption}
									vh={content?.video_height}
								/>
							);
						case 'modular-content.video-with-quote':
							return (
								<ArticleVideoWithQuote
									key={index}
									url={content?.Video}
									description={content?.Video_caption}
									quote={content?.Quote}
									vh={content?.video_height}
								/>
							);
						case 'modular-content.full-width-image':
							return (
								<ArticleImageFullWidth
									key={index}
									url={`${process.env.NEXT_PUBLIC_API_URL}${content?.full_width_image?.data?.attributes?.url}`}
									description={content?.caption}
									credits={content?.credits?.data?.attributes?.Name}
								/>
							);
						case 'modular-content.image-with-quote-and-text':
							return (
								<ArticleImageWithQuote
									key={index}
									url={`${process.env.NEXT_PUBLIC_API_URL}${content?.Image?.data?.attributes?.url}`}
									description={content?.Image_caption}
									credits={content?.credits?.data?.attributes?.Name}
									quote={content?.Quote}
								/>
							);
						case 'modular-content.text-quote-image':
							return (
								<ArticleTextQuoteImage
									key={index}
									url={`${process.env.NEXT_PUBLIC_API_URL}${content?.Image?.data?.attributes?.url}`}
									description={content?.Image_caption}
									credits={content?.credits?.data?.attributes?.Name}
									quote={content?.Quote}
									text={content?.content[0]?.Paragraph}
								/>
							);
						case 'modular-content.columnar-images-with-text':
							return (
								<ArticleImageMultiCaption
									key={index}
									images={content?.Image?.map((image: any) => {
										return {
											url: `${process.env.NEXT_PUBLIC_API_URL}${image?.image?.data?.attributes?.url}`,
											description: image?.Caption,
											height: image?.height,
											credits: image?.credits?.data?.attributes?.Name,
										};
									})}
								/>
							);
						case 'modular-content.single-caption-mul-img':
							return (
								<ArticleImageSingleCaption
									key={index}
									images={content?.images?.map((image: any) => {
										return {
											url: `${process.env.NEXT_PUBLIC_API_URL}${image?.image?.data?.attributes?.url}`,
										};
									})}
									height={content?.height}
									text={content?.content}
									credits={content?.images}
									description={content?.caption}
								/>
							);
					}
					
					if (content.__component === 'modular-content.page-reference-with-text') {
						// console.log(content);

						return (
							<Paper p={0} w={{ base: '100%', lg: '60rem' }} m='auto' bg='#F4F4F4'>
								<Link href={`/article/${content?.article?.data?.attributes?.slug}`}>
									<div
										key={index}
										style={{
											paddingTop: '16px',
											paddingBottom: '16px',
											display: 'flex',
											flexDirection: content.Align_image === 'left' ? 'row' : 'row-reverse',
										}}>
										<div
											style={{
												flex: 1,
												display: 'flex',
												flexDirection: 'column',
												alignItems: content.Align_image === 'left' ? 'flex-start' : 'flex-end',
											}}>
											<div
												style={{
													textAlign: content.Align_content === 'default' ? 'left' : content.Align_content,
												}}
												dangerouslySetInnerHTML={{ __html: content?.Text_Content }}
											/>
										</div>

										<div
											style={{
												marginLeft: content.Align_image === 'left' ? '16px' : 0,
												marginRight: content.Align_image === 'right' ? '16px' : 0,
											}}>
											<Image
												src={`${process.env.NEXT_PUBLIC_API_URL}${content?.article?.data?.attributes?.Cover_image?.data?.attributes?.url}`}
												alt={content?.Image_caption}
												width={120}
												height={120}
												style={{
													borderRadius: '10px',
													height: '120px',
													width: '100px',
												}}
												loading='lazy'
											/>
											<p style={{ marginTop: '8px', color: 'red' }}>
												{content?.article?.data?.attributes?.Title}
											</p>
										</div>
									</div>
								</Link>
							</Paper>
						);
					}
					return (
						<div
							key={index}
							style={{
								fontSize: '15px',
								textAlign: content.align_content === 'default' ? 'left' : content.align_content,
							}}
							dangerouslySetInnerHTML={{ __html: content?.Text }}
						/>
					);
				})}
			</div>
		</>
	);
}
