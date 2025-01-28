import { useCallback, useEffect, useState } from 'react';

import Button from '../Button';
import Link from 'next/link';
import { locales } from '@/utils/const';
import styles from './ArticleHeader.module.css';
import useDarkMode from '@/hooks/useDarkMode';
import { useRouter } from 'next/router';

export default function ArticleHeader({ location, language }: any) {
	const [colorTheme, setTheme] = useDarkMode();
	const { locale, back, push, query } = useRouter();
	const [city, setCity] = useState('');
	const [visible, setVisible] = useState(false);
	const [scrollProgress, setScrollProgress] = useState('0%');

	const newLanguage: any[] = [];

	locales?.forEach((item) => {
		language?.forEach((lang: any) => {
			if (lang?.attributes?.locale === item.code) {
				newLanguage.push({
					...lang?.attributes,
					name: item.name,
				});
			}
		});
	});

	let selected: any[] = newLanguage.filter((item) => {
		if (item.slug === query.slug) {
			return true;
		}
	});

	if (!language) {
		selected = locales.filter((item) => item.code === locale);
	}

	// const getCity = useCallback(async () => {
	//   // const loc = JSON.parse(location ?? null);

	//   // if (loc) {
	//   //   const result = await MapService.getAddress(`${loc.lat},${loc.lng}`);
	//   //   if (result.isOk()) {
	//   //     const { value } = result;
	//   //     const address = getAddressObject(
	//   //       value?.results?.[0]?.address_components ?? []
	//   //     );
	//   //     if (address) {
	//   //       setCity(`${address?.city}, ${address?.state}`);
	//   //     }
	//   //   }
	//   }
	// }, [location]);

	const goBack = (e: any) => {
		e.preventDefault();
		back();
	};

	const goNavigate = (e: any, slug: string) => {
		e.preventDefault();
		push({ pathname: `/articles/${slug}` });
		setVisible(false);
	};

	// useEffect(() => {
	//   getCity();
	// }, [getCity]);

	useEffect(() => {
		let lastScrollTop: number;
		const navbar = document.getElementById('navbar');

		window.addEventListener('scroll', function () {
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

			if (navbar) {
				if (scrollTop > lastScrollTop) {
					navbar.style.top = '0px';
					setVisible(false);
				} else {
					navbar.style.top = '0';
				}
				lastScrollTop = scrollTop;
			}
		});
	});

	useEffect(() => {
		const handleScroll = () => {
			const totalScroll = document.documentElement.scrollTop;
			const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			const progress = `${(totalScroll / windowHeight) * 100}%`;
			setScrollProgress(progress);
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div>
			<div className={styles.headerWrapper} id='navbar'>
				<div className={styles.header}>
					<div className={styles.row}>
						<Link href='/' onClick={goBack} locale={locale}>
							<BackArrow />
						</Link>
						<Button onClick={() => setVisible(!visible)} className={styles.button} type='tratiary'>
							{selected?.[0]?.name}
							<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'>
								<path d='M1 1.5L6 6.5L11 1.5' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
							</svg>
						</Button>
					</div>
					<div className={styles.row}>
						{location ? <LocationPin /> : null}
						{location ? <p className={styles.title}>{location}</p> : null}
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
			<div
				style={{
					width: scrollProgress,
					height: '2px',
					backgroundColor: '#B82929',
					position: 'fixed',
					zIndex: 9999,
					top: 60,
				}}
			/>
			<div className={styles['sub-header-wrapper']} style={{ top: visible ? 60 : -3000 }}>
				<div className={styles['sub-header']}>
					{!language ? (
						<>
							{locales.map((item) => (
								<Link
									href='/'
									locale={item.code}
									className={`${styles['language']} ${item.code === locale ? styles['language-active'] : ''}`}
									key={`${item.name}_${item.id}`}
									onClick={(e) => goNavigate(e, item.code)}>
									{item.name}
								</Link>
							))}
						</>
					) : (
						<>
							{newLanguage?.map((item: any) => (
								<Link
									href='/'
									locale={item.code}
									className={`${styles['language']} ${item.code === locale ? styles['language-active'] : ''}`}
									key={`${item.name}_${item.id}`}
									onClick={(e) => goNavigate(e, item?.slug)}>
									{item.name}
								</Link>
							))}
						</>
					)}
				</div>
			</div>
		</div>
	);
}

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

const LocationPin = () => (
	<svg width='16' height='20' viewBox='0 0 16 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M7.99967 10.4167C9.38039 10.4167 10.4997 9.29737 10.4997 7.91666C10.4997 6.53594 9.38039 5.41666 7.99967 5.41666C6.61896 5.41666 5.49967 6.53594 5.49967 7.91666C5.49967 9.29737 6.61896 10.4167 7.99967 10.4167Z'
			stroke='#B82929'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M7.99967 18.3333C9.66634 15 14.6663 12.8486 14.6663 8.33332C14.6663 4.65142 11.6816 1.66666 7.99967 1.66666C4.31778 1.66666 1.33301 4.65142 1.33301 8.33332C1.33301 12.8486 6.33301 15 7.99967 18.3333Z'
			stroke='#B82929'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);
