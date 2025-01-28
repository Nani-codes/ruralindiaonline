import { Card, Divider, Stack, Text } from '@mantine/core';

import EducationContext from '@/lib/EducationContext';
import { useContext } from 'react';
import { useMantineTheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

const ArticleCard = ({ text, author, authorSubtitle }: { text: string; author: string; authorSubtitle: string }) => {
	const theme = useMantineTheme();
	const educationValues = useContext(EducationContext);
	const { width } = useViewportSize();
	return (
		<Card
			shadow='xs'
			radius='1rem'
			withBorder
			bg={theme.white}
			py={width >= 1024 ? '40px' : '40px'}
			px={width >= 1024 ? '40px' : '32px'}
			h={width >= 768 ? '337px' : '411px'}>
			<Text
				c={theme.colors.gray[9]}
				size={width >= 1024 ? '24px' : '18px'}
				lineClamp={5}
				h={{ xs: '15.5rem', sm: '13.5em', sm2: '10em', sm3: '11em', md: '7em', lg: '7em', xl: '7em', xl2: '5em' }}
				style={{
					fontStyle: 'normal',
					fontWeight: 400,
					fontFamily: 'Noto Serif',
					letterSpacing: width >= 1024 ? '-0.015rem' : '-0.01125rem',
					lineHeight: width >= 1024 ? '2.64rem' : '2.1375rem',
				}}>
				&ldquo;{text}&rdquo;
			</Text>
			<Divider my='md' color={'blue'} size='md' w='100%' />
			<div>
				<Text
					c='#333'
					size={width >= 1024 ? '15px' : '12px'}
					style={{
						fontStyle: 'normal',
						fontWeight: 500,
						fontFamily: 'Noto Sans',
						letterSpacing: width >= 1024 ? '-0.01875rem' : '-0.0225rem',
						lineHeight: width >= 1024 ? '1.6875rem' : '1.2rem',
					}}>
					{author}
				</Text>
				<Text
					pt={'12px'}
					c='#828282'
					style={{
						fontSize: '13px',
						fontStyle: 'normal',
						fontWeight: 600,
						letterSpacing: '-0.01625rem',
						lineHeight: 'normal',
						fontFamily: 'Noto Sans',
						textTransform: 'uppercase',
					}}>
					{authorSubtitle}
				</Text>
			</div>
		</Card>
	);
};

export default ArticleCard;
