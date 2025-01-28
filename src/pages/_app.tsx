import '@/styles/globals.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/nprogress/styles.css';
import 'react-photo-view/dist/react-photo-view.css';

import { DirectionProvider, LoadingOverlay, MantineProvider, useDirection } from '@mantine/core';
import { NavigationProgress, nprogress } from '@mantine/nprogress';
import { Suspense, useEffect, useState } from 'react';

import type { AppProps } from 'next/app';
import Footer from '@/common/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { Notifications } from '@mantine/notifications';
import SnackbarProvider from 'react-simple-snackbar';
import { useRouter } from 'next/router';
import { useWindowScroll } from '@mantine/hooks';
import { createTheme } from '@/mantine';
import { relative } from 'path';
export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [family, setFamily] = useState<string>('Noto Sans');
	const [, scrollTo] = useWindowScroll();
	const { dir, setDirection, toggleDirection } = useDirection();

	// const [dir, setDir] = useState('ltr');

	useEffect(() => {
		router.events.on('routeChangeStart', () => {
			scrollTo({ y: 0 });
			setLoading(true);
			nprogress.start();
		});
		router.events.on('routeChangeError', () => {
			setLoading(false);
			nprogress.complete();
		});
		router.events.on('routeChangeComplete', () => {
			setLoading(false);
			nprogress.complete();
		});
	}, [router, scrollTo]);

	useEffect(() => {
		let isRefresh = true;
		if (isRefresh) {
			switch (router.locale) {
				case 'en':
					setFamily('Noto Sans');
					break;
				case 'hi':
					setFamily('Noto Sans Devanagari');
					break;
				case 'te':
					setFamily('Noto Sans Telugu UI');
					break;
				case 'ta':
					setFamily('Noto Sans Tamil UI');
					break;
				case 'mr':
					setFamily('Noto Sans Devanagari');
					break;
				case 'gu':
					setFamily('Noto Sans Gujarati UI');
					break;
				case 'or':
					setFamily('Noto Sans Oriya');
					break;
				case 'kn':
					setFamily('Noto Sans Kannada UI');
					break;
				case 'pa':
					setFamily('Noto Sans Gurmukhi');
					break;
				case 'as':
					setFamily('Noto Sans Bengali UI');
					break;
				case 'ml':
					setFamily('Noto Sans Malayalam UI');
					break;
				case 'ur':
					setFamily('Noto Sans Urdu');
					break;
				case 'bn':
					setFamily('Noto Sans Bengali UI');
					break;
				case 'hi-in':
					setFamily('Noto Sans Devanagari');
					break;
				default:
					setFamily('Noto Sans');
					break;
			}
			// if (router.locale === 'ur') {
			// 	setDir('rtl');
			// 	setDirection('rtl');
			// } else {
			// 	setDir('ltr');
			// 	setDirection('ltr');
			// }
			const newDir = router.locale === 'ur' ? 'rtl' : 'ltr';
			document.documentElement.dir = newDir;
			document.documentElement.lang = router.locale ?? 'en';
			// Dynamically set dir on <html>
			setDirection(newDir); // Mantine Direction Provider
			// console.log('veekshan');
			//toggleDirection();
		}
		return () => {
			isRefresh = false;
		};
	}, [router.locale, setDirection]);

	return (
		<SnackbarProvider>
			<NextIntlClientProvider locale={router.locale} messages={pageProps.messages} timeZone={'Asia/Kolkata'}>
				<DirectionProvider initialDirection={dir}>
					<MantineProvider
						theme={createTheme({
							fontFamily: family,
						})}>
						<Notifications />
						<NavigationProgress color={'#B82929'} />
						<Suspense
							fallback={
								<LoadingOverlay
									visible={loading}
									zIndex={1000}
									h='100%'
									overlayProps={{ radius: 'sm', blur: 2 }}
									loaderProps={{ color: '#B82929' }}
								/>
							}>
							<LoadingOverlay
								visible={loading}
								zIndex={1000}
								h='100%'
								overlayProps={{ radius: 'sm', blur: 2 }}
								loaderProps={{ color: '#B82929' }}
							/>
							<div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
								<Component {...pageProps} />
								<Footer />
							</div>
						</Suspense>
					</MantineProvider>
				</DirectionProvider>
			</NextIntlClientProvider>
		</SnackbarProvider>
	);
}

// <style jsx global>{`
// 	.m_4081bf90 {
// 		flex-wrap: nowrap !important; /* Override flex-wrap */
// 	}
// `}</style>;
