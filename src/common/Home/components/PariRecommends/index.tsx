'use client';

import { Carousel, CarouselSlide } from '@mantine/carousel';
import { PariRecommendIcon, RightIcon } from '@/common/@the-source/Icon';
import { get, map } from '@/utils';

import Card from '@/common/@the-source/Card';
import { Fragment } from 'react';
import Link from 'next/link';
import { Space } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useViewportSize } from '@mantine/hooks';

const List = ({ articles }: any) => {
	const { width } = useViewportSize();
	return (
		<Carousel
			styles={{ root: { width: '100%' } }}
			slideSize={{
				xs: '65vw',
				sm: '80vw',
				sm2: '66.3vw',
				sm3: '49.7vw',
				md: '35vw',
				lg: '16vw',
				xl: '16vw',
				xl2: '10vw',
				xl3: '10vw',
			}}
			align={'start'}
			// controlsOffset={'4.5rem'}
			dragFree
			withControls={width >= 1024 ? true : false}
			controlsOffset={width >= 1024 ? '4.5rem' : '0rem'}
			px={{ base: '2rem', md: '2rem', lg: '7rem', xl: '7rem', xl2: '7rem' }}
			slideGap={{ base: '1rem', md: '2rem', lg: '1.5rem', xl: '1.5rem', xl2: '1.5rem' }}>
			{map(articles, (article: any, index: number) => {
				if (!article || Object.keys(article).length === 0) {
					return null; // Skip rendering if article is empty
				}
				const key = article.id || `/article/${encodeURI(get(article, 'slug', ''))}-${index}`;

				// const key = `/article/${encodeURI(get(article, 'slug', ''))}`;
				// const key = `/article/${encodeURI(get(article, 'attributes.slug', ''))}`;
				return (
					<CarouselSlide
						key={key}
						style={{
							display: 'grid',
						}}>
						<Card key={key} article={article} />
					</CarouselSlide>
				);
			})}
		</Carousel>
	);
};

const tmpLocals = [
	{
		name: 'English',
		code: '',
	},
	{
		name: 'Telugu',
		code: 'te',
	},
	{
		name: 'Assamese',
		code: 'as',
	},
	{
		name: 'Bengali',
		code: 'bn',
	},
	{
		name: 'Gujurati',
		code: 'gu',
	},
	{
		name: 'Hindi',
		code: 'hi',
	},
	{
		name: 'Kannada',
		code: 'kn',
	},
	{
		name: 'Malayalam',
		code: 'ml',
	},
	{
		name: 'Marathi',
		code: 'mr',
	},
	{
		name: 'Punjabi',
		code: 'pa',
	},
	{
		name: 'Tamil',
		code: 'ta',
	},
	{
		name: 'Urdu',
		code: 'ur',
	},
	{
		name: 'Oriya',
		code: 'or',
	},
	{
		name: 'Bhojpuri',
		code: 'bho',
	},
	{
		name: 'Chattisgarhi',
		code: 'hne',
	},
];

const processArticlesWithLang = (articlesWithLang: any[], locals: any[]) => {
	return articlesWithLang
		.map((item: any) => {
			const allLanguages = get(item, 'all_language.data', {});
			const article = get(item, 'article.data.attributes', {});
			const localizations = get(item, 'article.data.attributes.localizations.data', []);
			const findLanguage = locals.find((i: any) => i.name === allLanguages?.attributes?.language_name)?.code;
			const identifyLangArticle = localizations.find((i: any) => i.attributes.locale === findLanguage);
			const mergedArticle = {
				...article,
				Title: identifyLangArticle?.attributes?.Title || article.Title,
				slug: identifyLangArticle?.attributes?.slug || article.slug,
			};
			return {
				id: item.id,
				findLanguage,
				attributes: {
					...mergedArticle,
				},
			};
		})
		.filter(
			(item: any) => item.attributes && typeof item.attributes === 'object' && item.attributes.Title && item.attributes.slug,
		);
};

export default function PariRecommends({ section }: any) {
	// console.log('section', section);
	const message = useTranslations('Index');
	const { width } = useViewportSize();
	// const articleRowOne = get(section, 'articles_row_1.data', []);
	// const articleRowTwo = get(section, 'article_row_2.data', []);
	const articleRow1WithLang = get(section, 'article_with_lang_selection_1', []);
	const articleRow2WithLang = get(section, 'article_with_lang_selection_2', []);
	const parsedArticleRow1WithLang = processArticlesWithLang(articleRow1WithLang, tmpLocals);
	const parsedArticleRow2WithLang = processArticlesWithLang(articleRow2WithLang, tmpLocals);

	// Check if there's any data to display
	const hasData =
		parsedArticleRow1WithLang.length > 0 || parsedArticleRow2WithLang.length > 0 || parsedArticleRow2WithLang.length > 0;

	return (
		<div className='bg-gray-8 dark:bg-gray-9 pb-[72px] xs:pb-[8px] sm:pb-[8px] sm2:pb-[8px] sm3:pb-[8px] md:pb-[8px]'>
			<div className='3xl:px-[104px] 2xl:px-[104px] xl:px-[104px] lg:px-[104px] md:px-[32px] sm:px-[32px] sm2:px-[32px] sm3:px-[32px] xs:px-[32px] flex flex-row items-center justify-between pb-[46px] xs:pb-[30px] sm:pb-[30px] sm2:pb-[30px] sm3:pb-[30px] md:pb-[30px] pt-[80px] xs:pt-[64px] sm:pt-[64px] sm2:pt-[64px] sm3:pt-[64px] md:pt-[64px]'>
				<p className='flex flex-row gap-[8px] items-center font-sans font-semibold uppercase text-[15px] xs:text-[13px] sm:text-[13px] sm2:text-[13px] sm3:text-[13px] md:text-[13px] leading-normal xs:tracking-[-0.26px] sm:tracking-[-0.26px] sm2:tracking-[-0.26px] sm3:tracking-[-0.26px] md:tracking-[-0.26px] tracking-[-0.3px] text-[#828282]'>
					<PariRecommendIcon className='stroke-[#B82929]' />
					{section?.Title}
				</p>
				<div className='xs:hidden sm:hidden sm2:hidden sm3:hidden md:hidden'>
					<Link
						href='/articles?type=article'
						className='flex flex-row items-center font-sans text-primary-pari-red border text-[13px] xs:text-[12px] sm:text-[12px] sm2:text-[12px] sm3:text-[12px] md:text-[12px] not-italic font-medium leading-normal xs:leading-[-0.36px] sm:leading-[-0.36px] sm2:leading-[-0.36px] sm3:leading-[-0.36px] md:leading-[-0.36px] border-primary-pari-red hover:bg-primary-pari-red hover:text-white py-2 pl-[1.12rem] pr-[0.75rem] xs:px-[1.5rem] sm:px-[1.5rem] sm2:px-[1.5rem] sm3:px-[1.5rem] md:px-[1.5rem] xs:py-[0.75rem] sm:py-[0.75rem] sm2:py-[0.75rem] sm3:py-[0.75rem] md:py-[0.75rem] rounded-[32px]'>
						{message('SeeAllStories')}
						<RightIcon className='stroke-[#B82929] hover:stroke-white' />
					</Link>
				</div>
			</div>
			{/* <List articles={articleRowOne} /> */}
			{parsedArticleRow1WithLang.length > 0 ? <List articles={parsedArticleRow1WithLang.map((item: any) => item)} /> : ''}

			<Space h={'1.5rem'} />
			{/* <List articles={articleRowTwo} /> */}

			{parsedArticleRow2WithLang.length > 0 ? <List articles={parsedArticleRow2WithLang.map((item: any) => item)} /> : ''}

			<Space h={'1.5rem'} hiddenFrom='lg' />
			<div className='flex 3xl:px-[104px] 2xl:px-[104px] xl:px-[104px] lg:px-[104px] md:px-[32px] sm:px-[32px] sm2:px-[32px] sm3:px-[32px] xs:px-[32px] lg:hidden xl:hidden 2xl:hidden 3xl:hidden pb-[56px] xs:pt-[8px] sm:pt-[8px] sm2:pt-[8px] sm3:pt-[8px] md:pt-[8px]'>
				<Link
					href='/articles?type=article'
					className='flex flex-row items-center font-sans text-primary-pari-red border text-[13px] xs:text-[12px] sm:text-[12px] sm2:text-[12px] sm3:text-[12px] md:text-[12px] not-italic font-medium leading-normal xs:leading-[-0.36px] sm:leading-[-0.36px] sm2:leading-[-0.36px] sm3:leading-[-0.36px] md:leading-[-0.36px] border-primary-pari-red hover:bg-primary-pari-red hover:text-white py-2 pl-[1.12rem] pr-[0.75rem] xs:px-[1.5rem] sm:px-[1.5rem] sm2:px-[1.5rem] sm3:px-[1.5rem] md:px-[1.5rem] xs:py-[0.75rem] sm:py-[0.75rem] sm2:py-[0.75rem] sm3:py-[0.75rem] md:py-[0.75rem] rounded-[32px]'>
					{message('SeeAllStories')}
					<RightIcon className='stroke-[#B82929] hover:stroke-white' />
				</Link>
			</div>
		</div>
	);
}
