import { Card, Divider, Space, Stack, Text } from '@mantine/core';

import { useMantineTheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

const TestimonialCard = ({ text, author, authorSubtitle }: { text: string; author: string; authorSubtitle: string }) => {
	const theme = useMantineTheme();
	const { width } = useViewportSize();
	return (
		<Card
			shadow='xs'
			radius='1rem'
			withBorder
			bg={theme.white}
			py={width >= 1024 ? '40px' : '40px'}
			px={width >= 1024 ? '40px' : '32px'}>
			<Text
				c={'#333'}
				size='sm'
				lineClamp={6}
				style={{
					fontSize: '18px',
					fontStyle: 'normal',
					fontWeight: 400,
					fontFamily: 'Noto Serif',
					lineHeight: '34.2px',
					letterSpacing: '-0.18px',
				}}>
				&ldquo;{text}&rdquo;
			</Text>
			<Divider my='md' color={'#2F80ED'} size='md' w='100%' />
			<div>
				<Text
					c={'#333'}
					style={{
						fontSize: '12px',
						fontStyle: 'normal',
						fontWeight: 500,
						lineHeight: '19.2px',
						letterSpacing: '-0.36px',
						fontFamily: 'Noto Sans',
					}}>
					{author}
				</Text>
				<Space h={'12px'} />
				<Text
					c={'#828282'}
					style={{
						fontSize: '13px',
						fontStyle: 'normal',
						fontWeight: 600,
						textTransform: 'uppercase',
						lineHeight: 'normal',
						letterSpacing: '-0.26px',
					}}>
					{authorSubtitle}
				</Text>
			</div>
		</Card>
	);
};

export default TestimonialCard;
