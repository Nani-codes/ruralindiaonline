import { Card, Divider, Space, Stack, Text, useMantineTheme } from '@mantine/core';

interface OrganizationProps {
	Location: string;
	Institution: string;
}
export default function OrganizationCards(props: OrganizationProps) {
	const theme = useMantineTheme();
	return (
		<Card p={0}>
			<Text
				c={'#333'}
				style={{
					fontFamily: 'Noto Sans',
					fontSize: '20px',
					fontStyle: 'normal',
					fontWeight: 600,
					letterSpacing: ' -0.0625rem',
					lineHeight: '1.6875rem',
				}}>
				{props?.Institution}
			</Text>

			<Text
				c={'#828282'}
				style={{
					fontFamily: 'Noto Sans',
					fontSize: '15px',
					fontStyle: 'normal',
					fontWeight: 600,
					letterSpacing: '-0.01875rem',
					textTransform: 'uppercase',
					lineHeight: 'normal',
				}}>
				{props?.Location?.split(',')[0]}
			</Text>
			<Space h={'40px'} />
			<Divider w={'80%'} color='#E0E0E0' p='0' />
			<Space h={'40px'} />
		</Card>
	);
}
