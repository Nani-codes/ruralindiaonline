import { Box, Container, Group, Text, useMantineTheme } from '@mantine/core';
import { useContext, useRef } from 'react';

import { Carousel } from '@mantine/carousel';
import EducationContext from '@/lib/EducationContext';
import { PiStarFourThin } from 'react-icons/pi';
import RecommendationCard from './RecommendationCard';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { useViewportSize } from '@mantine/hooks';
import StarIcon from '@/common/Icons/StarIcon';

type story = {
	id: number;
};

const RecommendationSection = ({ stories }: { stories: story[] }) => {
	// console.log('stories', stories);
	const theme = useMantineTheme();
	const { width } = useViewportSize();
	const educationValues = useContext(EducationContext);
	const wheelGestures = useRef(WheelGesturesPlugin({}));
	return (
		<Container fluid bg={theme.white} px={educationValues.padding} mt={{ xs: '-12em', md: '-6em' }}>
			<Box pt={{ xs: '12em', md: '8em', lg: '8em', xl: '8em' }} m='auto'>
				<Group justify='flex-start' pt={width >= 1024 ? '3.69rem' : '4rem'} pb={width >= 1024 ? '1.5rem' : '2rem'} gap='8px'>
					<StarIcon />
					<Text
						c={'#828282'}
						style={{
							fontSize: '15px',
							fontStyle: 'normal',
							fontWeight: 600,
							fontFamily: 'Noto Sans',
							letterSpacing: '-0.3px',
						}}
						px={0}>
						STORIES BY STUDENTS
					</Text>
				</Group>
				<Group justify='center' w={{ base: '100%' }}>
					<Carousel
						styles={{ root: { width: '100%' } }}
						slideSize={{ base: '80%', sm2: '60%', sm3: '45%', md: '34.6%', lg: '26.5%', xl: '22%' }}
						slideGap='24px'
						align='start'
						loop
						plugins={[wheelGestures.current]}
						withControls={false}>
						{stories?.map((story, index) => (
							<Carousel.Slide key={index}>
								<RecommendationCard id={story?.id} />
							</Carousel.Slide>
						))}
					</Carousel>
				</Group>
			</Box>
		</Container>
	);
};

export default RecommendationSection;
