import useDarkMode from '@/hooks/useDarkMode';
import { locales } from '@/utils/const';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../Button';
import styles from './MainHeader.module.css';
import Menu from './Menu';

export default function ChildHeader({ active }: any) {
	const [colorTheme, setTheme] = useDarkMode();
	const { locale, push } = useRouter();
	const [visible, setVisible] = useState(false);
	const [menu, setMenu] = useState(false);

	const selected = locales.filter((item) => item.code === locale);

	const goNavigate = () => {
		setVisible(false);
	};

	const closeMenu = () => setMenu(false);

	const openMenu = (e: any) => {
		e.preventDefault();
		setMenu(!menu);
	};

	useEffect(() => {
		let lastScrollTop: number;
		const navbar = document.getElementById('navbar');

		window.addEventListener('scroll', function () {
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

			if (navbar) {
				if (scrollTop > lastScrollTop) {
					navbar.style.top = '-300px';
					setVisible(false);
				} else {
					navbar.style.top = '0';
				}
				lastScrollTop = scrollTop;
			}
		});
	});

	return (
		<div>
			<div className={styles.headerWrapper} id='navbar'>
				<div className={styles.header}>
					<div className={styles.row}>
						<Link href='https://ruralindiaonline.org/' locale={locale}>
							{/* <div className={styles.logo}></div> */}
							<div className={styles.logodiv}>
								<a href='/' className='px-4 logo bg-main-bg-logo dark:bg-dark-main-bg-logo'></a>
							</div>
						</Link>
						{/* <button className={styles.btn} onClick={() => setVisible(!visible)}>
              <span className={styles.text}>Language</span>
              <div className={styles.label}>{selected?.[0]?.name}</div>
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.41 0.589844L6 5.16984L10.59 0.589844L12 1.99984L6 7.99984L0 1.99984L1.41 0.589844Z"
                  fill="#B82929"
                />
              </svg>
            </button> */}
					</div>
					<div className={styles.menu}>
						<Link href='https://ruralindiaonline.org/en/library/' locale={locale}>
							Library
						</Link>
						<Link
							href='https://ruralindiaonline.org/en/pages/donate/'
							className={active === 'donate' ? styles.active : ''}
							locale={locale}>
							Donate
						</Link>
						<Link href='https://pari.education/' locale={locale}>
							education
						</Link>
						<Link
							href='/childrens-paintings'
							locale={locale}
							className={active === 'childrens-paintings' ? styles.active : ''}>
							Children
						</Link>
						<Button label='Refine' className={styles.button} />
						{/* <label className={styles.switch}>
              <input
                type="checkbox"
                onChange={() =>
                  setTheme(colorTheme === 'light' ? 'dark' : 'light')
                }
                checked={colorTheme === 'dark'}
              />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label> */}
					</div>
				</div>
				<div className={styles.mobile}>
					<div className={styles.row}>
						<Link href='/' locale={locale} onClick={openMenu}>
							<div className={menu ? styles.change : ''}>
								<div className={styles.bar} />
								<div className={styles.bar} />
								<div className={styles.bar} />
							</div>
						</Link>
					</div>
					<div className={styles.row}>
						<Link href='/' locale={locale}>
							{/* <div className={styles.logo}></div> */}
							<div className={styles.logodiv}>
								<a href='/' className='px-4 logo bg-main-bg-logo dark:bg-dark-main-bg-logo'></a>
							</div>
						</Link>
					</div>
					<div className={styles.row}>
						<Link href='/' locale={locale}>
							<svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
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
			</div>
			<div className={styles['sub-header-wrapper']} style={{ top: visible ? 60 : -1000 }}>
				<div className={styles['sub-header']}>
					{locales.map((item) => (
						<Link
							href='/'
							locale={item.code}
							className={styles['language']}
							key={`${item.name}_${item.id}`}
							onClick={goNavigate}>
							{item.name}
						</Link>
					))}
				</div>
			</div>

			<Menu open={menu} visible={visible} onClose={closeMenu} active={active} setVisible={setVisible} selected={selected} />
		</div>
	);
}
