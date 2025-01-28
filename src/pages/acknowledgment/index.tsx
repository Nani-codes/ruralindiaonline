import { IMAGE_URL } from '@/config';
import { Container, Card, Text, Image, Group, SimpleGrid } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { useEffect, useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
// import Header from '@/common/EducationHeader';
import Header from '@/common/Header/index';
export default function Acknowledgment({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { width } = useViewportSize();
	const [sanitizedContent, setSanitizedContent] = useState('');

	const [padding, setPadding] = useState('1em');
	const [navSize, setNavSize] = useState(100);

	useEffect(() => {
		setPadding(`${(width - navSize * 0.85) / 2}px`);
	}, [width, navSize]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setSanitizedContent(DOMPurify.sanitize(data?.Acknowledgment_Content || ''));
		}
	}, [data?.Acknowledgment_Content]);
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
					w={{
						// base: navSize,
						xss: '15rem',
						sm3: '30rem',
						md: '44.125rem',
						lg: '44.125rem',
						xl: '44.125rem',
						xl2: '55rem',
						xl3: '55rem',
					}}
					py={width >= 1024 ? '3.5rem' : '2.5rem'}
					bg={'#FFFFFF'}
					mx='auto'
					mt={{
						xss: '-5em',
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
							w={width >= 1024 ? '40px' : '35px'}
							h={width >= 1024 ? '35px' : '30px'}
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
								textAlign: 'center',
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
						lineHeight: width >= 1024 ? '2.275rem' : '1.7875rem',
						letterSpacing: width >= 1024 ? '-0.0875rem' : '-0.06875rem',
					}}>
					{data?.Acknowledgment_Title}
				</Text>

				<Text
					pt={'8px'}
					pb={width >= 1024 ? '40px' : '0px'}
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
							__html: sanitizedContent,
						}}></div>
				</Text>

				{data?.Contribution_list?.map((check: any, index: number) => {
					return (
						<>
							<Text
								pt={width >= 1024 ? '24px' : '40px'}
								pb={'16px'}
								key={`check${index}`}
								c='#828282'
								style={{
									fontSize: '15px',
									fontWeight: 600,
									fontFamily: 'Noto Sans',
									lineHeight: '1.276875rem',
									letterSpacing: '-0.01875rem',
								}}>
								{check?.Title}
							</Text>
							<SimpleGrid cols={{ xs: 1, sm: 1, sm2: 1, sm3: 3, md: 3, lg: 4, xl: 4, xl2: 4, xl3: 4 }}>
								{check.acknowledgment_list?.map((data: any, i: number) => {
									return (
										<Text
											key={`data${i}`}
											c='#000000'
											style={{
												fontSize: '10px',
												fontWeight: 600,
												fontFamily: 'Noto Sans',
												lineHeight: '0.85125rem',
												letterSpacing: '-0.0125rem',
											}}>
											{data?.name}
										</Text>
									);
								})}
							</SimpleGrid>
						</>
					);
				})}
			</Card>
		</Container>
	);
}

export const getServerSideProps = (async ({ locale }) => {
	const acknowledgmentResp = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}api/acknowledgment?populate[banner_image][populate]=*&populate[Banner_Section][populate]=*&populate[Contribution_list][populate]=*&populate[acknowledgment_list][populate]=*&locale=${locale}`,
	);

	return {
		props: {
			data: acknowledgmentResp?.data.data.attributes,
			messages: require(`@/locales/${locale}.json`),
		},
	};
}) satisfies GetServerSideProps<{ data: any }>;
