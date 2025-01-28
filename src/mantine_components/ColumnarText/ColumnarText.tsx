import { Paper, SimpleGrid, useMantineColorScheme, useMantineTheme } from '@mantine/core';

import BaseText from '../Base/BaseText';

const ColumnarText = ({ texts }: ColumnarTextProps) => {
	const theme = useMantineTheme();
	const { colorScheme } = useMantineColorScheme();

	return (
		<Paper m='auto' bg='#F4F4F4' w={{ base: '20rem', sm: '40rem' }}>
			<SimpleGrid cols={{ base: 1, md: 2 }}>
				{texts.map((text, index) => (
					<BaseText key={index} text={text} />
				))}
			</SimpleGrid>
		</Paper>
	);
};

export default ColumnarText;
