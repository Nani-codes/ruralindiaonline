import {
	ActionIcon,
	Affix,
	Box,
	Button,
	Center,
	Popover,
	SimpleGrid,
	Space,
	Text,
	Title,
	Transition,
	useDirection,
} from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery, useScrollIntoView, useViewportSize, useWindowScroll } from '@mantine/hooks';

import ArticleText from '@/mantine_components/Text/ArticleText';
import Author from './components/Author';
import { BASE_URL } from '@/config';
import Banner from '@/common/Article/components/Banner';
import CustomCarousel from './components/RelatedArticle';
import DonateComponent from '@/component/DonateComponent';
import FloatingIcons from '@/common/Article/components/FloatingIcons';
import Head from '@/common/Head';
import Header from '../../common/ArticleHead';
import SearchHeader from '@/common/Header/SearchHeader';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { get } from '@/utils';
import { locales } from '@/constants';
import { useAlignStyles } from '@/store/alignment_spacing';
import { useLnStyles } from '@/store/language_styles_store';
import { useRouter } from 'next/router';

const ModularContent = dynamic(() => import('@/common/Article/components/ModularContent'), { ssr: true });
const ArticleTitle = dynamic(() => import('@/common/Article/components/ArticleTitle'), { ssr: true });

interface Article {
	id: number;
	attributes: {
		slug: string;
		Cover_image: {
			data: {
				attributes: {
					url: string;
				};
			};
		};
		Title: string;
		republish_content: string;
		Authors: [
			{
				author_name: {
					data: {
						attributes: {
							Name: string;
						};
					};
				};
			},
		];
	};
}

interface Category {
	id: number;
}

export default function Article({ data, republish, donate, messages, ln_styles, categories, alignment_spacing }: any) {
	const { width } = useViewportSize();
	const { query } = useRouter();
	const { search }: any = query;
	const router = useRouter();
	// console.log(data);
	const article = get(data, 'data', {});
	const relatedArticles = get(data, 'relatedArticles', []);
	const nextdata = get(data, 'lastElement', []);
	const [opened, setOpened] = useState(false);

	const [, setLnStyles] = useLnStyles();
	const [, setAlignStyles] = useAlignStyles();

	useEffect(() => {
		if (ln_styles) {
			setLnStyles(ln_styles);
		}
	}, [ln_styles]);

	useEffect(() => {
		if (alignment_spacing) {
			// console.log('alignment_spacing', alignment_spacing);
			setAlignStyles(alignment_spacing);
		}
	}, [alignment_spacing]);

	useEffect(() => {
		let isRefresh = true;
		// console.log('router.locale', router.locale);
		if (isRefresh) {
			axios
				.get(
					`${BASE_URL}api/language-style?locale=${router.locale}&populate[xs][populate]=*&populate[sm][populate]=*&populate[md][populate]=*&populate[lg][populate]=*&populate[xl][populate]=*&populate[xl2][populate]=*`,
				)
				.then((res) => {
					// console.log('res', res?.data?.data?.attributes);
					setLnStyles(res?.data?.data?.attributes);
				});
		}
		return () => {
			isRefresh = false;
		};
	}, [router.locale]);

	const contentToDisplay = nextdata && nextdata?.attributes?.localizations?.data?.length > 0 ? nextdata : article;

	const TitleArt = get(article, 'attributes.Title', 'title');
	const Strap = get(article, 'attributes.Strap');
	// console.log('default', router.locale);
	const [selectedLanguage, setSelectedLanguage] = useState(data?.data?.attributes?.locale || router.locale);
	const [languages, setLanguages] = useState(contentToDisplay.attributes?.localizations?.data);

	useEffect(() => {
		setLanguages(contentToDisplay.attributes?.localizations?.data);
	}, [contentToDisplay.attributes?.localizations?.data]);

	const [scroll] = useWindowScroll();

	const { dir } = useDirection();
	const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
		offset: 60,
	});

	const is3XL = useMediaQuery('(min-width: 2560px)');
	const is2XL = useMediaQuery('(min-width: 1440px)');
	const isXL = useMediaQuery('(min-width: 1280px)');
	const isLG = useMediaQuery('(min-width: 1024px)');
	const isMD = useMediaQuery('(min-width: 768px)');
	const isSM = useMediaQuery('(min-width: 425px)');

	const scrollThreshold = is3XL ? 2500 : is2XL ? 1900 : isXL ? 1900 : isLG ? 1800 : isMD ? 1500 : isSM ? 1600 : 1600;

	return (
		<div>
			<Head title={TitleArt} description={Strap} keywords='rural india, archive, online archive, pari, p sainath, sainath,' />
			<div style={{ position: 'relative', zIndex: '9999' }}>
				{search ? <SearchHeader /> : <Header localizationsData={contentToDisplay.attributes?.localizations?.data} />}
			</div>

			<div className='max-width-container supreme bg-red pb-[56px]' style={{ display: 'unset' }}>
				<Banner article={article} />
				<ArticleTitle article={article} categories={categories} scrollToview={scrollIntoView} />

				<Center pt={width >= 767 ? '3rem' : '0.75rem'} w='100%'>
					<FloatingIcons articleId={article.id} />
				</Center>
				<Affix
					top={0}
					left={is2XL ? '2rem' : 0}
					h={scroll.y > scrollThreshold ? '4rem' : 0}
					w='100%'
					dir={router.locale === 'ur' ? 'rtl' : 'ltr'}>
					<Transition transition='pop' duration={0} mounted={scroll.y > scrollThreshold}>
						{(transitionStyles) => (
							<Center w='100%' h={'4rem'} bg='#FFFFFF' style={transitionStyles}>
								<FloatingIcons articleId={article.id} />
							</Center>
						)}
					</Transition>
				</Affix>

				<ModularContent article={article} articleid={article.id} />

				<ArticleText text={republish?.Text} />

				<Space h={'lg'} />
				<style>
					{`
			@media (max-width: 360px) {
				.mobile-left-margin {
					margin-left: 1rem !important;
				}
			}
		`}
				</style>
				<Box
					w={{ base: '100%', sm: '90vw', md: '85vw', lg: '60rem' }}
					m='auto'
					bg={'#FFFFFF'}
					p={width >= 1024 ? '3rem' : '2rem'}
					className='mobile-left-margin'>
					{/* <DonateComponent data={donate} messages={messages} /> */}
					<Space h='30' />
					<Author data={data} ref={targetRef} />
				</Box>

				<Box w={{ base: '100%', sm: '90vw', md: '85vw', lg: '80vw' }} m='auto'>
					<CustomCarousel relatedArticles={relatedArticles} />
				</Box>

				<Affix bottom={'1rem'} right={'1rem'}>
					<Popover width={200} position='bottom' withArrow shadow='md' opened={opened} onChange={setOpened}>
						<Popover.Target>
							<ActionIcon color='#B82929' size='xl' style={{ borderRadius: '50%' }} onClick={() => setOpened(true)}>
								{selectedLanguage?.toUpperCase()}
							</ActionIcon>
						</Popover.Target>
						<Popover.Dropdown w='24rem' style={{ borderRadius: '1rem' }}>
							<Title order={4} ta='center' mb='lg'>
								Select A Language
							</Title>

							<SimpleGrid cols={3} spacing='md'>
								{languages?.map((language: any, index: number) => (
									<Button
										key={index}
										color='#B82929'
										variant='outline-hover-filled'
										onClick={() => {
											router.push(`${language?.attributes?.slug}`, `${language?.attributes?.slug}`, {
												locale: language.attributes.locale,
											});
											setSelectedLanguage(language?.attributes?.locale);
											setOpened(false);
										}}>
										{locales?.find((l) => l.code === language?.attributes?.locale)?.name ||
											language.attributes.locale}
									</Button>
								))}
							</SimpleGrid>
						</Popover.Dropdown>
					</Popover>
				</Affix>
			</div>
		</div>
	);
}

export async function getServerSideProps({ locale, query }: any) {
	const { slug } = query;
	let relatedArticles: any[] = [];

	let data: any = {};
	let datayes: any = {};
	let ok: any = {};

	const res = await axios({
		url: `${BASE_URL}api/articles?locale=all&filters[slug][$eq]=${slug?.replaceAll('&', '%26')}&populate=deep`,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	// console.log(`${BASE_URL}api/articles?locale=all&filters[slug][$eq]=${slug?.replaceAll('&', '%26')}&populate=deep,6`);

	const url2 = `${BASE_URL}api/articles?locale=all&filters[slug][$eq]=${slug?.replaceAll('&', '%26')}&populate[categories]=deep`;

	const catRes = await axios({
		url: url2,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	// console.log('catRes', catRes.data.data[0].attributes.categories.data);

	const categories = catRes?.data?.data[0]?.attributes?.categories?.data;

	const ln_styles = await axios.get(
		`${BASE_URL}api/language-style?locale=${
			locale || 'en'
		}&populate[xs][populate]=*&populate[sm][populate]=*&populate[md][populate]=*&populate[lg][populate]=*&populate[xl][populate]=*&populate[xl2][populate]=*`,
	);

	const alignment_spacing = await axios.get(`${BASE_URL}api/alignment-spacing?populate=deep`);

	if (res.status !== 200) {
		throw new Error('Failed to fetch data');
	}
	const ids = categories?.map((category: Category) => category?.id);

	data = get(res, 'data.data.0', {});
	// console.log('data', data);
	// console.log('gg', gg);
	datayes = get(res, 'data.data.1', {});
	ok = get(res, 'data.data', {});
	const lastElement = ok.length > 0 ? ok[ok.length - 1] : {};
	const url = `${BASE_URL}api/articles?populate=deep,5&filters[categories][id][$eq]=${ids?.join(
		'&filters[categories][id][$eq]=',
	)}&pagination[page]=1&pagination[pageSize]=25`;

	// console.log('url', url);

	const temp = await axios(url)
		.then((res) => res.data)
		.catch((err) => {
			console.log('err', err);
		});

	relatedArticles = get(temp, 'data', []);

	const DonateResp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/donate-to-pari?populate[Donate_FAQ_Card][populate]=*`);

	const republishData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/republish-content?populate=*`);
	return {
		props: {
			messages: require(`@/locales/${locale}.json`),
			republish: republishData?.data?.data?.attributes,
			donate: DonateResp?.data?.data?.attributes,
			ln_styles: ln_styles?.data?.data?.attributes,
			alignment_spacing: alignment_spacing?.data?.data?.attributes,
			data: { data, relatedArticles, datayes, lastElement },
			categories: categories,
			headers: {
				'Cache-Control': 'no-store',
			},
		},
	};
}
