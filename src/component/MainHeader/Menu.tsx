import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './MainHeader.module.css';
import { useState } from 'react';

export default function Menu({ open, onClose, active, setVisible, selected, visible }: any) {
	const { locale } = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenArticle, setIsOpenArticle] = useState(false);

	const toggleArticleMenu = () => {
		setIsOpen(false);
		setIsOpenArticle(!isOpenArticle);
	};

	const toggleMenu = () => {
		setIsOpen(false);
		setIsOpen(!isOpen);
	};

	const handleClick = () => {
		onClose?.();
	};
	return (
		<div className={styles['sub-header-wrapper']} style={{ top: open ? 60 : -1000 }}>
			<div className={styles['mobile-header']}>
				<div className={styles['menu-mobile']}>
					<div style={{ position: 'relative', marginBottom: 10, marginTop: 20 }}>
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
							<div className={styles['sub-menu']}>
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
						<Link href='/library?page=1' locale={locale} onClick={handleClick}>
							Library
						</Link>
					</div>
					<div>
						<Link
							href='/donate'
							className={active === 'donate' ? styles.active : ''}
							locale={locale}
							onClick={handleClick}>
							Donate
						</Link>
					</div>

					<Link href='/education' locale={locale} onClick={handleClick}>
						education
					</Link>
					<div style={{ position: 'relative', marginBottom: 10 }}>
						<Link
							href='/about'
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
							<div className={styles['sub-menu']}>
								<ul>
									<li>
										<Link href='/about' locale={locale}>
											About
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
										<Link href='/about' locale={locale}>
											Story of PARI
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
				</div>

				<button className={styles.btn} onClick={() => setVisible(!visible)}>
					<div className={styles['label-mobile']}>{selected?.[0]?.name}</div>
				</button>
			</div>
		</div>
	);
}
