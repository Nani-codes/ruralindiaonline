import { Box, Card, Group, SimpleGrid, Text, useMantineTheme } from '@mantine/core';
import { useContext } from 'react';
import { useViewportSize } from '@mantine/hooks';

import EducationContext from '@/lib/EducationContext';
import ExplanationCard from './ExplanationCard';
import { IMAGE_URL } from '@/config';

type HowItWorksCard = {
	description: string;
	title: string;
	serial_no: number;
	icon: {
		data: {
			attributes: {
				url: string;
			};
		};
	};
};

const HowItWorks = ({
	title,
	description,
	video,
	cards,
}: {
	title: string;
	description: string;
	video: string;
	cards: HowItWorksCard[];
}) => {
	const theme = useMantineTheme();
	const educationValues = useContext(EducationContext);
	const { width } = useViewportSize();

	return (
		<Box
			pt={width >= 1024 ? '8.5rem' : '4rem'}
			bg={theme.white}
			px={width >= 768 ? educationValues.padding : '1rem'} // Adjust padding for mobile
		>
			{/* Title and Video Section */}
			<SimpleGrid
				cols={width >= 1024 ? 2 : 1} // Switch columns based on viewport width
				spacing={width >= 1024 ? '8.31rem' : '1.5rem'} // Adjust spacing for mobile
				pb={width >= 1024 ? '96px' : '64px'}>
				{/* Left Column for Title and Description */}
				<Card p={0} style={{ display: 'flex', flexDirection: 'column' }}>
					<Text
						c='#828282'
						style={{
							fontSize: width >= 768 ? '15px' : '13px', // Adjust font size for mobile
							fontWeight: 600,
							fontFamily: 'Noto Sans',
							letterSpacing: '-0.01875rem',
							lineHeight: 'normal',
						}}>
						HOW IT WORKS
					</Text>
					<Text
						pt='4px'
						c='#333'
						style={{
							fontSize: width >= 768 ? '28px' : '22px', // Adjust font size for mobile
							fontWeight: 700,
							fontFamily: 'Noto Sans',
							letterSpacing: width >= 768 ? '-0.0875rem' : '-0.05rem',
							lineHeight: width >= 768 ? '2.275rem' : '2rem',
						}}>
						{title}
					</Text>
					<Text
						mt='md'
						c='#333'
						size={width >= 1024 ? '16px' : '14px'} // Adjust font size for mobile
						weight={width >= 1024 ? 500 : 400}
						style={{
							fontFamily: 'Noto Sans',
							lineHeight: width >= 1024 ? '1.7rem' : '1.5rem',
							letterSpacing: width >= 1024 ? '-0.01rem' : '-0.02rem',
						}}>
						{description}
					</Text>
				</Card>

				{/* Right Column for Video */}
				<Card
					p={0}
					radius='1.05rem'
					h={width >= 1024 ? '298px' : '240px'} // Adjust height for mobile
					style={{
						overflow: 'hidden',
						position: 'relative',
					}}>
					<iframe
						width='100%'
						height='100%'
						title='How it works Video'
						src={`https://www.youtube.com/embed/${video}`}
						allowFullScreen
						style={{
							borderRadius: '1rem',
							objectFit: 'cover',
						}}
					/>
				</Card>
			</SimpleGrid>

			<SimpleGrid
				cols={width >= 768 ? 2 : 1} // Adjust columns for mobile
				spacing={width >= 768 ? '3rem' : '1.5rem'} // Adjust spacing for mobile
				verticalSpacing={width >= 1024 ? '4rem' : '2rem'} // Adjust vertical spacing for mobile
			>
				{cards
					?.sort((a, b) => a.serial_no - b.serial_no)
					.map((card, i) => (
						<ExplanationCard
							key={card.serial_no + `${i}`}
							Icon={IMAGE_URL + card?.icon?.data?.attributes?.url}
							title={card?.title}
							description={card?.description}
						/>
					))}
			</SimpleGrid>
		</Box>
	);
};

export default HowItWorks;
