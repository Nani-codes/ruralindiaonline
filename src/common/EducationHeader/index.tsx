'use client';

import { Down, Menu, RightArrowMenuIcon, Search } from '../@the-source/Icon';
import { useEffect, useState } from 'react';

import EducationContext from '../../lib/EducationContext';
import Filters from '../Header/Filters';
import Language from '../Header/Language';
import Link from 'next/link';
import MobileMenu from '../Header/MobileMenu';
import { useElementSize } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

interface Localization {
	attributes: {
		locale: string;
		// other properties
	};
	// other properties
}

interface HeaderProps {
	localizationsData?: Localization[];
	setNavSize: React.Dispatch<React.SetStateAction<number>>;
}
const Header: React.FC<HeaderProps> = ({ localizationsData, setNavSize }) => {
	// // console.log('heree',localizationsData);
	const { ref, width } = useElementSize();

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
		setNavSize(width);
	}, [width]);

	const toggleMenu = (e: any) => {
		e.preventDefault();
		setIsOpen(!isOpen);
		closeLanguageFilter(e);
	};

	const closeMenu = (e: any) => {
		e.preventDefault();
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
		// e.preventDefault();
		setIsLanguage(false);
	};

	const closeFilter = (e: any) => {
		e.preventDefault();
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
			<div
				className='sticky 	bg-white font-sans dark:bg-primary-pari-black sticky z-10 transition-all border-b border-gray-5 dark:border-gray'
				id='navbar'>
				<div
					ref={ref}
					style={{ height: 60 }}
					className='
					
                    max-width-container
                    flex items-center justify-between
                    3xl:px-[104px] 2xl:px-[104px] xl:px-[104px] lg:px-[104px] md:px-[32px] sm3:px-[32px] sm2:px-[32px] sm:px-[32px] xs:px-[16px]
                '>
					<div className='flex flex-row gap-[20px] items-center md:gap-[12px] sm3:gap-[12px] sm2:gap-[12px] sm:gap-[12px] xs:gap-[12px]'>
						<Link href='#' className='md:flex sm3:flex sm2:flex sm:flex xs:flex hidden' onClick={toggleMenu}>
							<Menu />
						</Link>
						<Link href='/' className='logo bg-main-bg-logo dark:bg-dark-main-bg-logo' />

						{/* <div className='logo bg-main-bg-logo dark:bg-dark-main-bg-logo' href='/' /> */}
						<button
							onClick={toggleLanguageFilter}
							style={{ backgroundColor: '#FFE8E8', padding: '8px 16px' }}
							className='
                            flex
                            items-center
                            rounded-[32px]
                            text-primary-pari-red
                            md:hidden sm:hidden xs:hidden sm2:hidden sm3:hidden
                        '>
							{'Choose Language'}
							<Down className='stroke-[#B82929]' />
						</button>
					</div>

					<div
						className='
                            flex flex-row items-center
                            md:hidden sm:hidden xs:hidden sm3:hidden sm2:hidden dark:text-gray-7 
                            text-[12px] text-gray-1 font-semibold
                        '
						style={{ gap: 20 }}>
						<div
							onMouseEnter={() => setStoriesOpen(true)}
							onMouseLeave={() => setStoriesOpen(false)}
							className='h-[60px] flex flex-col items-center justify-center'>
							<Link
								href='#'
								id='stories'
								data-dropdown-toggle='storiesHover'
								data-dropdown-trigger='hover'
								className='flex items-center'>
								{'Stories'}
								<RightArrowMenuIcon
									className={`stroke-grey-1 dark:stroke-[#fff] transition-all ${storiesOpen ? 'rotate-90' : ''}`}
								/>
							</Link>
							<div
								className={`
                                    absolute
                                    z-10 bg-white dark:bg-primary-pari-black 
                                    divide-y divide-gray-100 
                                    rounded-lg shadow w-44 dark:bg-gray-700
                                    top-[60px]
																		
                                    transition-all
                                    ${storiesOpen ? '' : 'hidden'}
                                `}>
								<ul className='py-2  text-gray-700 dark:text-gray-200 text-[12px]' aria-labelledby='stories'>
									<li>
										<Link href='/articles?type=article' className='block px-4 py-2 hover:opacity-20'>
											All Stories
										</Link>
									</li>
									{/* <li>
										<Link href='/Inprogress' className='block px-4 py-2 hover:opacity-20'>
											Deep Dive Stories
										</Link>
									</li> */}
									<li>
										<Link href='/Inprogress' className='block px-4 py-2 hover:opacity-20'>
											Video Stories
										</Link>
									</li>
									<li>
										<Link href='/Inprogress' className='block px-4 py-2 hover:opacity-20'>
											Audio Stories
										</Link>
									</li>
									<li>
										<Link href='/Inprogress' className='block px-4 py-2 hover:opacity-20'>
											Photo Stories
										</Link>
									</li>
								</ul>
							</div>
						</div>
						<div
							onMouseEnter={() => setLibraryOpen(true)}
							onMouseLeave={() => setLibraryOpen(false)}
							className='h-[60px] flex flex-col items-center justify-center'>
							<Link
								href='#'
								id='library'
								data-dropdown-toggle='storiesHover'
								data-dropdown-trigger='hover'
								className='flex items-center'>
								{'Library'}
								<RightArrowMenuIcon
									className={`stroke-grey-1 dark:stroke-white transition-all ${libraryOpen ? 'rotate-90' : ''}`}
								/>
							</Link>
							<div
								className={`
                                    absolute
                                    z-10 bg-white dark:bg-primary-pari-black 
                                    divide-y divide-gray-100 
                                    rounded-lg shadow w-44 dark:bg-gray-700
                                    ${libraryOpen ? '' : 'hidden'}
                                    top-[60px]
                                `}>
								<ul className='py-2 text-[12px] text-gray-700 dark:text-gray-200' aria-labelledby='stories'>
									<li>
										<Link href='/library' className='block px-4 py-2 hover:opacity-20'>
											All Files
										</Link>
									</li>
									<li>
										<Link href='/Inprogress' className='block px-4 py-2 hover:opacity-20'>
											Faces
										</Link>
									</li>

									<li>
										<Link href='/Inprogress' className='block px-4 py-2 hover:opacity-20'>
											Freedom Fighter&apos;s Gallery
										</Link>
									</li>
									<li>
										<Link href='/childrens-paintings' className='block px-4 py-2 hover:opacity-20'>
											Adivasi Children Painting
										</Link>
									</li>
								</ul>
							</div>
						</div>
						<Link href='/education'>{'Education'}</Link>
						<div
							onMouseEnter={() => setAboutOpen(true)}
							onMouseLeave={() => setAboutOpen(false)}
							className='h-[60px] flex flex-col items-center justify-center'>
							<Link
								href='#'
								id='stories'
								data-dropdown-toggle='storiesHover'
								data-dropdown-trigger='hover'
								className='flex items-center'>
								{'About'}
								<RightArrowMenuIcon
									className={`stroke-grey-1 dark:stroke-[#fff] transition-all ${aboutOpen ? 'rotate-90' : ''}`}
								/>
							</Link>
							<div
								className={`
                                    absolute
                                    z-10 bg-white dark:bg-primary-pari-black 
                                    divide-y divide-gray-100 
                                    rounded-lg shadow w-44 dark:bg-gray-700
                                    ${aboutOpen ? '' : 'hidden'}
                                    top-[60px]
                                `}>
								<ul className='py-2 text-[12px] text-gray-700 dark:text-gray-200' aria-labelledby='stories'>
									<li>
										<Link href='/Inprogress' className='block px-4 py-2 hover:opacity-20'>
											Story of PARI
										</Link>
									</li>
									<li>
										<Link href='/Inprogress' className='block px-4 py-2 hover:opacity-20'>
											PARI Team
										</Link>
									</li>
									<li>
										<Link href='/acknowledgment' className='block px-4 py-2 hover:opacity-20'>
											Acknowledgement
										</Link>
									</li>
									{/* <li>
										<Link href='#' className='block px-4 py-2 hover:opacity-20'>
											Volunteer
										</Link>
									</li>
									<li>
										<Link href='#' className='block px-4 py-2 hover:opacity-20'>
											Get in touch
										</Link>
									</li>

									<li>
										<Link href='#' className='block px-4 py-2 hover:opacity-20'>
											Terms of Service
										</Link>
									</li>
									<li>
										<Link href='#' className='block px-4 py-2 hover:opacity-20'>
											Grievances
										</Link>
									</li> */}
								</ul>
							</div>
						</div>
						<div
							onMouseEnter={() => setInvolvedOpen(true)}
							onMouseLeave={() => setInvolvedOpen(false)}
							className='h-[60px] flex flex-col items-center justify-center'>
							<Link
								href='/contribute'
								id='getInvolved'
								data-dropdown-toggle='getInvolvedHover'
								data-dropdown-trigger='hover'
								className='flex items-center'>
								{'Get Involved'}
								<RightArrowMenuIcon
									className={`stroke-grey-1 dark:stroke-[#fff] transition-all ${involvedOpen ? 'rotate-90' : ''}`}
								/>
							</Link>
							<div
								className={`
                                    absolute
                                    z-10 bg-white dark:bg-primary-pari-black 
                                    divide-y divide-gray-100 
                                    rounded-lg shadow w-44 dark:bg-gray-700
                                    top-[60px]
                                    transition-all
                                    ${involvedOpen ? '' : 'hidden'}
                                `}>
								<ul className='py-2 text-[12px] text-gray-700 dark:text-gray-200' aria-labelledby='stories'>
									<li>
										<Link href='/contribute' className='block px-4 py-2 hover:opacity-20'>
											Contribute
										</Link>
									</li>
									<li>
										<Link href='/guideline' className='block px-4 py-2 hover:opacity-20'>
											Guidelines
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div className='flex flex-row gap-[20px] items-center gap-[20px] md:gap-[12px] sm:gap-[12px] xs:gap-[12px]'>
						<Link href='/articles?search=q' className='  '>
							<Search />
						</Link>
						<Link
							href='/'
							onClick={toggleFilter}
							className='flex flex-row items-center text-[12px]
                            font-sans bg-primary-pari-red border border-primary-pari-red text-white
                            hover:bg-transparent hover:text-primary-pari-red  py-2 px-4 rounded-[32px]
                        '>
							{'Filters'}
						</Link>
						<Link
							href='/donate-pari'
							className='flex flex-row items-center text-[12px]
                            font-sans border border-primary-pari-red text-primary-pari-red 
                            hover:bg-primary-pari-red hover:text-white py-2 px-4 rounded-[32px]
                            md:hidden sm:hidden xs:hidden sm2:hidden sm3:hidden
                        '>
							{'Donate'}
						</Link>

						{/* <label className='switch md:hidden sm2:hidden sm:hidden sm3:hidden xs:hidden'>
							<input
								title={theme === 'light' ? 'Dark' : 'Light'}
								type='checkbox'
								onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
								checked={theme === 'dark'}
							/>
							<span className='slider round'></span>
						</label> */}
					</div>
				</div>
			</div>
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
