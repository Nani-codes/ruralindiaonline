// import Header from '@/common/EducationHeader';
import Header from '@/common/Header/index';
import { IMAGE_URL } from '@/config';
import { Card, Container, Text, Image, Group, Tabs, useMantineTheme, Space } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { useEffect, useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import sanitizeHtml from 'sanitize-html';


export default function Guideline({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { width } = useViewportSize();
	const theme = useMantineTheme();
	const [padding, setPadding] = useState('1em');
	const [navSize, setNavSize] = useState(100);
	const router = useRouter();

	useEffect(() => {
		setPadding(`${(width - navSize * 0.85) / 2}px`);
		// console.log('check', data?.Guidelines_Cards);
	}, [width, navSize]);
	const [activeTab, setActiveTab] = useState<string | null>(data.Guidelines_Cards[0].Main_Title);
	useEffect(() => {
		// // console.log('router', router.asPath.split('#')[1]?.replaceAll('%20', ' '));
		let checkTab = router.asPath.split('#')[1]?.replaceAll('%20', ' ');

		if (checkTab) setActiveTab(checkTab);
	}, [router]);
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
							w={width >= 1024 ? '40px' : '26px'}
							h={width >= 1024 ? '35px' : '23px'}
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
						lineHeight: width >= 1024 ? '2.275rem' : '1.7875rem',
						letterSpacing: width >= 1024 ? '-0.0875rem' : '-0.06875rem',
					}}>
					{data?.Guidelines_Title}
				</Text>
				<Space h='8px' />
				<Text
					pb={width >= 1024 ? '64px' : '40px'}
					c='#B82929'
					size={width >= 1024 ? '24px' : '18px'}
					style={{
						fontWeight: 400,
						fontFamily: 'Noto Serif',
						lineHeight: width >= 1024 ? '2.64rem' : '2.1375rem',
						letterSpacing: width >= 1024 ? '-0.015rem' : '-0.01125rem',
					}}>
					{data?.Contributers_List}
				</Text>

				<Tabs
					p={0}
					color={'#B82929'}
					variant='pills'
					radius='1.5rem'
					value={activeTab}
					onChange={setActiveTab}
					// onChange={(value) => router.push(`/tabs/${value}`)}
					defaultValue={data?.Guidelines_Cards[0].Main_Title}
					style={{ background: '#f5f5f5' }}
					styles={{
						tab: { paddingTop: '4px', paddingBottom: '4px', paddingRight: '12px', paddingLeft: '12px' },
						list: {
							gap: '8px',
						},
					}}
					py={'8px'}>
					<Tabs.List
						style={{ background: 'white', borderRadius: '24px', boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)' }}
						px='8px'
						py='8px'
						mx='auto'>
						{data?.Guidelines_Cards?.map((card: any, index: number) => {
							return (
								<Link href={`#${card?.Main_Title}`}>
									<Tabs.Tab
										key={`card${index}`}
										value={card?.Main_Title}
										style={{
											fontSize: '14px',
											fontWeight: '500',
											borderRadius: '3rem',
											letterSpacing: '-0.02625rem',
											lineHeight: '1.4rem',
											fontFamily: 'Noto Sans',
										}}
										id={card?.Main_Title}
										styles={{
											tabLabel: {
												color: activeTab === card?.Main_Title ? '#FFFFFF' : '#828282',
											},
										}}>
										{card?.Main_Title}
									</Tabs.Tab>
								</Link>
							);
						})}
					</Tabs.List>

					{data?.Guidelines_Cards?.map((card: any, index: number) => {
						return (
							<Tabs.Panel key={`card${index}`} value={card?.Main_Title}>
								<Text
									mt={width >= 1024 ? '64px' : '40px'}
									c='#181818'
									size={width >= 1024 ? '28px' : '22px'}
									style={{
										fontWeight: 700,
										fontFamily: 'Noto Serif',
										lineHeight: width >= 1024 ? '2.275rem' : '1.7875rem',
										letterSpacing: width >= 1024 ? '-0.0875rem' : '-0.06875rem',
										alignContent: 'center',
									}}>
									{card?.Main_Title}
								</Text>
								{card?.Inner_Content?.sort((a: any, b: any) => a.serial_no - b.serial_no).map((test: any, i: any) => (
									<Card key={`test${i}`} bg='#f5f5f5' p='0'>
										<Text
											pt={width >= 1024 ? '64px' : '40px'}
											c='#181818'
											size={width >= 1024 ? '24px' : '18px'}
											style={{
												fontWeight: 600,
												fontFamily: 'Noto Serif',
												lineHeight: width >= 1024 ? '2.1rem' : '1.575rem',
												letterSpacing: width >= 1024 ? '-0.06rem' : '-0.045rem',
												alignContent: 'center',
											}}>
											{test?.Title}
										</Text>
										<Space h='8px' />
										<Text
											c='#333333'
											size={width >= 1024 ? '16px' : '15px'}
											style={{
												fontWeight: 400,
												fontFamily: ' Noto Sans',
												lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
												letterSpacing: width >= 1024 ? '-0.03rem' : '-0.028125rem',
											}}>
											<div
												dangerouslySetInnerHTML={{
													__html: sanitizeHtml(test?.Content, {
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
								))}
							</Tabs.Panel>
						);
					})}
				</Tabs>
			</Card>
		</Container>
	);
}
export const getServerSideProps = (async ({ locale }) => {
	const guidelineResp = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}api/guideline?populate[banner_image][populate]=*&populate[Banner_Section][populate]=*&populate[Guidelines_Cards][populate]=*&populate[Inner_Content][populate]=*`,
	);

	return {
		props: {
			data: guidelineResp?.data.data.attributes,
			messages: require(`@/locales/${locale}.json`),
		},
	};
}) satisfies GetServerSideProps<{ data: any }>;
