import { Card, Container, Group, Image, SimpleGrid, Tabs, Text, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useDisclosure, useViewportSize } from '@mantine/hooks';

// import Header from '../../../common/EducationHeader';
import Header from '@/common/Header/index';
import Join from '../components/Join/Join';
import ModalSection from '../components/Modal/Modal';
import Organizations from '../components/Organizations/Organizations';
import TestimonialCard from './TestimonialCard';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import SmileIcon from '@/common/Icons/SmileIcon';
import Banner from '@/common/Article/components/Banner';
import { IMAGE_URL } from '@/config';

const Testimonials = ({
	data,
	studentTestimonials,
	teachersTestimonials,
	schools,
	colleges,
	universities,
	institutions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const theme = useMantineTheme();
	const [opened, { open, close }] = useDisclosure(false);
	const { width } = useViewportSize();

	useEffect(() => {}, [data]);

	const [headerSize, setHeaderSize] = useState('40px');
	const [titleSize, setTitleSize] = useState('64px');
	const [padding, setPadding] = useState('1em');
	const [navSize, setNavSize] = useState(100);
	const [fontsize, setFontSize] = useState('18px');
	useEffect(() => {
		setPadding(`${(width - navSize * 0.5) / 2}px`);
		if (width <= 320) {
			setHeaderSize('34px');
			setTitleSize('24px');
			setFontSize('14px');
		} else if (width > 320 && width <= 412) {
			setHeaderSize('34px');
			setTitleSize('28px');
			setFontSize('14px');
		} else if (width > 412 && width <= 576) {
			//sm
			setHeaderSize('34px');
			setTitleSize('28px');
			setFontSize('14px');
		} else if (width > 576 && width <= 768) {
			setHeaderSize('40px');
			setTitleSize('28px');
			setFontSize('16px');
		} else if (width > 768 && width <= 1024) {
			setHeaderSize('40px');
			setTitleSize('28px');
			setFontSize('16px');
		} else if (width > 1024 && width <= 1280) {
			setHeaderSize('40px');
			setTitleSize('48px');
			setFontSize('16px');
		} else if (width > 1280 && width <= 1536) {
			setHeaderSize('40px');
			setTitleSize('56px');
			setFontSize('16px');
		} else if (width > 1536 && width <= 1920) {
			setHeaderSize('40px');
			setTitleSize('64px');
			setFontSize('16px');
		} else if (width > 1920 && width <= 2560) {
			setHeaderSize('40px');
			setTitleSize('64px');
			setFontSize('16px');
		} else {
			setHeaderSize('40px');
			setTitleSize('64px');
			setFontSize('16px');
		}
	}, [width, navSize]);
	const [activeTab, setActiveTab] = useState<string | null>('students');
	return (
		<>
			<Container fluid bg='#F4F4F4' style={{ paddingLeft: 0, paddingRight: 0 }} pb={width >= 1024 ? '96px' : '32px'}>
				<Header setNavSize={setNavSize} />
				<ModalSection opened={opened} open={open} close={close} />
				<Card bg='#F4F4F4' p={0}>
					<Card.Section>
						<Image
							src={IMAGE_URL + data?.TestimonialPage?.Banner?.data?.attributes?.url}
							alt='PARI Testimonials'
							w='100%'
							h={{ base: width / 2, lg: width / 3 }}
						/>
					</Card.Section>
					<Card
						w={{ base: navSize, md: '40em', lg: '46.875rem', xl: '46.875rem' }}
						py={width >= 1024 ? '90px' : '3.51rem'}
						h={width >= 1024 ? '302px' : '208px'}
						bg={theme.white}
						mx='auto'
						mt={{ base: '-2em', sm: '-6em', md: '-6em', lg: '-3.5em', xl: '-8em', xl2: '-8em', xl3: '-8em' }}
						style={{ borderRadius: '1rem', justifyContent: 'center', alignItems: 'center' }}>
						<Group justify='center' gap={'12px'}>
							<Image
								src={IMAGE_URL + data?.TestimonialPage?.icon?.data?.attributes?.url}
								alt='PARI Testimonials'
								w='40px'
								h='40px'
							/>

							<Text
								c={'#202020'}
								size={width >= 1024 ? '40px' : '34px'}
								style={{
									fontStyle: 'italic',
									fontWeight: 400,
									fontFamily: 'Noto Serif',
									lineHeight: width >= 1024 ? '3.05rem' : '2.61575rem',
									letterSpacing: width >= 1024 ? '-0.075rem' : '-0.06431rem',
								}}>
								{data?.TestimonialPage?.title}
							</Text>
						</Group>
						<Text
							pt={width >= 1024 ? '7px' : '6px'}
							c={'#202020'}
							size={width >= 1024 ? '16px' : '14px'}
							style={{
								fontWeight: 400,
								textAlign: 'center',

								lineHeight: width >= 1024 ? '1.7rem' : '1.45794rem',
								letterSpacing: width >= 1024 ? '-0.01rem' : '-0.00856rem',
								fontFamily: 'Noto Sans',
							}}
							mx='auto'
							w={{
								xs: '15rem',
								sm: '15rem',
								sm2: '20rem',
								sm3: '20rem',
								md: '20rem',
								lg: '20rem',
								xl: '20rem',
								xl2: '20rem',
								xl3: '20rem',
							}}>
							{data?.TestimonialPage?.description}
						</Text>
					</Card>
				</Card>

				<Group justify='center' pt='48px' pb={width >= 1024 ? '40px' : '24px'}>
					<Tabs
						variant='pills'
						radius='1.5rem'
						value={activeTab}
						onChange={setActiveTab}
						color={'#2F80ED'}
						defaultValue='students'
						style={{ background: 'white', borderRadius: '24px', boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)' }}
						styles={{
							tab: {
								paddingTop: '4px',
								paddingBottom: '4px',
								paddingRight: '12px',
								paddingLeft: '12px',
							},
							list: {
								gap: '8px',
							},
						}}
						p={'8px'}>
						<Tabs.List>
							<Tabs.Tab
								value='students'
								style={{
									fontSize: '12px',
									fontWeight: '500',
									borderRadius: '3rem',
									letterSpacing: '-0.36px',
									lineHeight: '19.2px',
									fontFamily: 'Noto Sans',
								}}
								styles={{ tabLabel: { color: activeTab === 'students' ? '#FFFFFF' : '#828282' } }}>
								Students
							</Tabs.Tab>
							<Tabs.Tab
								value='teachers'
								style={{
									fontSize: '12px',
									fontWeight: '500',
									borderRadius: '3rem',
									letterSpacing: '-0.36px',
									lineHeight: '19.2px',
									fontFamily: 'Noto Sans',
								}}
								styles={{ tabLabel: { color: activeTab === 'teachers' ? '#FFFFFF' : '#828282' } }}>
								Teachers
							</Tabs.Tab>
						</Tabs.List>
					</Tabs>
				</Group>

				<SimpleGrid
					cols={{ base: 2, xs: 1, sm: 1, sm2: 1, sm3: 1, md: 2, lg: 2, xl: 2, xl2: 2, xl3: 2 }}
					spacing={width >= 1024 ? '16px' : '24px'}
					verticalSpacing={width >= 1024 ? '8.31rem' : '1.5rem'}
					px={padding}
					mx='auto'
					pb={width >= 1024 ? '84px' : '0px'}>
					{activeTab === 'students' &&
						studentTestimonials?.map((testimonial: any, i: number) => (
							<TestimonialCard
								key={i}
								text={testimonial.attributes.message}
								author={testimonial.attributes.author}
								authorSubtitle={testimonial.attributes.author_subtitle}
							/>
						))}
					{activeTab === 'teachers' &&
						teachersTestimonials?.map((testimonial: any, i: number) => (
							<TestimonialCard
								key={i}
								text={testimonial.attributes.message}
								author={testimonial.attributes.author}
								authorSubtitle={testimonial.attributes.author_subtitle}
							/>
						))}
				</SimpleGrid>

				<div id='organizations'>
					<Organizations
						padding={padding}
						show={false}
						data={{
							schools: schools,
							colleges: colleges,
							universities: universities,
							institutions: institutions,
						}}
					/>
				</div>
				<Join open={open} padding={padding} />
			</Container>
		</>
	);
};

export const getServerSideProps = (async ({ locale }) => {
	const tesRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/testimonial-page?populate[TestimonialPage][populate]=*`);
	const studentTestimonialsRes = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}api/testimonials?sort[0]=publishedAt:desc&filters[author_role][$eq]=student&populate=deep,5&pagination[pageSize]=4&pagination[page]=1`,
	);
	const teacherTestimonialsRes = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}api/testimonials?sort[0]=publishedAt:desc&filters[author_role][$eq]=teacher&populate=deep,5&pagination[pageSize]=4&pagination[page]=1`,
	);
	const schools = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}api/organizations?sort[0]=name:desc&filters[organization_type][$eq]=School&populate=deep,5&pagination[pageSize]=120&pagination[page]=1`,
	);
	const colleges = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}api/organizations?sort[0]=name:desc&filters[organization_type][$eq]=College&populate=deep,5&pagination[pageSize]=120&pagination[page]=1`,
	);
	const universities = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}api/organizations?sort[0]=name:desc&filters[organization_type][$eq]=University&populate=deep,5&pagination[pageSize]=120&pagination[page]=1`,
	);
	const institutions = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}api/organizations?sort[0]=name:desc&filters[organization_type][$eq]=Institute&populate=deep,5&pagination[pageSize]=120&pagination[page]=1`,
	);
	return {
		props: {
			data: tesRes?.data.data.attributes,
			messages: require(`@/locales/${locale}.json`),
			studentTestimonials: studentTestimonialsRes?.data.data,
			teachersTestimonials: teacherTestimonialsRes?.data.data,
			schools: schools.data,
			colleges: colleges.data,
			universities: universities.data,
			institutions: institutions.data,
		},
	};
}) satisfies GetServerSideProps<{ data: any }>;

export default Testimonials;
