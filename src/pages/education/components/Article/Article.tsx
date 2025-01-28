import { Box, Button, Group, Tabs, rem } from '@mantine/core';
import { useContext, useRef, useState } from 'react';

import ArticleCard from './ArticleCard';
import { Carousel } from '@mantine/carousel';
import EducationContext from '@/lib/EducationContext';
import Link from 'next/link';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import classes from './Article.module.css';
import { useViewportSize } from '@mantine/hooks';

type Testimonials = {
	attributes: {
		author: string;
		author_loc: string;
		author_org: string;
		author_role: string;
		createdAt: string;
		date: string;
		message: string;
		publishedAt: string;
		updatedAt: string;
	};
};

const ArticleCarousel = ({ student, teacher }: { student: Testimonials[]; teacher: Testimonials[] }) => {
	const [activeTab, setActiveTab] = useState<string | null>('students');
	const { width } = useViewportSize();
	const educationValues = useContext(EducationContext);
	const wheelGestures = useRef(WheelGesturesPlugin({}));
	return (
		<Box
			m='auto'
			px={{
				base: +educationValues.padding.split('px')[0] / 0.9 + 'px',
				md: +educationValues.padding.split('px')[0] * 1.5 + 'px',
				lg: +educationValues.padding.split('px')[0] + 72 + 'px',
			}}>
			<Group justify='space-between'>
				<Tabs
					variant='pills'
					radius='1.5rem'
					value={activeTab}
					onChange={setActiveTab}
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
								letterSpacing: '-0.0225rem',
								lineHeight: '1.2rem',
								fontFamily: 'Noto Sans',
								backgroundColor: activeTab === 'students' ? '#2F80ED' : 'transparent', // Change background color here
								color: activeTab === 'students' ? '#FFFFFF' : '#828282', // Optional: Change text color if needed
							}}
							styles={{
								tabLabel: {
									color: activeTab === 'students' ? '#FFFFFF' : '#828282'
								}
							}}>
							Students
						</Tabs.Tab>

						<Tabs.Tab
							value='teachers'
							style={{
								fontSize: '12px',
								fontWeight: '500',
								borderRadius: '3rem',
								letterSpacing: '-0.0225rem',
								lineHeight: '1.2rem',
								fontFamily: 'Noto Sans',
								backgroundColor: activeTab === 'teachers' ? '#2F80ED' : 'transparent', // Change background color here
								color: activeTab === 'teachers' ? '#FFFFFF' : '#828282', // Optional: Change text color if needed
							}}
							styles={{
								tabLabel: {
									color: activeTab === 'teachers' ? '#FFFFFF' : '#828282'
								}
							}}>
							Teachers
						</Tabs.Tab>
					</Tabs.List>
				</Tabs>
				<Link href='education/testimonials' style={{ display: width > 1023 ? 'block' : 'none' }}>
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
						<span style={{ padding: '14px 28px' }}>Read All</span>
					</Button>

				</Link>
			</Group>
			<Group justify='flex-start' pt={width >= 1024 ? '40px' : '24px'}>
				<Carousel
					classNames={classes}
					styles={{
						root: { width: '85vw' }, indicator: {
							border: '2px solid #2F80ED',
							width: rem("24px"),
							height: rem("24px"),
							translate: "0 60px"
						}
					}}
					slideSize={{ base: '90%', sm: '100%', md: '100%' }}
					slideGap='md'
					align='start'
					plugins={[wheelGestures.current]}
					withControls={false}
					loop
					withIndicators={width < 1023 ? false : true}>
					{activeTab === 'students' &&
						student?.map((item, index) => (
							<Carousel.Slide key={index}>

								<ArticleCard
									text={item.attributes.message}
									author={item.attributes.author}
									authorSubtitle={item.attributes.author_role}
								/>
							</Carousel.Slide>
						))}
					{activeTab === 'teachers' &&
						teacher?.map((item, index) => (
							<Carousel.Slide key={index}>
								<ArticleCard
									text={item.attributes.message}
									author={item.attributes.author}
									authorSubtitle={item.attributes.author_role}
								/>
							</Carousel.Slide>
						))}
				</Carousel>
			</Group>
			<Group justify='center' pt='24px' w={{ base: '100%' }} style={{ display: width < 1024 ? 'block' : 'none' }}>
				<Link href='education/testimonials'>
					<Button
						variant="outlined"
						mt='md'
						radius='3rem'
						h={'48px'}
						w={'140px'}
						c={'#2F80ED'}
						style={{
							borderRadius: '3rem',
							padding: '0',
							borderColor: '#2F80ED',
							color: '#2F80ED',
							fontFamily: 'Noto Sans',
							backgroundColor: 'transparent',  // Ensures no background color
							transition: 'none', 
							border: '2px solid', 
							fontSize: '16px', 
							fontWeight: 500,
							paddingTop: '14px', 
							paddingBottom: '14px', 
							paddingLeft: '28px', 
							paddingRight: '28px'
						}}>
						Read All
					</Button>
				</Link>
			</Group>
		</Box>
	);
};

export default ArticleCarousel;
