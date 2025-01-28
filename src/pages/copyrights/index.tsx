// import Header from '@/common/EducationHeader';
import Header from '@/common/Header/index';
import { IMAGE_URL } from '@/config';
import { Container, Card, Text, Image, Group } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { useEffect, useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import sanitizeHtml from 'sanitize-html';
export default function CopyRights({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { width } = useViewportSize();
	console.log(data);
	const [padding, setPadding] = useState('1em');
	const [navSize, setNavSize] = useState(100);

	useEffect(() => {
		setPadding(`${(width - navSize * 0.5) / 2}px`);
	}, [width, navSize]);
	return (
		<Container fluid bg='#F5F5F5' style={{ paddingLeft: 0, paddingRight: 0 }}>
			<Header setNavSize={setNavSize} />
			<Card bg='#F5F5F5' p={0}>
				<Card.Section>
					<Image
						src={IMAGE_URL + data?.banner_image?.data?.attributes?.url}
						w='100%'
						h={{ base: width / 2, lg: width / 3 }}
					/>
				</Card.Section>
				<Card
					w={{ base: navSize, sm3: '30rem', md: '44.125rem', lg: '44.125rem', xl: '44.125rem', xl2: '55rem', xl3: '55rem' }}
					py={width >= 1024 ? '3.5rem' : '2.5rem'}
					bg={'#FFFFFF'}
					mx='auto'
					mt={{
						xs: '-4em',
						sm: '-4em',
						sm2: '-4em',
						sm3: '-6.5em',
						md: '-6.5em',
						lg: '-9em',
						xl: '-8em',
						xl2: '-8em',
						xl3: '-8em',
					}}
					style={{ borderRadius: '1rem', justifyContent: 'center', alignItems: 'center' }}>
					<Group justify='center' gap={width >= 1024 ? '12px' : '8px'}>
						<Image
							src={IMAGE_URL + data?.Banner_Section?.icon?.data?.attributes?.url}
							alt='PARI Testimonials'
							w={width >= 1024 ? '40px' : '32px'}
							h={width >= 1024 ? '40px' : '32px'}
						/>

						<Text
							c={'#000000'}
							size={width >= 1024 ? '40px' : '24px'}
							style={{
								fontStyle: 'italic',
								fontWeight: 400,
								fontFamily: 'Noto Serif',
								lineHeight: width >= 1024 ? '3.05rem' : '1.83rem',
								letterSpacing: width >= 1024 ? '-0.075rem' : '-0.045rem',
								alignContent: 'center',
							}}>
							{data?.Banner_Section?.Title}
						</Text>
					</Group>

					<Text
						pt={width >= 1024 ? '16px' : '8px'}
						c={'#333333'}
						size={width >= 1024 ? '20px' : '14px'}
						style={{
							fontWeight: 400,
							fontFamily: 'Noto Serif',
							lineHeight: width >= 1024 ? '2.325rem' : '1.575rem',
							letterSpacing: width >= 1024 ? '-0.0125rem' : '-0.00875rem',
							textAlign: 'center',
						}}
						mx='auto'
						w={{
							xs: '15rem',
							sm: '15rem',
							sm2: '22rem',
							sm3: '22rem',
							md: '22rem',
							lg: '22rem',
							xl: '22rem',
							xl2: '22rem',
							xl3: '22rem',
						}}>
						{data?.Banner_Section?.Quote}
					</Text>
				</Card>
			</Card>

			<Card bg='#F5F5F5' px={padding} py={width >= 1024 ? '64px' : '40px'}>
				<Text
					c='#000000'
					size={width >= 1024 ? '28px' : '22px'}
					style={{
						fontWeight: 700,
						fontFamily: 'Noto Sans',
						lineHeight: width >= 1024 ? '2.135rem' : '1.705rem',
						letterSpacing: width >= 1024 ? '-0.07rem' : '-0.055rem',
					}}>
					{data?.CopyRights_Title}
				</Text>

				<Text
					pt={'16px'}
					c='#333333'
					size={width >= 1024 ? '16px' : '15px'}
					style={{
						fontWeight: 400,
						fontFamily: ' Noto Sans',
						lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
						letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
					}}>
					{' '}
					<div
						dangerouslySetInnerHTML={{
							__html: sanitizeHtml(data?.CopyRights_Content, {
								// allowedTags: [ 'b', 'i', 'em', 'strong', 'a','span','p' ],
								transformTags: {
									// 'span': 'i',
								},
								allowedStyles: {},
								// allowedAttributes: {
								// 	a: ['href'],
								// },
							}),
						}}></div>
				</Text>

				<Image
					py={'16px'}
					src={IMAGE_URL + data?.CreativeCommens_Image?.data?.attributes?.url}
					alt='PARI Testimonials'
					w={'150px'}
					h={'36px'}
				/>

				<Text
					c='#333333'
					size={width >= 1024 ? '16px' : '15px'}
					style={{
						fontWeight: 400,
						fontFamily: ' Noto Sans',
						lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
						letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
					}}>
					{' '}
					<div
						dangerouslySetInnerHTML={{
							__html: sanitizeHtml(data?.CreativeCommens_Content, {
								// allowedTags: [ 'b', 'i', 'em', 'strong', 'a','span','p' ],
								transformTags: {
									// 'span': 'i',
								},
								allowedStyles: {},
								// allowedAttributes: {
								// 	a: ['href'],
								// },
							}),
						}}></div>
				</Text>

				<Text
					pt={width >= 1024 ? '64px' : '40px'}
					c='#B82929'
					size={width >= 1024 ? '28px' : '20px'}
					style={{
						fontWeight: 400,
						fontFamily: 'Noto Serif',
						lineHeight: width >= 1024 ? '3.15rem' : '2.25rem',
						letterSpacing: width >= 1024 ? '-0.0175rem' : '-0.0125rem',
					}}>
					{data?.Third_Party_Quote}
				</Text>
				<Text
					pt={'16px'}
					c='#333333'
					size={width >= 1024 ? '16px' : '15px'}
					style={{
						fontWeight: 400,
						fontFamily: ' Noto Sans',
						lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
						letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
					}}>
					{' '}
					<div
						dangerouslySetInnerHTML={{
							__html: sanitizeHtml(data?.Third_Party_Content, {
								// allowedTags: [ 'b', 'i', 'em', 'strong', 'a','span','p' ],
								transformTags: {
									// 'span': 'i',
								},
								allowedStyles: {},
								// allowedAttributes: {
								// 	a: ['href'],
								// },
							}),
						}}></div>
				</Text>

				<Text
					pt={width >= 1024 ? '64px' : '40px'}
					c='#000000'
					size={width >= 1024 ? '28px' : '22px'}
					style={{
						fontWeight: 700,
						fontFamily: 'Noto Sans',
						lineHeight: width >= 1024 ? '2.135rem' : '1.705rem',
						letterSpacing: width >= 1024 ? '-0.07rem' : '-0.055rem',
					}}>
					{data?.Notification_Title}
				</Text>
				<Text
					pt={'16px'}
					c='#333333'
					size={width >= 1024 ? '16px' : '15px'}
					style={{
						fontWeight: 400,
						fontFamily: ' Noto Sans',
						lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
						letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
					}}>
					{' '}
					<div
						dangerouslySetInnerHTML={{
							__html: sanitizeHtml(data?.Notification_Content, {
								// allowedTags: [ 'b', 'i', 'em', 'strong', 'a','span','p' ],
								transformTags: {
									// 'span': 'i',
								},
								allowedStyles: {},
								// allowedAttributes: {
								// 	a: ['href'],
								// },
							}),
						}}></div>
				</Text>
				<Text
					pt={width >= 1024 ? '64px' : '40px'}
					c='#000000'
					size={width >= 1024 ? '28px' : '22px'}
					style={{
						fontWeight: 700,
						fontFamily: 'Noto Sans',
						lineHeight: width >= 1024 ? '2.135rem' : '1.705rem',
						letterSpacing: width >= 1024 ? '-0.07rem' : '-0.055rem',
					}}>
					{data?.Address?.Address_Title}
				</Text>
				<Text
					pt={'16px'}
					c='#333333'
					size={width >= 1024 ? '16px' : '15px'}
					style={{
						fontWeight: 400,
						fontFamily: ' Noto Sans',
						lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
						letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
					}}>
					{' '}
					{data?.Address?.name}
				</Text>
				<Text
					pt={'8px'}
					c='#333333'
					size={width >= 1024 ? '16px' : '15px'}
					style={{
						fontWeight: 400,
						fontFamily: ' Noto Sans',
						lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
						letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
					}}>
					{' '}
					{data?.Address?.Address_line1}
				</Text>
				<Text
					pt={'8px'}
					c='#333333'
					size={width >= 1024 ? '16px' : '15px'}
					style={{
						fontWeight: 400,
						fontFamily: ' Noto Sans',
						lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
						letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
					}}>
					{' '}
					{data?.Address?.Address_line2}
				</Text>
				<Text
					pt={'8px'}
					c='#333333'
					size={width >= 1024 ? '16px' : '15px'}
					style={{
						fontWeight: 400,
						fontFamily: ' Noto Sans',
						lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
						letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
					}}>
					{' '}
					{data?.Address?.Address_line3}
				</Text>
				<Text
					pt={'8px'}
					c='#333333'
					size={width >= 1024 ? '16px' : '15px'}
					style={{
						fontWeight: 400,
						fontFamily: ' Noto Sans',
						lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
						letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
					}}>
					{' '}
					{data?.Address?.Address_line4}
				</Text>
				<Text
					pt={'8px'}
					c='#333333'
					size={width >= 1024 ? '16px' : '15px'}
					style={{
						fontWeight: 400,
						fontFamily: ' Noto Sans',
						lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
						letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
					}}>
					{' '}
					{data?.Address?.Address_line5}
				</Text>
				<Text
					pt={width >= 1024 ? '64px' : '40px'}
					c='#000000'
					size={width >= 1024 ? '28px' : '22px'}
					style={{
						fontWeight: 700,
						fontFamily: 'Noto Sans',
						lineHeight: width >= 1024 ? '2.135rem' : '1.705rem',
						letterSpacing: width >= 1024 ? '-0.07rem' : '-0.055rem',
					}}>
					{data?.EmailAddressLabel}
				</Text>
				<Text
					pt={'16px'}
					c='#333333'
					size={width >= 1024 ? '16px' : '15px'}
					style={{
						fontWeight: 400,
						fontFamily: ' Noto Sans',
						lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
						letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
					}}>
					{' '}
					{data?.EmailAddressValue}
				</Text>
			</Card>
		</Container>
	);
}

export const getServerSideProps = (async ({ locale }) => {
	const copyrightResp = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}api/copyright?populate[banner_image][populate]=*&populate[Banner_Section][populate]=*&populate[Address][populate]=*&populate[CreativeCommens_Image][populate]=*&locale=${locale}`,
	);

	return {
		props: {
			data: copyrightResp?.data.data.attributes,
			messages: require(`@/locales/${locale}.json`),
		},
	};
}) satisfies GetServerSideProps<{ data: any }>;
