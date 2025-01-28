'use client';

import { Down, RightArrowMenuIcon, Search } from '../@the-source/Icon';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import classes from './index.module.css';
interface Localization {
	attributes: {
		locale: string;
		// other properties
	};
	// other properties
}

interface HeaderProps {
	localizationsData?: Localization[];
}
const Header: React.FC<HeaderProps> = ({ localizationsData }) => {
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
			<div className={classes.navbar} id='navbar'>
				<div style={{ height: 60 }} className={classes.container}>
					<div className={classes.logodiv}>
						<a href='/' className='px-4 logo bg-main-bg-logo dark:bg-dark-main-bg-logo'></a>
					</div>

					<div className='flex flex-row gap-[20px] items-center gap-[20px] md:gap-[12px] sm:gap-[12px] xs:gap-[12px]'>
						<Link href='/articles?search=q' className='md:hidden sm:hidden xs:hidden sm2:hidden sm3:hidden '>
							<Search />
						</Link>

						<Link
							href='/donate-pari'
							className='flex flex-row items-center text-[12px]
                            font-sans border border-primary-pari-red text-primary-pari-red
                            hover:bg-primary-pari-red hover:text-white py-2 px-4 rounded-[32px]
                            md:hidden sm:hidden xs:hidden sm2:hidden sm3:hidden
                        '>
							{message('Donate')}
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
