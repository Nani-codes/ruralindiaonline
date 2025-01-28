'use client';

import { FaceBook, Instagram, Twiter, Youtube } from '@/common/@the-source/Icon';
import { Avatar, Button, Flex, Grid, Group, Paper, SimpleGrid, Space, Text, TextInput } from '@mantine/core';
import { BASE_URL, IMAGE_URL } from '@/config';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Footer() {
	const router = useRouter();
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		async function test() {
			const res = await axios({
				url: `${BASE_URL}api/footer?locale=${router.locale}&populate=deep,5`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (res.status !== 200) {
				throw new Error('Failed to fetch data');
			}
			setData(res?.data?.data?.attributes);
		}
		test();
	}, [router.locale]);
	// console.log(data);

	return (
		<Paper
			px={{ base: 'sm', md: '6.5rem', lg: '6.5rem', xl: '6.5rem', xl2: '15rem' }}
			py={{ base: 'sm', md: '3rem', lg: '5.5rem', xl: '5.5rem', xl2: '5.5rem' }}
			visibleFrom='lg'>
			<Grid gutter={{ base: 'md' }}>
				<Grid.Col span={{ base: 12, md: 12, lg: 12, xl: 4 }} pb={{ base: 0, md: '3.5rem', lg: '3.5rem' }}>
					<SimpleGrid cols={{ base: 1, md: 2, lg: 2, xl: 1 }} spacing='15rem' verticalSpacing={'6.4rem'}>
						{/* <Flex gap={8} justify='flex-start' align='flex-start' direction='column' wrap='wrap'> */}
						<Flex gap='0.5rem' justify='flex-start' align='flex-start' direction='column' wrap='wrap'>
							<Text
								c={'#333'}
								style={{
									fontSize: '18px',
									lineHeight: '25.2px',
									letterSpacing: '-0.72px',
									fontWeight: '600',
									width: '100%',
								}}>
								{data?.title}
							</Text>
							<Text
								c={'#4F4F4F'}
								style={{
									fontSize: '0.9375rem',
									fontWeight: 400,
									lineHeight: '1.59375rem',
									letterSpacing: '-0.02813rem',
								}}
								w={{ base: 12, md: '27rem', lg: '23rem', xl: '20rem' }}>
								{data?.description}
							</Text>
						</Flex>
						{/* </Group> */}
						<Flex gap='md' justify='flex-start' align='flex-start' direction='column' wrap='wrap'>
							<Text
								c={'#333'}
								style={{
									fontSize: '1.125rem',
									fontWeight: 600,
									lineHeight: '1.575rem',
									letterSpacing: '-0.045rem',
								}}>
								{data?.sign_up_for_our_newsletter}
							</Text>

							<Group gap='0.5rem'>
								<TextInput radius='3rem' placeholder={data?.email_address} style={{ borderRadius: '1rem' }} />
								<Button
									variant='filled'
									color='#B82929'
									style={{
										borderRadius: '3rem',
										fontSize: '0.75rem',
										fontWeight: 500,
										lineHeight: '1.2rem',
										letterSpacing: '-0.0225rem',
									}}>
									{data?.subscribe}
								</Button>
							</Group>
						</Flex>
					</SimpleGrid>
				</Grid.Col>

				<Grid.Col span={{ base: 12, md: 0, lg: 12, xl: 8 }}>
					{/* <Stack justify='space-between' gap={'2rem'}> */}
					<SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 4 }} spacing={'0.2rem'} verticalSpacing={'2rem'}>
						{data?.footer_links?.map((link: any) => (
							<Link key={link?.id} href={link?.link || ''}>
								<Group gap={'0.625rem'}>
									<Avatar size='xs' src={`${IMAGE_URL}` + link?.icon?.data?.attributes?.url} />
									<Text
										style={{
											fontSize: '0.9375rem',
											fontWeight: 400,
											lineHeight: '1.59375rem',
											letterSpacing: '-0.02813rem',
										}}>
										{link?.name}
									</Text>
								</Group>
							</Link>
						))}
					</SimpleGrid>
					<Space h='3.5rem' />
					<Flex justify='space-between' align='center' wrap='wrap'>
						<Flex gap='25px' align='center'>
							<div style={{ height: '30px', width: '84px', backgroundColor: 'var(--cert-color)' }} />
							<div style={{ height: '25px', width: '118px', backgroundColor: 'var(--razorpay-color)' }} />
						</Flex>
						<Flex gap='16px' align='center'>
							<Link href='https://www.instagram.com/pari.network/?hl=en'>
								<Flex
									style={{
										width: '40px',
										height: '40px',
										borderRadius: '20px',
										backgroundColor: 'white',
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<Instagram />
								</Flex>
							</Link>
							<Link href='https://x.com/PARInetwork?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'>
								<Flex
									style={{
										width: '40px',
										height: '40px',
										borderRadius: '20px',
										backgroundColor: 'white',
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<Twiter />
								</Flex>
							</Link>
							<Link href='https://www.youtube.com/PARInetwork'>
								<Flex
									style={{
										width: '40px',
										height: '40px',
										borderRadius: '20px',
										backgroundColor: 'white',
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<Youtube />
								</Flex>
							</Link>
							<Link href='https://www.facebook.com/%40PARInetwork/'>
								<Flex
									style={{
										width: '40px',
										height: '40px',
										borderRadius: '20px',
										backgroundColor: 'white',
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<FaceBook />
								</Flex>
							</Link>
						</Flex>
					</Flex>
					{/* </Stack> */}
				</Grid.Col>
			</Grid>
		</Paper>
	);
}

export async function getStaticProps({ locale }: any) {
	const res = await axios({
		url: `${BASE_URL}api/footer?locale=${locale}&populate=deep,5`,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (res.status !== 200) {
		throw new Error('Failed to fetch data');
	}
	// console.log('footer, data', res, locale);
	const footerData = res?.data?.attributes;

	return {
		props: {
			footer: footerData,
		},
		revalidate: 60, // Optional: Rebuild page every 60 seconds (ISR)
	};
}
