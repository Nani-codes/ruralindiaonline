import { Card, Group, Image, Text, Title, useMantineTheme } from '@mantine/core';

import { IconType } from 'react-icons/lib';
import { useViewportSize } from '@mantine/hooks';

const ExplanationCard = ({ Icon, title, description }: { Icon: string; title: string; description: string }) => {
	const theme = useMantineTheme();
	const { width } = useViewportSize();
	return (
		<Card p={0}>
			<Group justify='flex-start'>
				<Image src={Icon} w='24px'
							h="24px" />
				<Title
					c={'#2F80ED'}
					size={width >= 1024 ? '20px' : '18px'}
					order={4}
					style={{
						fontWeight: '600',
						fontFamily: 'Noto Sans',
						lineHeight: width >= 1024 ? '1.6875rem ' : '1.575rem',
						letterSpacing: width >= 1024 ? '-0.0625rem' : '-0.045rem',
					}}>
					{title}
				</Title>
			</Group>

			<Text
				pt={'16px'}
				c={'#333'}
				size={width >= 1024 ? '16px' : '15px'}
				style={{
					fontWeight: '400',
					fontFamily: 'Noto Sans',
					lineHeight: width >= 1024 ? '1.7rem ' : '1.59375rem',
					letterSpacing: width >= 1024 ? '-0.01rem' : '-0.02813rem',
				}}>
				{description}
			</Text>
		</Card>
	);
};

export default ExplanationCard;
