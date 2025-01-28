import { Card, Group, Image, Text, Title, useMantineTheme } from '@mantine/core';

import { IconType } from 'react-icons/lib';
import { useViewportSize } from '@mantine/hooks';
import DOMPurify from 'isomorphic-dompurify';

const Contribution_Card = ({ Icon, title, description }: { Icon: string; title: string; description: string }) => {
	const theme = useMantineTheme();
	const { width } = useViewportSize();
	return (
		<Card p={0} bg='#F5F5F5'>
			<Group justify='flex-start'>
				<Image src={Icon} w='24px' h='24px' />
				<Title
					c={'#B82929'}
					style={{
						fontSize: '20px',
						fontWeight: '600',
						fontFamily: 'Noto Sans',
						lineHeight: '1.6875rem',
						letterSpacing: '-0.0625rem',
					}}>
					<div
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(title),
						}}></div>
				</Title>
			</Group>

			<Text
				pt={'16px'}
				c={'#333333'}
				style={{
					fontSize: '16px',
					fontWeight: '400',
					fontFamily: 'Noto Sans',
					lineHeight: '1.7rem',
					letterSpacing: '-0.01rem',
				}}>
				<div
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(description),
					}}></div>
			</Text>
		</Card>
	);
};

export default Contribution_Card;
