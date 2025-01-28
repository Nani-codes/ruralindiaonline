// import Header from '@/common/EducationHeader';
import Header from '@/common/Header/index';
import { IMAGE_URL } from '@/config';
import { Card, Container, Group, Text, Image } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { useEffect, useState } from 'react';
import GetInTouch_Form from './GIT_Model';
import DOMPurify from 'isomorphic-dompurify';
import sanitizeHtml from 'sanitize-html';

export default function GetInTouch({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { width } = useViewportSize();

	const [padding, setPadding] = useState('1em');
	const [navSize, setNavSize] = useState(100);

	useEffect(() => {
		setPadding(`${(width - navSize * 0.85) / 2}px`);
	}, [width, navSize]);
	return (
		<Container fluid bg='#F5F5F5' style={{ paddingLeft: 0, paddingRight: 0 }}>
			<Header setNavSize={setNavSize} />
			<Card bg='#F5F5F5' p={0}>
				<Card.Section>
					<Image
						src={IMAGE_URL + data?.Banner_Image?.data?.attributes?.url}
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
							src={IMAGE_URL + data?.GetInTouch_Banner?.Banner_icon?.data?.attributes?.url}
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
							{data?.GetInTouch_Banner?.Banner_Title}
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
						{data?.GetInTouch_Banner?.Banner_Quote}
					</Text>
				</Card>
			</Card>

			<Card bg='#F5F5F5' px={padding} py={width >= 1024 ? '24px' : '10px'}>
				<GetInTouch_Form data={data} />

				<Text
					c='#000000'
					size={width >= 1024 ? '28px' : '22px'}
					style={{
						fontWeight: 700,
						fontFamily: 'Noto Sans',
						lineHeight: width >= 1024 ? '2.275rem' : '1.7875rem',
						letterSpacing: width >= 1024 ? '-0.0875rem' : '-0.06875rem',
					}}>
					{data?.form_Title}
				</Text>

				<Text
					pt={width >= 1024 ? '24px' : '10px'}
					c='#181818'
					size={width >= 1024 ? '24px' : '18px'}
					style={{
						fontWeight: 600,
						fontFamily: 'Noto Sans',
						lineHeight: width >= 1024 ? '1.95rem' : '1.59375rem',
						letterSpacing: width >= 1024 ? '-0.075rem' : '-0.045rem',
					}}>
					{data?.ToContribute_Title}
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
					<div
						dangerouslySetInnerHTML={{
							__html: sanitizeHtml(data?.ToContribute_Description, {
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
					c='#181818'
					size={width >= 1024 ? '24px' : '18px'}
					style={{
						fontWeight: 600,
						fontFamily: 'Noto Sans',
						lineHeight: width >= 1024 ? '1.95rem' : '1.59375rem',
						letterSpacing: width >= 1024 ? '-0.075rem' : '-0.045rem',
					}}>
					{data?.VolunteerForPari_Title}
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
					<div
						dangerouslySetInnerHTML={{
							__html: sanitizeHtml(data?.VolunteerForPari_Content, {
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
					c='#181818'
					size={width >= 1024 ? '24px' : '18px'}
					style={{
						fontWeight: 600,
						fontFamily: 'Noto Sans',
						lineHeight: width >= 1024 ? '1.95rem' : '1.59375rem',
						letterSpacing: width >= 1024 ? '-0.075rem' : '-0.045rem',
					}}>
					{data?.DonateToPari_Title}
				</Text>
				<Text
					pt={'8px'}
					pb={width >= 1024 ? '64px' : '40px'}
					c='#333333'
					size={width >= 1024 ? '16px' : '15px'}
					style={{
						fontWeight: 400,
						fontFamily: ' Noto Sans',
						lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
						letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
					}}>
					<div
						dangerouslySetInnerHTML={{
							__html: sanitizeHtml(data?.DonateToPari_content, {
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
			</Card>
		</Container>
	);
}

export const getServerSideProps = (async ({ locale }) => {
	const GetInTouchResp = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}api/get-in-touch?populate[GetInTouch_Banner][populate]=*&populate[Banner_Image][populate]=*&locale=${locale}`,
	);

	// console.log(GetInTouchResp.data);

	return {
		props: {
			data: GetInTouchResp?.data.data.attributes,
			messages: require(`@/locales/${locale}.json`),
		},
	};
}) satisfies GetServerSideProps<{ data: any }>;
