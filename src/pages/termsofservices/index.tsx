import DOMPurify from 'isomorphic-dompurify';

// import Header from '@/common/EducationHeader';
import Header from '@/common/Header/index';
import { IMAGE_URL } from '@/config';
import { Card, Container, Group, Text, Image, useMantineTheme, List, SimpleGrid, Grid, Table, Space } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { useEffect, useState } from 'react';
// import DOMPurify from 'dompurify';

export default function TermsofService({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { width } = useViewportSize();
	const theme = useMantineTheme();
	const [padding, setPadding] = useState('1em');
	const [navSize, setNavSize] = useState(100);
	// console.log(data);
	useEffect(() => {
		// console.log('data', data);
		setPadding(`${(width - navSize * 0.85) / 2}px`);
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
							src={IMAGE_URL + data?.TOS_Banner_Section?.Banner_icon?.data[0]?.attributes?.url}
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
							}}>
							{data?.TOS_Banner_Section?.Banner_Title}
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
						{data?.TOS_Banner_Section?.Banner_Quote}
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
					{data?.TermsandConditions_Title}
				</Text>

				<Group mt='8px'>
					{data?.TermsAndConditionsPoints?.sort(
						(a: { text: string; serial_no: number }, b: { text: string; serial_no: number }) => {
							return a.serial_no - b.serial_no;
						},
					).map((point: { text: string; serial_no: number }, index: number) => {
						return (
							<Group align='flex-start'>
								<Text w='1rem'>{point.serial_no}.</Text>
								<Text
									maw='90%'
									key={index}
									c='#333333'
									style={{
										fontWeight: 400,
										fontFamily: ' Noto Sans',
										lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
										letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
									}}>
									{point.text}
								</Text>
							</Group>
						);
					})}
				</Group>
				<Text
					pt={width >= 1024 ? '64px' : '40px'}
					c='#000000'
					size={width >= 1024 ? '28px' : '22px'}
					style={{
						fontWeight: 700,
						fontFamily: 'Noto Sans',
						lineHeight: width >= 1024 ? '2.275rem' : '1.7875rem',
						letterSpacing: width >= 1024 ? '-0.0875rem' : '-0.06875rem',
					}}>
					{data?.PrivacyPolicy_Title}
				</Text>

				<Group mt='8px'>
					{data?.PrivacyPolicyPoints?.sort(
						(a: { text: string; serial_no: number }, b: { text: string; serial_no: number }) => {
							return a.serial_no - b.serial_no;
						},
					).map((point: { text: string; serial_no: number }, index: number) => {
						return (
							<Group align='flex-start'>
								<Text w='1rem'>{point.serial_no}.</Text>
								<Text
									maw='90%'
									key={index}
									c='#333333'
									style={{
										fontWeight: 400,
										fontFamily: ' Noto Sans',
										lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
										letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
									}}>
									{point.text}
								</Text>
							</Group>
						);
					})}
				</Group>

				<Text
					pt={width >= 1024 ? '64px' : '40px'}
					c='#000000'
					size={width >= 1024 ? '28px' : '22px'}
					style={{
						fontWeight: 700,
						fontFamily: 'Noto Sans',
						lineHeight: width >= 1024 ? '2.275rem' : '1.7875rem',
						letterSpacing: width >= 1024 ? '-0.0875rem' : '-0.06875rem',
					}}>
					{data?.DonatePari_Title}
				</Text>
				<Text
					pt={'8px'}
					c='#333333'
					style={{
						fontWeight: 400,
						fontFamily: ' Noto Sans',
						lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
						letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
					}}>
					<div
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(data?.DonateToPariContentWithLink),
						}}></div>
					{/* {} */}
				</Text>
				{/* <DonateToPari /> */}
			</Card>
		</Container>
	);
}
export const getServerSideProps = (async ({ locale }) => {
	const TOSResp = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}api/terms-of-service?populate[TOS_Banner_Section][populate]=*&populate[banner_image][populate]=*&populate[TermsAndConditionsPoints][populate]=*&populate[PrivacyPolicyPoints][populate]=*&locale=${locale}`,
	);

	// console.log(TOSResp.data);

	return {
		props: {
			data: TOSResp?.data.data.attributes,
			messages: require(`@/locales/${locale}.json`),
		},
	};
}) satisfies GetServerSideProps<{ data: any }>;
