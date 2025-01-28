// import Header from '@/common/EducationHeader';
import Header from '@/common/Header/index';
import { IMAGE_URL } from '@/config';
import { Card, Container, Text, Image, Group, Button } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import axios from 'axios';
import EducationContext from '@/lib/EducationContext';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { useContext, useEffect, useState } from 'react';

export default function Grievance({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { width } = useViewportSize();
	const educationValues = useContext(EducationContext);
	const [padding, setPadding] = useState('1em');
	const [navSize, setNavSize] = useState(100);
	// console.log(data);

	useEffect(() => {
		setPadding(`${(width - navSize * 0.85) / 2}px`);
	}, [width, navSize]);
	return (
		<Container fluid bg='#F5F5F5' style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: width >= 1024 ? '64px' : '40px' }}>
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
						md: '-9em',
						lg: '-10em',
						xl: '-10em',
						xl2: '-10em',
						xl3: '-10em',
					}}
					style={{ borderRadius: '1rem', justifyContent: 'center', alignItems: 'center' }}>
					<Group justify='center' gap={width >= 1024 ? '12px' : '8px'}>
						<Image
							src={IMAGE_URL + data?.Grievance_Banner_Card?.icon?.data?.attributes?.url}
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
							{data?.Grievance_Banner_Card?.Title}
						</Text>
					</Group>
					<Text
						pt={width >= 1024 ? '16px' : '8px'}
						pb={width >= 1024 ? '40px' : '32px'}
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
						{data?.Grievance_Banner_Card?.Quote}
					</Text>
					{/* <Button
						variant='filled'
						radius='3rem'
						color='#B82929'
						styles={{
							root:
								width >= 1024
									? { paddingTop: '10px', paddingBottom: '10px', paddingLeft: '24px', paddingRight: '24px' }
									: { paddingTop: '8px', paddingBottom: '8px', paddingLeft: '16px', paddingRight: '16px' },
						}}
						style={{
							fontSize: width >= 1024 ? '15px' : '14px',
							fontStyle: 'normal',
							fontWeight: 500,
							fontFamily: 'Noto Sans',
							lineHeight: width >= 1024 ? '1.6785rem' : '1.4rem',
							letterSpacing: width >= 1024 ? '-0.01875rem' : '-0.02625rem',
						}}>
						Contact Us
					</Button> */}
				</Card>
			</Card>

			<Card bg='#F5F5F5' px={padding} pt={width >= 1024 ? '64px' : '40px'} pb={'8px'}>
				<Text
					c='#000000'
					size={width >= 1024 ? '28px' : width <= 413 ? '18px' : '22px'}
					style={{
						fontWeight: 700,
						fontFamily: 'Noto Sans',
						lineHeight: width >= 1024 ? '2.275rem' : '1.7875rem',
						letterSpacing: width >= 1024 ? '-0.0875rem' : '-0.06875rem',
					}}>
					{data?.Grievance_Content.Grievance_Title}
				</Text>
				<Text
					pt={'8px'}
					c='#B82929'
					size={width >= 1024 ? '24px' : '18px'}
					style={{
						fontWeight: 400,
						fontFamily: ' Noto Serif',
						lineHeight: width >= 1024 ? '2.64rem' : '2.1375rem',
						letterSpacing: width >= 1024 ? '-0.015rem' : '-0.01125rem',
					}}>
					{data?.Grievance_Content.Grievance_Description}
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
					{data?.Grievance_Content.Grievance_Content}
				</Text>
			</Card>

			<Group
				bg='#F5F5F5'
				justify='flex-start'
				mx={{
					base: padding,
					sm3: +educationValues.padding.split('px')[0] * 5 + 'px',
					md: +educationValues.padding.split('px')[0] * 1.5 + 'px',
					lg: +educationValues.padding.split('px')[0] + 72 + 'px',
				}}>
				<Card
					radius={'32px'}
					bg='#F5F5F5'
					pl={'12px'}
					py={'7px'}
					w={{ base: '100%', sm3: '50%', lg: '40%' }}
					pr={{ base: '12px', sm2: '1.5rem', md: '12px' }}
					style={{ border: '1px solid #B82929', borderRadius: '32px' }}>
					<Text
						c='#333333'
						size={width >= 1024 ? '16px' : '15px'}
						style={{
							fontWeight: 400,
							fontFamily: ' Noto Sans',
							lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
							letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
						}}>
						{data?.Grievance_Address.nameLabel}: {data?.Grievance_Address.name}
					</Text>
					<Text
						c='#333333'
						size={width >= 1024 ? '16px' : '15px'}
						style={{
							fontWeight: 400,
							fontFamily: ' Noto Sans',
							lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
							letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
						}}>
						{data?.Grievance_Address.Designation}
					</Text>
					<Text
						c='#333333'
						size={width >= 1024 ? '16px' : '15px'}
						style={{
							fontWeight: 400,
							fontFamily: ' Noto Sans',
							lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
							letterSpacing: width >= 1024 ? '-0.028125rem' : '-0.028125rem',
						}}>
						{data?.Grievance_Address.Address_field_1}
					</Text>
					<Text
						c='#333333'
						size={width >= 1024 ? '16px' : '15px'}
						style={{
							fontWeight: 400,
							fontFamily: ' Noto Sans',
							lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
							letterSpacing: width >= 1024 ? '-0.028125rem' : '-0.028125rem',
						}}>
						{data?.Grievance_Address.emailLabel}: {data?.Grievance_Address.email}
					</Text>
					<Text
						c='#333333'
						size={width >= 1024 ? '16px' : '15px'}
						style={{
							fontWeight: 400,
							fontFamily: ' Noto Sans',
							lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
							letterSpacing: width >= 1024 ? '-0.028125rem' : '-0.028125rem',
						}}>
						{data?.Grievance_Address.phoneLabel} : {data?.Grievance_Address.phone}
					</Text>
				</Card>
			</Group>
			<Card bg='#F5F5F5' px={padding} pt={width >= 1024 ? '24px' : '10px'} pb={'8px'}>
				<Text
					pt={width >= 1024 ? '24px' : '10px'}
					c='#000000'
					size={width >= 1024 ? '28px' : '22px'}
					style={{
						fontWeight: 700,
						fontFamily: 'Noto Sans',
						lineHeight: width >= 1024 ? '2.135rem' : '1.705rem',
						letterSpacing: width >= 1024 ? '-0.07rem' : '-0.055rem',
					}}>
					{data?.GrievancesRelatingtoSexualMisconductLabel}
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
					{data?.GrievancesRelatingtoSexualMisconductValue}
				</Text>
			</Card>
		</Container>
	);
}

export const getServerSideProps = (async ({ locale }) => {
	const grievanceResp = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}api/grievance?populate[Grievance_Banner_Card][populate]=*&populate[Grievance_Content][populate]=*&populate[Grievance_Address][populate]=*&populate[banner_image][populate]=*&locale=${locale}`,
	);

	return {
		props: {
			data: grievanceResp?.data.data.attributes,
			messages: require(`@/locales/${locale}.json`),
		},
	};
}) satisfies GetServerSideProps<{ data: any }>;
