import { Card, Container, Group, Text, Image, useMantineTheme, Accordion, Title, Tabs, SimpleGrid } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { useEffect, useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import Donate_Form_Online from './Donate_Form_Online';
import Donate_Form_Cheque from './Donate_Form_Cheque';
import Donate_Form_Bank from './Donate_Form_Bank';
// import Header from '@/common/EducationHeader';
import Header from '@/common/Header/index';
import { IoChevronDown } from 'react-icons/io5';
import './Donate-Pari.module.css';
// import styled from 'styled-components';

export default function DonateToPari({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { width } = useViewportSize();
	const theme = useMantineTheme();
	const [padding, setPadding] = useState('1em');
	const [navSize, setNavSize] = useState(100);
	const [activeTab, setActiveTab] = useState<string | null>('Online');
	const show = true;

	const isSmallScreen = width <= 768; // Define your breakpoint
	const cols = isSmallScreen ? 1 : 2; // 1 column for small screens, 2 for larger screens
	const spacing = isSmallScreen ? '1rem' : '10rem';
	const verticalSpacing = isSmallScreen ? '2rem' : '6rem';

	useEffect(() => {
		setPadding(`${(width - navSize * 0.85) / 2}px`);
	}, [width, navSize]);

	// const items = data?.Donate_FAQ_Card.map((item: any, index: number) => (
	// 	<Accordion.Item
	// 		key={item.Donate_FAQ_Question}
	// 		value={item.Donate_FAQ_Question}
	// 		style={{ borderBottomWidth: index === data.Donate_FAQ_Card.length - 1 ? '0px' : '1px' }}>
	// 		<Accordion.Control
	// 			px={32}
	// 			py={20}
	// 			c={'#333333'}
	// 			style={{
	// 				fontSize: width >= 1024 ? '20px' : '18px',
	// 				fontWeight: 600,
	// 				fontFamily: 'Noto Sans',
	// 				lineHeight: width > 1024 ? '1.6875rem' : '1.575rem',
	// 				letterSpacing: width > 1024 ? '-0.0625rem' : '-0.045rem',
	// 			}}
	// 			styles={{ label: { fontWeight: 600 } }}>
	// 			{item.Donate_FAQ_Question}
	// 		</Accordion.Control>
	// 		<Accordion.Panel
	// 			px={16}
	// 			pb={16}
	// 			c='#333333'
	// 			style={{
	// 				fontSize: width >= 1024 ? '16px' : '15px',
	// 				fontWeight: 400,
	// 				fontFamily: 'Noto Sans',
	// 				lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
	// 				letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
	// 			}}>
	// 			<div
	// 				dangerouslySetInnerHTML={{
	// 					__html: DOMPurify.sanitize(item.Donate_FAQ_Answer),
	// 				}}></div>
	// 		</Accordion.Panel>
	// 	</Accordion.Item>
	// ));
	const items = data?.Donate_FAQ_Card.map((item: any, index: number) => (
		<Accordion.Item
			key={item.Donate_FAQ_Question}
			value={item.Donate_FAQ_Question}
			style={{ borderBottomWidth: index === data.Donate_FAQ_Card.length - 1 ? '0px' : '1px' }}>
			<Accordion.Control
				px={32}
				py={20}
				c={'#333333'}
				style={{
					fontSize: width >= 1024 ? '20px' : '18px',
					fontWeight: 600,
					fontFamily: 'Noto Sans',
					lineHeight: width > 1024 ? '1.6875rem' : '1.575rem',
					letterSpacing: width > 1024 ? '-0.0625rem' : '-0.045rem',
				}}
				styles={{ label: { fontWeight: 600 } }}>
				{item.Donate_FAQ_Question}
			</Accordion.Control>
			<Accordion.Panel
				px={16}
				pb={16}
				c='#333333'
				style={{
					fontSize: width >= 1024 ? '16px' : '15px',
					fontWeight: 400,
					fontFamily: 'Noto Sans',
					lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
					letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
				}}>
				<div
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(item.Donate_FAQ_Answer),
					}}></div>
			</Accordion.Panel>
		</Accordion.Item>
	));
	return (
		<Container fluid bg='#F2F2F2' style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: '56px' }}>
			<Header setNavSize={setNavSize} />

			{/* Main Grid Layout */}
			{/* <SimpleGrid
				pt='3rem'
				px={padding}
				cols={2}
				spacing='10rem' // Increase the horizontal spacing
				verticalSpacing='6rem' // Optional: Increase vertical spacing if needed
				breakpoints={[
					{ maxWidth: 'md', cols: 1, spacing: '1rem' },
					{ maxWidth: 'sm', cols: 1, spacing: '1rem', verticalSpacing: '2rem' },
				]}> */}
			<SimpleGrid px={padding} pt='3rem' cols={cols} spacing={spacing} verticalSpacing={verticalSpacing}>
				{/* Row 1: Video and Donate Form */}
				<div>
					<Card radius='md' mb='2rem'>
						<iframe
							title='Donate Video'
							src={`https://www.youtube.com/embed/${data?.Donate_Video}`}
							style={{ width: '100%', height: '300px', borderRadius: '12px' }}
							allowFullScreen
						/>
					</Card>
					<Card bg='#F2F2F2' p='1.5rem'>
						<Text c='#B82929' style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'Noto Sans' }}>
							{data?.DonateToPari_Quote}
						</Text>
						<Text c='#333333' pt='0.5rem' style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'Noto Sans' }}>
							{data?.DonateToPari_SubTitle}
						</Text>
						<Text c='#333333' pt='0.5rem' style={{ fontSize: '16px', fontFamily: 'Noto Sans' }}>
							<div
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(data?.DonateToPari_content.replace(/&nbsp;/g, '')),
								}}></div>
						</Text>
					</Card>
				</div>

				<Card radius='md' px='2rem' py='2rem' style={{ alignSelf: 'start' }}>
					<Text pb='1.5rem' style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'Noto Sans' }}>
						Donate to PARI
					</Text>
					{/* <Tabs value={activeTab} onChange={setActiveTab} variant='pills' radius='md'>
						<Tabs.List>
							<Tabs.Tab value='Online'>Online</Tabs.Tab>
							<Tabs.Tab value='Cheque/DD'>Cheque/DD</Tabs.Tab>
							<Tabs.Tab value='Bank_Transfer'>Bank Transfer</Tabs.Tab>
						</Tabs.List> */}
					<Tabs
						mb={'24px'}
						color={'#B82929'}
						variant='pills'
						radius='1.5rem'
						value={activeTab}
						onChange={setActiveTab}
						defaultValue='Schools'
						style={{ background: 'white', borderRadius: '24px', boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)' }}
						styles={{
							tab: { paddingTop: '4px', paddingBottom: '4px', paddingRight: '12px', paddingLeft: '12px' },
							list: {
								gap: '8px',
							},
						}}
						m={0}
						p={'8px'}>
						<Tabs.List>
							<Tabs.Tab
								value='Online'
								style={{
									fontSize: '12px',
									fontWeight: '500',
									borderRadius: '3rem',
									letterSpacing: '-0.0225rem',
									lineHeight: '1.2rem',
									fontFamily: 'Noto Sans',
								}}
								styles={{ tabLabel: { color: activeTab === 'Online' ? '#FFFFFF' : '#828282' } }}>
								Online
							</Tabs.Tab>
							<Tabs.Tab
								value='Cheque/DD'
								style={{
									fontSize: '12px',
									fontWeight: '500',
									borderRadius: '3rem',
									letterSpacing: '-0.0225rem',
									lineHeight: '1.2rem',
									fontFamily: 'Noto Sans',
								}}
								styles={{ tabLabel: { color: activeTab === 'Cheque/DD' ? '#FFFFFF' : '#828282' } }}>
								Cheque/DD
							</Tabs.Tab>
							<Tabs.Tab
								value='Bank_Transfer'
								style={{
									fontSize: '12px',
									fontWeight: '500',
									borderRadius: '3rem',
									letterSpacing: '-0.0225rem',
									lineHeight: '1.2rem',
									fontFamily: 'Noto Sans',
								}}
								styles={{ tabLabel: { color: activeTab === 'Bank_Transfer' ? '#FFFFFF' : '#828282' } }}>
								Bank Transfer
							</Tabs.Tab>
						</Tabs.List>
					</Tabs>
					{activeTab === 'Online' && <Donate_Form_Online content={data?.DonateToPari_Model_content} />}
					{activeTab === 'Cheque/DD' && <Donate_Form_Cheque content={data?.DonateToPari_Model_content} />}
					{activeTab === 'Bank_Transfer' && <Donate_Form_Bank content={data?.DonateToPari_Model_content} />}
					{/* </Tabs> */}
				</Card>

				{/* Row 2: FAQ Section */}
				<div p='2rem'>
					{/* <Text pb='1.5rem' style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'Noto Sans' }}>
						{data?.Donate_FAQ_Title}
					</Text> */}
					<Text
						pb={'30px'}
						c='#282828'
						style={{
							fontSize: '24px',
							fontWeight: 700,
							fontFamily: 'Noto Sans',
							lineHeight: '1.95rem',
							letterSpacing: '-0.06rem',
						}}>
						{data?.Donate_FAQ_Title}
					</Text>
					{/* <Accordion chevron={<IoChevronDown size={24} color='#B82929' />}>{items}</Accordion> */}
					<Card p={'0'} radius={'1rem'}>
						{' '}
						<Accordion
							chevronSize={40}
							chevron={<IoChevronDown color='#B82929' size={34} />}
							styles={{ itemTitle: { padding: '0px' } }}>
							{items}
						</Accordion>
					</Card>
				</div>

				{/* <Card bg='#F2F2F2' p='2rem' radius='md'>
					<Text style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'Noto Sans' }}>Additional Content Here</Text>
				</Card> */}
			</SimpleGrid>
		</Container>
	);
}

export const getServerSideProps = (async ({ locale }) => {
	const DonateResp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/donate-to-pari?populate[Donate_FAQ_Card][populate]=*`);
	return {
		props: {
			data: DonateResp?.data.data.attributes,
			messages: require(`@/locales/${locale}.json`),
		},
	};
}) satisfies GetServerSideProps<{ data: any }>;
