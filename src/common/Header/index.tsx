'use client';

import { Down, Menu as MenuIcon, RightArrowMenuIcon, Search } from '../@the-source/Icon';
import { useEffect, useState } from 'react';
import { DOMAIN } from '@/config';
import Filters from './Filters';
import Language from './Language';
import { locales } from '@/constants';
import Link from 'next/link';
import MobileMenu from './MobileMenu';
import { useElementSize } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Container, Group, Menu, Text, Button, Box, Divider } from '@mantine/core';

interface Localization {
	attributes: {
		locale: string;
		// other properties
	};
	// other properties
}

interface HeaderProps {
	localizationsData?: Localization[];
	setNavSize?: React.Dispatch<React.SetStateAction<number>>;
}

const Header: React.FC<HeaderProps> = ({ localizationsData, setNavSize }) => {
	const { ref, width } = useElementSize();
	const headerTrans = useTranslations('header');
	const menu = useTranslations('menu');
	const message = useTranslations('Index');
	const [isOpen, setIsOpen] = useState(false);
	const [storiesOpen, setStoriesOpen] = useState(false);
	const [involvedOpen, setInvolvedOpen] = useState(false);
	const [libraryOpen, setLibraryOpen] = useState(false);
	const [aboutOpen, setAboutOpen] = useState(false);
	const [isOpenFilter, setIsOpenFilter] = useState(false);
	const [isLanguage, setIsLanguage] = useState(false);
	const { theme, setTheme } = useTheme();
	const router = useRouter();

	useEffect(() => {
		if (setNavSize) {
			setNavSize(width);
		}
	}, [width, setNavSize]);
	const toggleMenu = (e: any) => {
		e.preventDefault();
		setIsOpen(!isOpen);
		closeLanguageFilter(e);
	};

	const closeMenu = (e: any) => {
		if (e) {
			e.preventDefault();
		}
		setIsOpen(false);
	};

	const toggleFilter = (e: any) => {
		e.preventDefault();
		setIsOpenFilter(!isOpenFilter);
	};
	const toggleLanguageFilter = (e: any) => {
		e.preventDefault();
		setIsLanguage(!isLanguage);
	};
	const closeLanguageFilter = (e: any) => {
		setIsLanguage(false);
	};

	const closeFilter = () => {
		setIsOpenFilter(false);
	};

	useEffect(() => {
		let lastScrollTop: number;
		const navbar = document.getElementById('navbar');

		window.addEventListener('scroll', function () {
			let scrollTop = window.scrollY || document.documentElement.scrollTop;

			if (navbar) {
				if (scrollTop <= lastScrollTop && lastScrollTop > 0) {
					navbar.style.top = '0';
				} else {
					navbar.style.top = '-300px';
				}
				lastScrollTop = scrollTop;
			}
			setIsLanguage(false);
		});
	});

	useEffect(() => {
		router.events.on('routeChangeComplete', () => {
			setIsLanguage(false);
			setIsOpen(false);
			setIsOpenFilter(false);
		});
	}, [router]);

	return (
		<>
			<Box
				ref={ref}
				id='navbar'
				style={{
					position: 'sticky',
					top: 0,
					backgroundColor: 'white',
					zIndex: 10,
					transition: 'all 0.3s',
					borderBottom: `1px solid #E5E5E5`,
				}}>
				<Container
					className='header-container'
					size='xl'
					style={{
						height: 60,
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						background: '#fff',
					}}>
					<Group className='hamburger-mobile'>
						<Button hiddenFrom='lg' variant='transparent' component={Link} href='#' onClick={toggleMenu}>
							<MenuIcon />
						</Button>
						<Link href='/' className='logo bg-main-bg-logo dark:bg-dark-main-bg-logo' />

						<Button
							style={{
								fontSize: '12px',
							}}
							onClick={toggleLanguageFilter}
							variant='light'
							visibleFrom='xl'>
							{headerTrans('ChooseLanguage')}
							<Down
								style={{
									stroke: '#B82929',
								}}
							/>
						</Button>
					</Group>

					<Group visibleFrom='lg' gap='xs'>
						<Menu
							trigger='hover'
							opened={storiesOpen}
							onOpen={() => setStoriesOpen(true)}
							onClose={() => setStoriesOpen(false)}>
							<Menu.Target>
								<Button
									style={
										{
											// fontSize: '12px',
										}
									}
									variant='transparent'
									c='black'
									size='compact-xs'
									rightSection={
										<RightArrowMenuIcon
											style={{ stroke: 'black' }}
											className={`transition-all ${storiesOpen ? 'rotate-90' : ''}`}
										/>
									}>
									{headerTrans('Stories')}
								</Button>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item
									component={Link}
									href='/articles'
									style={{
										fontSize: '12px',
									}}>
									{headerTrans('AllStories')}
								</Menu.Item>
								{/* <Menu.Item component={Link} href='/Inprogress'>
									Deep Dive Stories
								</Menu.Item> */}
								<Menu.Item
									component={Link}
									href='articles?categoryIds=436'
									style={{
										fontSize: '12px',
									}}>
									{headerTrans('VideoStories')}
								</Menu.Item>
								<Menu.Item
									component={Link}
									href='articles?categoryIds=448'
									style={{
										fontSize: '12px',
									}}>
									{headerTrans('AudioStories')}
								</Menu.Item>
								<Menu.Item
									component={Link}
									href='articles?categoryIds=441'
									style={{
										fontSize: '12px',
									}}>
									{headerTrans('PhotoStories')}
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>

						<Menu
							trigger='hover'
							opened={libraryOpen}
							onOpen={() => setLibraryOpen(true)}
							onClose={() => setLibraryOpen(false)}>
							<Menu.Target>
								<Button
									variant='transparent'
									size='compact-xs'
									c='black'
									rightSection={
										<RightArrowMenuIcon
											style={{ stroke: 'black' }}
											className={`transition-all ${libraryOpen ? 'rotate-90' : ''}`}
										/>
									}>
									{headerTrans('Resources')}
								</Button>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item
									style={{
										fontSize: '12px',
									}}
									component={Link}
									href='/library'>
									{headerTrans('Library')}
								</Menu.Item>
								<Menu.Item
									style={{
										fontSize: '12px',
									}}
									component={Link}
									href='categories/faces/'>
									{headerTrans('Faces')}
								</Menu.Item>
								<Menu.Item
									style={{
										fontSize: '12px',
									}}
									component={Link}
									href='albums/freedom-fighters/'>
									{headerTrans('FreedomFightersGallery')}
								</Menu.Item>
								<Menu.Item
									style={{
										fontSize: '12px',
									}}
									component={Link}
									href='/childrens-paintings'>
									{headerTrans('ArtOfAdivasiChildren')}
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>

						<Link href='/education'>
							<Button variant='transparent' c='black' size='compact-xs'>
								{headerTrans('Education')}
							</Button>
						</Link>

						<Menu trigger='hover' opened={aboutOpen} onOpen={() => setAboutOpen(true)} onClose={() => setAboutOpen(false)}>
							<Menu.Target>
								<Button
									variant='transparent'
									c='black'
									size='compact-xs'
									rightSection={
										<RightArrowMenuIcon
											style={{ stroke: 'black' }}
											className={`transition-all ${aboutOpen ? 'rotate-90' : ''}`}
										/>
									}>
									{headerTrans('About')}
								</Button>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item
									style={{
										fontSize: '12px',
									}}
									component={Link}
									href={`${DOMAIN}/${router.locale}/article/Many-Worlds-One-Website-${router.locale}`}>
									{headerTrans('StoryofPARI')}
								</Menu.Item>
								<Menu.Item
									style={{
										fontSize: '12px',
									}}
									component={Link}
									href='/Inprogress'>
									{headerTrans('OurTeam')}
								</Menu.Item>
								<Menu.Item
									style={{
										fontSize: '12px',
									}}
									component={Link}
									href='/Inprogress'>
									{headerTrans('Contributors')}
								</Menu.Item>
								<Menu.Item
									style={{
										fontSize: '12px',
									}}
									component={Link}
									href='/acknowledgment'>
									{headerTrans('Acknowledgements')}
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>

						<Menu
							trigger='hover'
							opened={involvedOpen}
							onOpen={() => setInvolvedOpen(true)}
							onClose={() => setInvolvedOpen(false)}>
							<Menu.Target>
								<Button
									size='compact-xs'
									variant='transparent'
									c='black'
									rightSection={
										<RightArrowMenuIcon
											style={{ stroke: 'black' }}
											className={`transition-all ${involvedOpen ? 'rotate-90' : ''}`}
										/>
									}>
									{headerTrans('GetInvolved')}
								</Button>
							</Menu.Target>
							<Menu.Dropdown>
							<Menu.Item
								style={{
									fontSize: '12px',
								  }}
								  component={Link}
								  href='/getInTouch'>
								{headerTrans('ContactUs')}
							</Menu.Item>
							<Menu.Item
								style={{
									fontSize: '12px',
								}}
								component={Link}
								href='/donate-pari'>
								{headerTrans('Donate')}
							</Menu.Item>
								
								<Menu.Item
									style={{
										fontSize: '12px',
									}}
									component={Link}
									href='/guideline'>
									{headerTrans('ContributorsGuidelines')}
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</Group>

					<Group className='hamburger-mobile search'>
						<Link href='/articles?search=q'>
							<Search />
						</Link>
						<Button onClick={toggleFilter}>{headerTrans('Filters')}</Button>
						<Link href='/donate-pari'>
							<Button variant='outline-hover-filled' visibleFrom='md'>
								{headerTrans('Donate')}
							</Button>
						</Link>
					</Group>
				</Container>
			</Box>
			<Language close={closeLanguageFilter} isOpen={isLanguage} localizationsData={localizationsData} />
			<MobileMenu
				close={closeMenu}
				isOpen={isOpen}
				toggleLanguageFilter={toggleLanguageFilter}
				theme={theme}
				setTheme={setTheme}
			/>
			<Filters close={closeFilter} isOpen={isOpenFilter} />
		</>
	);
};

export default Header;
