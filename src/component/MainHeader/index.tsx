import useDarkMode from '@/hooks/useDarkMode';
import { locales } from '@/utils/const';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import styles from './MainHeader.module.css';
import Menu from './Menu';
import { RightIcon } from '../Icon';
import Filters from './Filters';

const BackArrow = () => (
	<svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M12.8337 6.99999H1.16699M1.16699 6.99999L7.00033 12.8333M1.16699 6.99999L7.00033 1.16666'
			stroke='#B82929'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export default function MainHeader({ active, options }: any) {
	const { locale, push, query } = useRouter();
	const { search } = query;
	const menuRef = useRef<any>(null);
	const selected = locales.filter((item) => item.code === locale);
	const [colorTheme, setTheme] = useDarkMode();
	const [visible, setVisible] = useState(false);
	const [isFilter, setfilter] = useState(false);
	const [cateActive, setActive] = useState('');
	const [menu, setMenu] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const [isOpenArticle, setIsOpenArticle] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
		setIsOpenArticle(false);
	};

	const toggleArticleMenu = () => {
		setIsOpen(false);
		setIsOpenArticle(!isOpenArticle);
	};

	const goNavigate = () => {
		setVisible(false);
	};

	const closeMenu = () => setMenu(false);

	const openMenu = (e: any) => {
		e.preventDefault();
		setMenu(!menu);
	};

	const onEnter = (event: any) => {
		if (event.keyCode === 13) {
			// console.log(event.target.value);

			push({ query: { search, searchText: event.target.value } });
		}
	};

	useEffect(() => {
		let lastScrollTop: number;
		const navbar = document.getElementById('navbar');

		window.addEventListener('scroll', function () {
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

			if (navbar) {
				if (scrollTop <= lastScrollTop && lastScrollTop > 0) {
					navbar.style.top = '0';
				} else {
					navbar.style.top = '-300px';
					setVisible(false);
					setIsOpen(false);
				}
				lastScrollTop = scrollTop;
			}
		});
	});

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
				setIsOpenArticle(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div>
			<div className={styles.headerWrapper} id='navbar'>
				<div className={styles.header}>
					{search ? (
						<div className={styles.row}>
							<Link href='/' className={styles.link} locale={locale}>
								<BackArrow />
							</Link>
						</div>
					) : (
						<div className={styles.row}>
							<Link href='/' locale={locale} style={{ display: 'flex', alignItems: 'center' }}>
								<div className={styles.logo}></div>
								<h3 className={styles.logoTitle}>
									People’s Archive
									<br />
									of Rural India
								</h3>
							</Link>

							<Button className={styles.button} type='tratiary' onClick={() => setVisible(!visible)}>
								{selected?.[0]?.name}
								<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'>
									<path d='M1 1.5L6 6.5L11 1.5' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
								</svg>
							</Button>
						</div>
					)}

					{search ? (
						<div className={styles.search}>
							<svg
								width='32'
								height='32'
								viewBox='0 0 32 32'
								fill='#b82929'
								xmlns='http://www.w3.org/2000/svg'
								style={{ verticalAlign: 'bottom' }}>
								<g clipPath='url(#clip0_2243_3376)'>
									<path d='M20.6667 18.6667H19.6133L19.24 18.3067C20.5467 16.7867 21.3333 14.8133 21.3333 12.6667C21.3333 7.88 17.4533 4 12.6667 4C7.88 4 4 7.88 4 12.6667C4 17.4533 7.88 21.3333 12.6667 21.3333C14.8133 21.3333 16.7867 20.5467 18.3067 19.24L18.6667 19.6133V20.6667L25.3333 27.32L27.32 25.3333L20.6667 18.6667ZM12.6667 18.6667C9.34667 18.6667 6.66667 15.9867 6.66667 12.6667C6.66667 9.34667 9.34667 6.66667 12.6667 6.66667C15.9867 6.66667 18.6667 9.34667 18.6667 12.6667C18.6667 15.9867 15.9867 18.6667 12.6667 18.6667Z' />
								</g>
								<defs>
									<clipPath id='clip0_2243_3376'>
										<rect width='32' height='32' fill='white' />
									</clipPath>
								</defs>
							</svg>
							<input placeholder='Look for a story, category or an author..' onKeyDown={onEnter} />
						</div>
					) : (
						<div className={`${styles.menu} ${styles.gap}`}>
							<div style={{ position: 'relative' }}>
								<Link
									href='/about'
									className={styles.nohover}
									locale={locale}
									onClick={(e) => {
										e.preventDefault();
										toggleArticleMenu();
									}}>
									Stories
									<svg
										className={isOpenArticle ? styles['active-svg'] : ''}
										width='6'
										height='10'
										viewBox='0 0 6 10'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
										style={{ marginLeft: 10 }}>
										<path
											d='M1 9L5 5L1 1'
											stroke='#1F2A37'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</Link>
								{isOpenArticle && (
									<div className={styles['sub-menu']} ref={menuRef}>
										<ul>
											<li>
												<Link href='/search' locale={locale}>
													All Stories
												</Link>
											</li>

											<li>
												<Link href='/search?type=video' locale={locale}>
													Video Stories
												</Link>
											</li>
											<li>
												<Link href='/search?type=audio' locale={locale}>
													Audio Stories
												</Link>
											</li>
										</ul>
									</div>
								)}
							</div>
							<div>
								<Link className={active === 'library' ? styles.active : ''} href='/library?page=1' locale={locale}>
									Library
								</Link>
							</div>
							<div>
								<Link href='/education' locale={locale} className={active === 'education' ? styles.active : ''}>
									Education
								</Link>
							</div>

							{/* <Link
              href="/donate"
              className={active === "donate" ? styles.active : ""}
              locale={locale}
            >
              Donate
            </Link> */}

							<div style={{ position: 'relative' }}>
								<Link
									href='/about'
									className={styles.nohover}
									locale={locale}
									onClick={(e) => {
										e.preventDefault();
										toggleMenu();
									}}>
									About
									<svg
										className={isOpen ? styles['active-svg'] : ''}
										width='6'
										height='10'
										viewBox='0 0 6 10'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
										style={{ marginLeft: 10 }}>
										<path
											d='M1 9L5 5L1 1'
											stroke='#1F2A37'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</Link>
								{isOpen && (
									<div className={styles['sub-menu']} ref={menuRef}>
										<ul>
											<li>
												<Link href='/about' locale={locale}>
													Story of PARI
												</Link>
											</li>
											<li>
												<Link href='/about-the-editor' locale={locale}>
													P Sainath
												</Link>
											</li>
											<li>
												<Link href='/contribute' locale={locale}>
													Contribute
												</Link>
											</li>
											<li>
												<Link href='/about' locale={locale}>
													Volunteer
												</Link>
											</li>
											<li>
												<Link href='/contact-us' locale={locale}>
													Get in touch
												</Link>
											</li>
											<li>
												<Link href='/guidelines' locale={locale}>
													Guidelines
												</Link>
											</li>
											<li>
												<Link href='/terms-and-conditions' locale={locale}>
													Terms of Service
												</Link>
											</li>
											<li>
												<Link href='/grievance-redressal' locale={locale}>
													Grievances
												</Link>
											</li>
										</ul>
									</div>
								)}
							</div>

							{/* <Link
              href="/childrens-paintings"
              locale={locale}
              className={active === "childrens-paintings" ? styles.active : ""}
            >
              Children
            </Link> */}
						</div>
					)}

					<div className={styles.menu}>
						{search ? null : (
							<Link href='/search?search=q' locale={locale}>
								<svg
									width='32'
									height='32'
									viewBox='0 0 32 32'
									fill='#b82929'
									xmlns='http://www.w3.org/2000/svg'
									style={{ verticalAlign: 'bottom' }}>
									<g clipPath='url(#clip0_2243_3376)'>
										<path d='M20.6667 18.6667H19.6133L19.24 18.3067C20.5467 16.7867 21.3333 14.8133 21.3333 12.6667C21.3333 7.88 17.4533 4 12.6667 4C7.88 4 4 7.88 4 12.6667C4 17.4533 7.88 21.3333 12.6667 21.3333C14.8133 21.3333 16.7867 20.5467 18.3067 19.24L18.6667 19.6133V20.6667L25.3333 27.32L27.32 25.3333L20.6667 18.6667ZM12.6667 18.6667C9.34667 18.6667 6.66667 15.9867 6.66667 12.6667C6.66667 9.34667 9.34667 6.66667 12.6667 6.66667C15.9867 6.66667 18.6667 9.34667 18.6667 12.6667C18.6667 15.9867 15.9867 18.6667 12.6667 18.6667Z' />
									</g>
									<defs>
										<clipPath id='clip0_2243_3376'>
											<rect width='32' height='32' fill='white' />
										</clipPath>
									</defs>
								</svg>
							</Link>
						)}

						<Button label='Filters' className={styles.button} onClick={() => setfilter(true)} />
						{search ? null : (
							<Button
								type='secondary'
								label='Donate'
								className={styles.button}
								onClick={() => push({ pathname: 'donate' })}
							/>
						)}

						{/* <label className={styles.switch}>
							<input
								type='checkbox'
								onChange={() => setTheme(colorTheme === 'light' ? 'dark' : 'light')}
								checked={colorTheme === 'dark'}
							/>
							<span className={`${styles.slider} ${styles.round}`}></span>
						</label> */}
					</div>
				</div>
				<div className={styles.mobile}>
					{search ? (
						<div className={styles.row}>
							<Link href='/' className={styles.link} locale={locale}>
								<BackArrow />
							</Link>
						</div>
					) : (
						<div className={styles.row}>
							<Link href='/' locale={locale} onClick={openMenu}>
								<div className={menu ? styles.change : ''}>
									<div className={styles.bar} />
									<div className={styles.bar} />
									<div className={styles.bar} />
								</div>
							</Link>
							<Link href='/' locale={locale} style={{ display: 'flex', alignItems: 'center' }}>
								<div className={styles.logo}></div>
								<h3 className={styles.logoTitle}>
									People’s Archive
									<br />
									of Rural India
								</h3>
							</Link>
						</div>
					)}

					{search ? (
						<div className={styles.search}>
							<svg
								width='32'
								height='32'
								viewBox='0 0 32 32'
								fill='#b82929'
								xmlns='http://www.w3.org/2000/svg'
								style={{ verticalAlign: 'bottom' }}>
								<g clipPath='url(#clip0_2243_3376)'>
									<path d='M20.6667 18.6667H19.6133L19.24 18.3067C20.5467 16.7867 21.3333 14.8133 21.3333 12.6667C21.3333 7.88 17.4533 4 12.6667 4C7.88 4 4 7.88 4 12.6667C4 17.4533 7.88 21.3333 12.6667 21.3333C14.8133 21.3333 16.7867 20.5467 18.3067 19.24L18.6667 19.6133V20.6667L25.3333 27.32L27.32 25.3333L20.6667 18.6667ZM12.6667 18.6667C9.34667 18.6667 6.66667 15.9867 6.66667 12.6667C6.66667 9.34667 9.34667 6.66667 12.6667 6.66667C15.9867 6.66667 18.6667 9.34667 18.6667 12.6667C18.6667 15.9867 15.9867 18.6667 12.6667 18.6667Z' />
								</g>
								<defs>
									<clipPath id='clip0_2243_3376'>
										<rect width='32' height='32' fill='white' />
									</clipPath>
								</defs>
							</svg>
							<input placeholder='Look for a story, category or an author..' onKeyDown={onEnter} />
						</div>
					) : null}

					<div className={styles.row}>
						{search ? null : (
							<Link href='/search?search=q' locale={locale}>
								<svg width='32' height='32' viewBox='0 0 32 32' fill='#b82929' xmlns='http://www.w3.org/2000/svg'>
									<g clipPath='url(#clip0_2243_3376)'>
										<path d='M20.6667 18.6667H19.6133L19.24 18.3067C20.5467 16.7867 21.3333 14.8133 21.3333 12.6667C21.3333 7.88 17.4533 4 12.6667 4C7.88 4 4 7.88 4 12.6667C4 17.4533 7.88 21.3333 12.6667 21.3333C14.8133 21.3333 16.7867 20.5467 18.3067 19.24L18.6667 19.6133V20.6667L25.3333 27.32L27.32 25.3333L20.6667 18.6667ZM12.6667 18.6667C9.34667 18.6667 6.66667 15.9867 6.66667 12.6667C6.66667 9.34667 9.34667 6.66667 12.6667 6.66667C15.9867 6.66667 18.6667 9.34667 18.6667 12.6667C18.6667 15.9867 15.9867 18.6667 12.6667 18.6667Z' />
									</g>
									<defs>
										<clipPath id='clip0_2243_3376'>
											<rect width='32' height='32' fill='white' />
										</clipPath>
									</defs>
								</svg>
							</Link>
						)}

						{/* <label className={styles.switch}>
              <input
                type="checkbox"
                onChange={() =>
                  setTheme(colorTheme === "light" ? "dark" : "light")
                }
                checked={colorTheme === "dark"}
              />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label> */}
						<Button label='Filters' className={styles.button} onClick={() => setfilter(true)} />
						<Button label='Filters' className={styles.button} onClick={() => setfilter(true)} />
					</div>
				</div>
			</div>
			<div className={styles['sub-header-wrapper']} style={{ top: visible ? 60 : -1000 }}>
				<div className={styles['sub-header']}>
					{locales.map((item) => (
						<Link
							href='/'
							locale={item.code}
							className={`${styles['language']} ${item.code === locale ? styles['language-active'] : ''}`}
							key={`${item.name}_${item.id}`}
							onClick={goNavigate}>
							{item.name}
						</Link>
					))}
				</div>
			</div>

			<Menu open={menu} visible={visible} onClose={closeMenu} active={active} setVisible={setVisible} selected={selected} />

			<Filters options={options} setActive={setActive} active={cateActive} setfilter={setfilter} isFilter={isFilter} />
		</div>
	);
}
