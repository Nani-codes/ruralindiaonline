import { Image, Stack, Title, useMantineTheme } from '@mantine/core';

import { IMAGE_URL } from '@/config';
import { useViewportSize } from '@mantine/hooks';

const EducationMap = ({ title, image }: { title: string; image: string }) => {
	const { width } = useViewportSize();
	const theme = useMantineTheme();
	return (
		<Stack align='center' bg={theme.white} py={width >= 1024 ? '6rem' : '4rem'} gap={0}>
			<Title
				p={0}
				order={3}
				c={'#333'}
				size={width >= 1024 ? '28px' : width <= 413 ? '16px' : '22px'}
				style={{
					textAlign: 'center',
					fontWeight: 700,
					lineHeight: width >= 1024 ? '2.275rem' : '1.7875rem ',
					letterSpacing: width >= 1024 ? '-0.0875rem' : '-0.06875rem',
					fontFamily: 'Noto Sans',
				}}
				w={{ base: '18em', md: '19em', lg: '19em', xl: '19em', xl2: '19em' }}>
				{title}
			</Title>
			<Image src={`${IMAGE_URL}` + `${image}`} alt='PARI Education Map' w={'588px'} pt={width >= 1024 ? '24px' : '16px'} />
		</Stack>
	);
};

export default EducationMap;
