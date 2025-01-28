'use client';

import {
	Close,
	ContributeIconFooter,
	DonateIconFooter,
	Down,
	EducationIconFooter,
	GetInTouchIconFooter,
	GrievancesFooter,
	LibraryIconFooter,
	Search,
	StoryOfIconFooter,
	TermsOfServiceFooter,
	VolunteerIconFooter,
} from '../@the-source/Icon';

import AcknowledgmentIcon from '../Icons/Acknowledgment';
import CopyRightsIcon from '../Icons/CopyRights';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Drawer, Button, Text, Divider, Group, Input, Title, Grid } from '@mantine/core';

const MobileMenu = ({ isOpen, close, toggleLanguageFilter, theme, setTheme }) => {
	const headerTrans = useTranslations('header');
	const message = useTranslations('Index');

	return (
		<Drawer opened={isOpen} onClose={close} padding='md' size='lg' withCloseButton={false}>
			<Group mb='md' align='center' gap='md'>
				<Group align='center' gap='md'>
					<Button variant='transparent' onClick={close}>
						<Close />
					</Button>
					<a href='/' className='px-4 logo bg-main-bg-logo dark:bg-dark-main-bg-logo'></a>
				</Group>
				<Link href='/'>
					<Button variant='subtle'>
						<Search />
					</Button>
				</Link>
			</Group>
			<div style={{ padding: '30px', overflowY: 'auto', height: '90vh' }}>
				<Title order={2} style={{ fontSize: '18px', color: theme === 'dark' ? '#ffffff' : '#333333' }}>
					{message('title')}
				</Title>
				<Text size='sm' mt='xs' style={{ color: theme === 'dark' ? '#cccccc' : '#4F4F4F' }}>
				{message('titleContent')}
				</Text>

				<Divider my='lg' />

				<Group mt='md' align='center' gap='md'>
					<Text size='sm' style={{ color: theme === 'dark' ? '#cccccc' : '#4F4F4F' }}>
						Display Language
					</Text>
					<Button
						onClick={(e) => {
							close(e);
							toggleLanguageFilter(e);
						}}
						style={{ backgroundColor: '#FFE8E8', padding: '8px 16px' }}
						variant='light'
						color='red'
						radius='xl'
						rightSection={<Down style={{ marginLeft: '8px', stroke: '#B82929' }} />}>
						{message('ChooseLanguage')}
					</Button>
				</Group>

				<Divider my='lg' />

				<Grid columns={2}>
					{[
						{
							href: '/articles',
							icon: <StoryOfIconFooter style={{ stroke: '#B82929' }} />,
							label: headerTrans('AllStories'),
						},
						{
							href: '/contribute',
							icon: <ContributeIconFooter style={{ stroke: '#B82929' }} />,
							label: headerTrans('contributeContent'),
						},
						{
							href: '/Inprogress',
							icon: <StoryOfIconFooter style={{ stroke: '#B82929' }} />,
							label: headerTrans('StoryofPARI'),
						},
						{ href: '/copyRights', icon: <CopyRightsIcon />, label: headerTrans('copyrights') },
						{ href: '/library', icon: <LibraryIconFooter style={{ stroke: '#B82929' }} />, label: headerTrans('Library') },
						{
							href: '/InProgress',
							icon: <VolunteerIconFooter style={{ stroke: '#B82929' }} />,
							label: headerTrans('volunteer'),
						},
						{
							href: '/Inprogress',
							icon: <StoryOfIconFooter style={{ stroke: '#B82929' }} />,
							label: headerTrans('OurTeam'),
						},
						{
							href: '/grievance',
							icon: <GrievancesFooter style={{ stroke: '#B82929' }} />,
							label: headerTrans('grievances'),
						},
						{
							href: '/education',
							icon: <EducationIconFooter style={{ stroke: '#B82929' }} />,
							label: headerTrans('Education'),
						},
						{ href: '/acknowledgment', icon: <AcknowledgmentIcon />, label: headerTrans('Acknowledgements') },
						{
							href: '/donate-pari',
							icon: <DonateIconFooter style={{ stroke: '#B82929' }} />,
							label: headerTrans('Donate'),
						},
						{
							href: '/getInTouch',
							icon: <GetInTouchIconFooter style={{ stroke: '#B82929' }} />,
							label: headerTrans('ContactUs'),
						},
						{
							href: '/termsOfServices',
							icon: <TermsOfServiceFooter style={{ stroke: '#B82929' }} />,
							label: headerTrans('termsAndConditions'),
						},
						
						
						//{ href: '/Inprogress', icon: <StoryOfIconFooter style={{ stroke: '#B82929' }} />, label: headerTrans('Awards') },
						
						
						
						
						
						
						
					].map((item, idx) => (
						<Grid.Col span={1} key={idx}>
							<Button variant='transparent' component={Link} leftSection={item.icon} href={item.href}>
								<Text c='black'>{item.label}</Text>
							</Button>	
						</Grid.Col>
					))}
				</Grid>

				<Divider my='lg' />

				<div>
					<Title order={2} style={{ fontSize: '18px', color: theme === 'dark' ? '#ffffff' : '#333333' }}>
						{headerTrans('signUpNewsletter')}
					</Title>
					<Group mt='sm' align='center' gap='md'>
						<Input placeholder={headerTrans('emailAddress')} style={{ flex: 1 }} radius='xl' size='sm' />
						<Button variant='filled' color='red' radius='xl' size='sm'>
							{headerTrans('subscribe')}
						</Button>
					</Group>
				</div>
			</div>
		</Drawer>
	);
};

export default MobileMenu;
