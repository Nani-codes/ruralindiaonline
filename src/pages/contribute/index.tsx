// import Header from '@/common/EducationHeader';
import Header from '@/common/Header/index';
import { IMAGE_URL } from '@/config';
import { Card, Container, Group, Text, Image, SimpleGrid, Button, useMantineTheme, Space } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { useEffect, useState } from 'react';
import Contribution_Card from './Contribute_Card';
import DOMPurify from 'isomorphic-dompurify';

export default function Contribute({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { width } = useViewportSize();
	const theme = useMantineTheme();

	const [padding, setPadding] = useState('1em');
	const [navSize, setNavSize] = useState(100);

	useEffect(() => {
		setPadding(`${(width - navSize * 0.85) / 2}px`);
	}, [width, navSize]);
	// console.log(padding);
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
							src={IMAGE_URL + data?.Contribute_Banner_Section?.Banner_icon?.data?.attributes?.url}
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
							{data?.Contribute_Banner_Section?.Banner_Title}
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
						{data?.Contribute_Banner_Section?.Banner_Quote}
					</Text>
				</Card>
			</Card>

			<Card bg='#F5F5F5' px={padding} py={width >= 1024 ? '64px' : '40px'}>
				<Text
					c='#000000'
					size={width >= 1024 ? '56px' : '32px'}
					style={{
						fontWeight: 700,
						fontFamily: 'Noto Sans',
						lineHeight: width >= 1024 ? '4.27rem' : '2.48rem',
						letterSpacing: width >= 1024 ? '-0.14rem' : '-0.08rem',
					}}>
					{data?.Contribute_Title_Section?.Contribute_Title}
				</Text>

				<Text
					c='#B82929'
					size={width >= 1024 ? '24px' : '18px'}
					style={{
						fontWeight: 400,
						fontFamily: 'Noto Serif',
						lineHeight: width >= 1024 ? '2.64rem' : '2.1375rem',
						letterSpacing: width >= 1024 ? '-0.015rem' : '-0.01125rem',
					}}>
					{data?.Contribute_Title_Section?.Sub_Title}
				</Text>
				<Space h='8px' />
				<Text
					c='#333333'
					size={width >= 1024 ? '16px' : '15px'}
					style={{
						fontWeight: 400,
						fontFamily: 'Noto Sans',
						lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
						letterSpacing: width >= 1024 ? '-0.03rem' : '-0.009375rem',
					}}>
					{data?.Contribute_Title_Section?.Contribute_content}
				</Text>
			</Card>

			<SimpleGrid
				px={padding}
				py={width >= 1024 ? '64px' : '40px'}
				maw={navSize}
				mx='auto'
				cols={{ base: 1, xl: 2, sm: 1, md: 2, lg: 2 }}
				spacing='64px'
				verticalSpacing={width >= 1024 ? '48px' : '32px'}>
				{data?.Contribution_Card?.sort((a: any, b: any) => a.serial_no - b.serial_no)?.map((data: any, i: any) => {
					return (
						<Contribution_Card
							key={data + `${i}`}
							Icon={IMAGE_URL + data?.icon?.data?.attributes?.url}
							title={data?.Title}
							description={data?.Description}
						/>
					);
				})}
			</SimpleGrid>

			<Card
				bg='#F5F5F5'
				maw={navSize}
				mx='auto'
				// px='0'
				py={width >= 1024 ? '64px' : '40px'}
				px={padding}>
				<Text
					c='#000000'
					size={width >= 1024 ? '28px' : '22px'}
					style={{
						fontWeight: 700,
						fontFamily: 'Noto Sans',
						lineHeight: width >= 1024 ? '2.275rem' : '1.7875rem',
						letterSpacing: width >= 1024 ? '-0.0875rem' : '-0.06875rem',
					}}>
					{data?.Contribute_Upload_Content?.Upload_Title}
				</Text>
				<Space h='8px' />

				<Text
					c='#333333'
					style={{
						fontSize: '16px',
						fontWeight: 400,
						fontFamily: ' Noto Sans',
						lineHeight: '1.7rem',
						letterSpacing: '-0.01rem',
					}}>
					<div
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(data?.Contribute_Upload_Content?.Upload_Description),
						}}></div>
				</Text>
				<Space h='16px' />

				<Group justify='flex-start' gap='md'>
					<Button
						variant='filled'
						radius='3rem'
						styles={{
							label: { paddingTop: '8px', paddingBottom: '8px', paddingRight: '16px', paddingLeft: '16px' },
							root: { padding: '0' },
						}}
						color='#B82929'
						style={{
							border: '2px solid #B82929',
							fontSize: '14px',
							fontWeight: 500,
							fontFamily: 'Noto Sans',
							lineHeight: '1.4rem',
							letterSpacing: '-0.02625rem',
						}}>
						Upload content
					</Button>
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
					{data?.DonateToPari_Title}
				</Text>
				<Space h='8px' />
				<Text
					c='#333333'
					style={{
						fontSize: '16px',
						fontWeight: 400,
						fontFamily: ' Noto Sans',
						lineHeight: '1.7rem',
						letterSpacing: '-0.01rem',
					}}>
					{data?.DonateToPari_content}
				</Text>
			</Card>
			{/* <DonateToPari /> */}
		</Container>
	);
}

export const getServerSideProps = (async ({ locale }) => {
	const ContributeResp = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}api/contribute?populate[Contribute_Banner_Section][populate]=*&populate[Banner_Image][populate]=*&populate[Contribute_Title_Section][populate]=*&populate[Contribution_Card][populate]=*&populate[Contribute_Upload_Content][populate]=*&locale=${locale}`,
	);

	// console.log(ContributeResp.data);

	return {
		props: {
			data: ContributeResp?.data.data.attributes,
			messages: require(`@/locales/${locale}.json`),
		},
	};
}) satisfies GetServerSideProps<{ data: any }>;
