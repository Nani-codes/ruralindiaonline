import { Container, Divider, useMantineColorScheme } from '@mantine/core';
import React, { useState } from 'react';
import { useDisclosure, useViewportSize } from '@mantine/hooks';

import Article from './components/Article/Article';
import Banner from './components/Banner/Banner';
import EducationContext from '@/lib/EducationContext';
import EducationMap from './components/EducationMap/EducationMap';
import Header from '@/common/EducationHeader';
import Header1 from '../../common/Header';

import HowItWorks from './components/HowItWorks/HowItWorks';
import Join from './components/Join/Join';
import ModalSection from './components/Modal/Modal';
import Organization from './components/Organizations/Organizations';
import Recommendations from './components/Recommendations/Recommendations';
import axios from 'axios';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';

const EducationPage = ({
	data,
	studentTestimonials,
	teachersTestimonials,
	schools,
	colleges,
	universities,
	institutions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const { theme } = useTheme();
	const { setColorScheme } = useMantineColorScheme();
	useEffect(() => {
		let isRefresh = true;
		if (isRefresh) {
			setColorScheme(theme === 'light' ? 'light' : 'light');
		}
		return () => {
			isRefresh = false;
		};
	}, []);
	const [opened, { open, close }] = useDisclosure(false);
	const { width } = useViewportSize();
	const [headerSize, setHeaderSize] = useState('40px');
	const [titleSize, setTitleSize] = useState('64px');
	const [padding, setPadding] = useState('1em');

	const [navSize, setNavSize] = useState(100);
	const [fontsize, setfont] = useState('18px');
	useEffect(() => {
		let isRefresh = true;
		if (isRefresh) {
			setPadding(`${(width - navSize * 0.85) / 2}px`);
			if (width <= 320) {
				setHeaderSize('24px');
				setTitleSize('20px');
				setfont('18px');
			} else if (width > 320 && width <= 412) {
				setHeaderSize('28px');
				setTitleSize('20px');
				setfont('18px');
			} else if (width > 412 && width <= 576) {
				//sm
				setHeaderSize('28px');
				setTitleSize('20px');
				setfont('18px');
			} else if (width > 576 && width <= 768) {
				setHeaderSize('28px');
				setTitleSize('20px');
				setfont('24px');
			} else if (width > 768 && width <= 1024) {
				setHeaderSize('28px');
				setTitleSize('20px');
				setfont('24px');
			} else if (width > 1024 && width <= 1280) {
				setHeaderSize('56px');
				setTitleSize('24px');
				setfont('24px');
			} else if (width > 1280 && width <= 1536) {
				setHeaderSize('56px');
				setTitleSize('28px');
				setfont('24px');
			} else if (width > 1536 && width <= 1920) {
				setHeaderSize('64px');
				setTitleSize('32px');
				setfont('24px');
			} else if (width > 1920 && width <= 2560) {
				setHeaderSize('64px');
				setTitleSize('32px');
				setfont('24px');
			} else {
				setHeaderSize('64px');
				setTitleSize('32px');
				setfont('24px');
			}
		}
		return () => {
			isRefresh = false;
		};
	}, [width, navSize]);
	// console.log(padding, navSize, width);
	return (
		// <Container fluid bg='#F4F4F4' style={{ paddingLeft: 0, paddingRight: 0 }} pb={width >= 1024 ? '96px' : '32px'}>
		<EducationContext.Provider
			value={{
				padding: padding,
				titleSize: titleSize,
				headerSize: headerSize,
				font: fontsize,
				joinUs: opened,
				navSize: navSize,
			}}>
			{/* setNavSize={setNavSize} */}
			{/* <Header setNavSize={setNavSize} /> */}
			<Header1 setNavSize={setNavSize} />
			<ModalSection opened={opened} open={open} close={close} />
			<Banner open={open} title={data?.Education_Page_Title} cards={data?.Education_Banner_Cards} />
			<Article student={studentTestimonials} teacher={teachersTestimonials} />
			<Recommendations stories={data?.Stories_By_Students?.data} />

			
			<HowItWorks
				title={data?.How_It_Works_Title}
				description={data?.How_It_Works_Description}
				video={data?.How_It_Works_VideoURL}
				cards={data?.How_It_Works_Cards}
			/>
			<EducationMap title={data?.Map_Title} image={data?.Map_Image?.data?.attributes?.url} />
			<Organization
				padding={padding}
				show={true}
				data={{
					schools: schools,
					colleges: colleges,
					universities: universities,
					institutions: institutions,
				}}
			/>
			<Join open={open} padding={padding} />
		</EducationContext.Provider>
		// {/* //{' '} */}
		// </Container>
	);
};

export const getServerSideProps = (async ({ locale }) => {
	const eduRes = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}api/education?populate[Education_Banner_Cards][populate]=*&populate[How_It_Works_Cards][populate]=*&populate[Stories_By_Students][populate]=*&populate[Map_Image][populate]=*`,
	);
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
			data: eduRes?.data?.data?.attributes,
			messages: require(`@/locales/${locale}.json`),
			studentTestimonials: studentTestimonialsRes?.data?.data,
			teachersTestimonials: teacherTestimonialsRes?.data?.data,
			schools: schools?.data,
			colleges: colleges?.data,
			universities: universities?.data,
			institutions: institutions?.data,
		},
	};
}) satisfies GetServerSideProps<{ data: any }>;

export default EducationPage;
