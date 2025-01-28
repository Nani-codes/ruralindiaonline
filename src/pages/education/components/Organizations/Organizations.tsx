import {
	Box,
	Button,
	Card,
	Divider,
	Group,
	SegmentedControl,
	SimpleGrid,
	Space,
	Stack,
	Tabs,
	Text,
	useMantineTheme,
} from '@mantine/core';
import { useEffect, useRef, useState } from 'react';

import { Carousel } from '@mantine/carousel';
import Link from 'next/link';
import OrganizationCards from './OrganizationCard';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import classes from './Organizations.module.css';
import { useViewportSize } from '@mantine/hooks';

export default function Organization({
	padding,
	show,
	data,
}: {
	data: {
		schools: any;
		colleges: any;
		universities: any;
		institutions: any;
	};
	padding: string;
	show: boolean;
}) {
	const theme = useMantineTheme();
	const { width } = useViewportSize();
	const [activeTab, setActiveTab] = useState<string | null>('Schools');

	const divideIntoThree = (arr: any[]) => {
		let groups = [];

		for (let i = 0; i < arr.length; i += 3) {
			groups.push(arr.slice(i, i + 3));
		}

		return groups;
	};

	const wheelGestures = useRef(WheelGesturesPlugin({}));

	return (
		<Box bg={theme.white} pb={width >= 1024 ? '245px' : '245px'}>
			<Box mx='auto' px={padding}>
				<Divider />

				<Text
					pt={width >= 1024 ? '6rem' : '4rem'}
					size={width <= 1024 ? '13px' : '15px'}
					style={{
						fontFamily: 'Noto Sans',
						fontStyle: 'normal',
						fontWeight: 600,
						color: '#828282',
						letterSpacing: width >= 1024 ? '-0.01875rem' : '-0.01625rem',
					}}>
					GROW WITH US
				</Text>

				<Group justify='space-between' pt={'4px'}>
					<Text
						size={width >= 1024 ? '28px' : width <= 413 ? '18px' : '22px'}
						style={{
							fontFamily: 'Noto Sans',
							fontStyle: 'normal',
							fontWeight: 700,
							color: '#333',
							lineHeight: width >= 1024 ? '2.275rem' : '1.7875rem',
							letterSpacing: width >= 1024 ? '-0.0875rem' : '-0.06875rem',
						}}>
						Participating Organisations
					</Text>
					<Link
						// href="education/testimonials#organizations"
						href="/Inprogress"
						style={{ display: width > 1023 ? 'block' : 'none' }}
					>
						<Button
							variant="outlined"
							style={{
								borderRadius: '3rem',
								padding: '0',
								borderColor: '#2F80ED',
								color: '#2F80ED',
								fontSize: '16px',
								fontFamily: 'Noto Sans',
								backgroundColor: 'transparent',  // Ensures no background color
								transition: 'none',  // Disables transition effects
							}}
						>
							<span style={{ padding: '14px 28px' }}>See All Orgs</span>
						</Button>
					</Link>



				</Group>

				<Group justify='space-between' pt={'16px'}>
					<Text
						size={width < 1024 ? '15px' : '16px'}
						fw={{ xs: 400, sm: 400, sm2: 400, sm3: 400, md: 500, lg: 500, xl: 500, xl2: 500, xl3: 500 }}
						style={{
							fontStyle: 'normal',
							fontFamily: 'Noto Sans',

							color: '#333',
							lineHeight: width >= 1024 ? ' 1.7rem ' : '1.59375rem',
							letterSpacing: width >= 1024 ? '-0.01rem' : '-0.02813rem',
						}}
						maw={{ base: '48em', md: '48em', lg: '40em', xl: '48em', xl2: '48em' }}>
						We work with young people in both formal and informal educational organisations across the country. Listed
						below are educational organisations in which students are working with PARI directly or through their
						institution.
					</Text>

					<Tabs
						variant="pills"
						radius="1.5rem"
						value={activeTab}
						onChange={setActiveTab}
						defaultValue="Schools"
						style={{
							background: 'white',
							borderRadius: '24px',
							boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)',
						}}
						styles={{
							tab: { paddingTop: '4px', paddingBottom: '4px', paddingRight: '12px', paddingLeft: '12px' },
							list: {
								gap: '8px',
							},
						}}
						p={'8px'}>
						<Tabs.List>
							<Tabs.Tab
								value="Schools"
								style={{
									fontSize: '12px',
									fontWeight: '500',
									borderRadius: '3rem',
									letterSpacing: '-0.0225rem',
									lineHeight: '1.2rem',
									fontFamily: 'Noto Sans',
									backgroundColor: activeTab === 'Schools' ? '#2F80ED' : 'transparent', // Active tab color
								}}
								styles={{ tabLabel: { color: activeTab === 'Schools' ? '#FFFFFF' : '#2F80ED' } }}>
								Schools
							</Tabs.Tab>
							<Tabs.Tab
								value="Colleges"
								style={{
									fontSize: '12px',
									fontWeight: '500',
									borderRadius: '3rem',
									letterSpacing: '-0.0225rem',
									lineHeight: '1.2rem',
									fontFamily: 'Noto Sans',
									backgroundColor: activeTab === 'Colleges' ? '#2F80ED' : 'transparent', // Active tab color
								}}
								styles={{ tabLabel: { color: activeTab === 'Colleges' ? '#FFFFFF' : '#2F80ED' } }}>
								Colleges
							</Tabs.Tab>
							<Tabs.Tab
								value="Universities"
								style={{
									fontSize: '12px',
									fontWeight: '500',
									borderRadius: '3rem',
									letterSpacing: '-0.0225rem',
									lineHeight: '1.2rem',
									fontFamily: 'Noto Sans',
									backgroundColor: activeTab === 'Universities' ? '#2F80ED' : 'transparent', // Active tab color
								}}
								styles={{ tabLabel: { color: activeTab === 'Universities' ? '#FFFFFF' : '#2F80ED' } }}>
								Universities
							</Tabs.Tab>
							<Tabs.Tab
								value="Institutions"
								style={{
									fontSize: '12px',
									fontWeight: '500',
									borderRadius: '3rem',
									letterSpacing: '-0.0225rem',
									lineHeight: '1.2rem',
									fontFamily: 'Noto Sans',
									backgroundColor: activeTab === 'Institutions' ? '#2F80ED' : 'transparent', // Active tab color
								}}
								styles={{ tabLabel: { color: activeTab === 'Institutions' ? '#FFFFFF' : '#2F80ED' } }}>
								Institutions
							</Tabs.Tab>
						</Tabs.List>
					</Tabs>

				</Group>

				<SimpleGrid
					visibleFrom='md'
					cols={{ base: 2, sm: 2, md: 3, lg: 4, xl: 4 }}
					spacing='4rem'
					verticalSpacing='0'
					pt={width >= 1024 ? '56px' : '32px'}>
					{activeTab === 'Schools' &&
						data?.schools?.data?.map((institute: any, index: number) => (
							<OrganizationCards
								key={index}
								Institution={institute?.attributes?.name}
								Location={institute?.attributes?.location?.description}
							/>
						))}
					{activeTab === 'Colleges' &&
						data?.colleges?.data?.map((institute: any, index: number) => (
							<OrganizationCards
								key={index}
								Institution={institute?.attributes?.name}
								Location={institute?.attributes?.location?.description}
							/>
						))}
					{activeTab === 'Universities' &&
						data?.universities?.data?.map((institute: any, index: number) => (
							<OrganizationCards
								key={index}
								Institution={institute?.attributes?.name}
								Location={institute?.attributes?.location?.description}
							/>
						))}
					{activeTab === 'Institutions' &&
						data?.institutions?.data?.map((institute: any, index: number) => (
							<OrganizationCards
								key={index}
								Institution={institute?.attributes?.name}
								Location={institute?.attributes?.location?.description}
							/>
						))}
				</SimpleGrid>
				<Group justify='center'>
					<Carousel
						hiddenFrom='md'
						styles={{ root: { width: '100%' } }}
						slideSize={{ base: '80%', sm2: '55%', sm3: '45%', md: '30%' }}
						align='start'
						loop
						plugins={[wheelGestures.current]}
						withControls={false}>
						{activeTab === 'Schools' &&
							data?.schools &&
							data.schools.data &&
							data.schools.data.length > 0 &&
							divideIntoThree(data?.schools?.data)?.map((institute: any[], index: number) => (
								<Carousel.Slide key={index}>
									<Card>
										<Stack>
											{institute[0] && (
												<OrganizationCards
													Institution={institute[0].attributes.name}
													Location={institute[0]?.attributes?.location?.description}
												/>
											)}
											{institute[1] && (
												<OrganizationCards
													Institution={institute[1].attributes.name}
													Location={institute[1]?.attributes?.location?.description}
												/>
											)}
											{institute[2] && (
												<OrganizationCards
													Institution={institute[2].attributes.name}
													Location={institute[2]?.attributes?.location?.description}
												/>
											)}
										</Stack>
									</Card>
								</Carousel.Slide>
							))}
						{activeTab === 'Colleges' &&
							data?.colleges &&
							data.colleges.data &&
							data.colleges.data.length > 0 &&
							divideIntoThree(data?.colleges?.data)?.map((institute: any[], index: number) => (
								<Carousel.Slide key={index}>
									<Card>
										<Stack>
											{institute[0] && (
												<OrganizationCards
													Institution={institute[0].attributes.name}
													Location={institute[0]?.attributes?.location?.description}
												/>
											)}
											{institute[1] && (
												<OrganizationCards
													Institution={institute[1].attributes.name}
													Location={institute[1]?.attributes?.location?.description}
												/>
											)}
											{institute[2] && (
												<OrganizationCards
													Institution={institute[2].attributes.name}
													Location={institute[2]?.attributes?.location?.description}
												/>
											)}
										</Stack>
									</Card>
								</Carousel.Slide>
							))}
						{activeTab === 'Universities' &&
							data?.universities &&
							data.universities.data &&
							data.universities.data.length > 0 &&
							divideIntoThree(data?.universities?.data)?.map((institute: any[], index: number) => (
								<Carousel.Slide key={index}>
									<Card>
										<Stack>
											{institute[0] && (
												<OrganizationCards
													Institution={institute[0].attributes.name}
													Location={institute[0]?.attributes?.location?.description}
												/>
											)}
											{institute[1] && (
												<OrganizationCards
													Institution={institute[1].attributes.name}
													Location={institute[1]?.attributes?.location?.description}
												/>
											)}
											{institute[2] && (
												<OrganizationCards
													Institution={institute[2].attributes.name}
													Location={institute[2]?.attributes?.location?.description}
												/>
											)}
										</Stack>
									</Card>
								</Carousel.Slide>
							))}
						{activeTab === 'Institutions' &&
							data?.institutions &&
							data.institutions.data &&
							data.institutions.data.length > 0 &&
							divideIntoThree(data?.institutions?.data)?.map((institute: any[], index: number) => (
								<Carousel.Slide key={index}>
									<Card>
										<Stack>
											{institute[0] && (
												<OrganizationCards
													Institution={institute[0].attributes.name}
													Location={institute[0]?.attributes?.location?.description}
												/>
											)}
											{institute[1] && (
												<OrganizationCards
													Institution={institute[1].attributes.name}
													Location={institute[1]?.attributes?.location?.description}
												/>
											)}
											{institute[2] && (
												<OrganizationCards
													Institution={institute[2].attributes.name}
													Location={institute[2]?.attributes?.location?.description}
												/>
											)}
										</Stack>
									</Card>
								</Carousel.Slide>
							))}
					</Carousel>
				</Group>
				<Group justify='center' pt='24px' w={{ base: '100%' }} style={{ display: width < 1024 ? 'block' : 'none' }}>
					<Link href='education/testimonials#organizations'>
						<Button
							variant="outlined"
							style={{
								borderRadius: '3rem',
								padding: '0',
								borderColor: '#2F80ED',
								color: '#2F80ED',
								fontSize: '16px',
								fontFamily: 'Noto Sans',
								backgroundColor: 'transparent',  // Ensures no background color
								transition: 'none', 
								fontWeight: 500 // Disables transition effects
							}}		
							styles={{
								label: { paddingTop: '14px', paddingBottom: '14px', paddingRight: '28px', paddingLeft: '28px' },
								root: { padding: '0' },
							}}
							display={!show ? 'none' : 'inline-block'}>
							See All Orgs
						</Button>
					</Link>
				</Group>
			</Box>
		</Box>
	);
}
