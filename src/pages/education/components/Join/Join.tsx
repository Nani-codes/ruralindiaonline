import { ActionIcon, Button, Card, Stack, Text, useMantineTheme } from '@mantine/core';

import EducationIcon from '@/common/Icons/EducationIcon';
import { MdOutlineSchool } from 'react-icons/md';
import { useEffect } from 'react';
import { useViewportSize } from '@mantine/hooks';

export default function JoinSection({ open, padding }: { open: () => void; padding: string }) {
	const theme = useMantineTheme();
	const width = useViewportSize().width;

	return (
		<Card
			p={0}
			radius='1rem'
			w={{ xs: '17em', sm: '22em', sm2: '30em', sm3: '42em', md: '40em', lg: '64rem' }}
			mx='auto'
			mt='-150px'
			bg='transparent'>
			<Stack
				py='lg'
				h={{ base: '25em', sm: '23em', sm2: '21em', sm3: '18em' }}
				align='center'
				gap='8px'
				bg={'#2F80ED'}
				style={{ borderRadius: '1em' }}>
				<ActionIcon variant='filled' style={{ width: '50px', height: '50px', padding: '12.5px' }} radius='xl' bg={'#035BD1'}>
					<EducationIcon />
				</ActionIcon>
				<Text
					py={'8px'}
					c={theme.white}
					style={{
						fontSize: '32px',
						fontStyle: 'normal',
						fontWeight: 700,
						textAlign: 'center',
						letterSpacing: '-0.08rem',
						lineHeight: '2.48rem',
						fontFamily: 'Noto Sans',
					}}
					w={{ base: '90%', sm: '70%', sm2: '55%', sm3: '80%', md: '80%' }}>
					Join PARI Education Today
				</Text>
				<Text
					c={theme.white}
					px={{ sm: '1.5em', sm2: '2em', sm3: '8em', md: '5em', lg: '16em', xl: '16em' }}
					style={{
						fontSize: '16px',
						fontStyle: 'normal',
						fontWeight: 500,
						textAlign: 'center',
						letterSpacing: '-0.01rem',
						lineHeight: '1.7rem',
						fontFamily: 'Noto Sans',
					}}>
					Give your students a chance to learn holistically from the diverse, everyday lives, of everyday people
				</Text>
				<Button
					variant="outlined"
					style={{
						borderRadius: '3rem',
						padding: '0',
						borderColor: 'white',
						color: 'white',
						fontSize: '16px',
						marginTop:"2rem",
						fontFamily: 'Noto Sans',
						backgroundColor: 'transparent',  // Ensures no background color
						transition: 'none',  // Disables transition effects
					}}onClick={open}
				>
					<span style={{ padding: '14px 28px' }}>Reach Out</span>
				</Button>
			</Stack>
		</Card>
	);
}
