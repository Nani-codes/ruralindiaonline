'use client';

import { AudioVideoIcon, RightArrowIcon, RightIcon } from '@/common/@the-source/Icon';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import { get, map } from '@/utils';

// import Card from './EditorChoice/components/Card';
import Card from '@/common/@the-source/Card';
import { Fragment } from 'react';
import { IMAGE_URL } from '@/config';
import Image from 'next/image';
import Link from 'next/link';
import SingleCard from './EditorChoice/components/Card';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useViewportSize } from '@mantine/hooks';
import { Category } from '@/strapi-types/categories.types';
import { getArticlesUrl } from '@/utils/articlesUrl';

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

const List2 = ({ articles }: any) => {
	let article = articles[0];
	// console.log('audio video', article);
	// console.log('big article', articles);
	const href = `/article/${encodeURI(get(article, 'attributes.slug', ''))}`;
	const categories = get(article, 'attributes.categories.data', []) as Category[];
	const title = get(article, 'attributes.Title', '');
	const url = get(article, 'attributes.Cover_image.data.attributes.url', '');
	const localizations = get(article, 'attributes.localizations.data', []);
	const Authors = get(article, 'attributes.Authors', []);
	const loctionInfo = get(article, 'attributes.location.description', '');
	const locationParts = loctionInfo.split(',').map((part: string) => part.trim());
	const cityAndState = locationParts[0];
	const createdAt = get(article, 'attributes.Original_published_date') || get(article, 'attributes.publishedAt');
	const authorsInfo = Authors.find((i: any) => i?.author_role?.data?.attributes?.Name === 'Author');
	const authorName = get(authorsInfo, 'author.data.attributes.Name');

	const weekdays = useTranslations('date');
	const date = dayjs(createdAt).format('dddd MMMM DD, YYYY');
	const parts = date.split(' ');
	const week = get(parts, '0', '');
	const month = get(parts, '1', '');
	const localDate = dayjs(createdAt).format('MMM DD, YYYY');
	const { width } = useViewportSize();
	const district = article?.attributes?.location?.data?.attributes?.district;
	const state = article?.attributes?.location?.data?.attributes?.state;

	return (
		<div className='overflow-x-auto no-scrollbar pb-[56px] xs:pb-[34px] sm:pb-[34px] sm2:pb-[34px] sm3:pb-[34px] md:pb-[34px] '>
			<div
				className='flex flex-row
            3xl:mx-[104px] 2xl:mx-[104px] xl:mx-[104px] lg:mx-[104px] md:mx-[32px] sm:mx-[32px] sm2:mx-[32px] sm3:mx-[32px] xs:mx-[32px]
            items-stretch'>
				<Link
					href={href}
					className='
                        w-[100%]
                font-sans
                flex flex-row items-center xs:flex-col sm:flex-col sm2:flex-col sm3:flex-col md:flex-col
 				md:items-start sm:items-start xs:items-start
                '>
					<Image
						src={`${IMAGE_URL}${url}`}
						width={607}
						height={402}
						alt={title}
						className='
                        object-contain
                        w-[607px] h-[402px] lg:w-[480px] md:w-[100%] sm:w-[100%] xs:w-[100%]
                        bg-gray-5 dark:bg-black
                        rounded-[16px]
                    '
					/>
					<div className='w-[380px] md:w-[auto] sm:w-[auto] xs:w-[auto] p-[24px] flex flex-col' style={{ flex: 1 }}>
						<div className='flex flex-col '>
							<div className='flex gap-[8px] flex-wrap pb-[24px] '>
								<div className='  flex gap-[8px] flex-wrap '>
									{map(categories?.slice(0, 1), (category: Category) => (
										<Link
											href={getArticlesUrl({
												categoryIds: [category.id],
											})}
											key={category.attributes.Title}
											className='
                                                            border
                                                            border-primary-pari-red
                                                            text-primary-pari-red
                                                            hover:bg-primary-pari-red hover:text-white
                                                            px-[12px]
																														h-[23px]
																														flex items-center justify-center
                                                            rounded-[32px]
                                                            text-[12px]
                                                            font-medium
                                                        '>
											{category.attributes.Title}
										</Link>
									))}

									{categories?.length > 1 ? (
										<button
											className='
                                                            border
                                                            border-primary-pari-red
                                                            text-primary-pari-red
                                                            hover:bg-primary-pari-red hover:text-white
                                                            px-[12px] h-[23px] flex items-center justify-center
                                                            rounded-[32px]
                                                            text-[12px]
                                                            font-medium
                                                        '>
											+{categories?.length - 1}
										</button>
									) : null}
								</div>
							</div>
							<h1 className=' text-[18px] text-gray dark:text-white leading-[25.2px] font-semibold pb-[16px] '>
								{' '}
								{title}
							</h1>
							<p
								className='
								text-[15px] text-gray-3 dark:text-gray-7
								font-medium  pb-[16px] xs:pb-[12px] sm:pb-[12px] sm2:pb-[12px] sm3:pb-[12px] md:pb-[12px]'>
								{authorName}
							</p>
							<p className=' text-[12px] text-gray-2 dark:text-gray-3 font-medium pb-[12px]'>{`${localizations?.length} Languages`}</p>
						</div>

						<div
							className='
                        font-semibold
                        text-[13px]
                        text-primary-pari-red dark:text-[#B82929]
                        flex gap-[8px] items-center
                        uppercase
                        dark:gray-7

                    '>
							{`${district}, ${state} • ${localDate}`}
							<RightArrowIcon />
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
};

const List = ({ articles }: any) => {
	// console.log(articles);
	const { width } = useViewportSize();
	return (
		<Carousel
			styles={{ root: { width: '100%' } }}
			slideSize={{
				xs: '65vw',
				sm: '80vw',
				sm2: '66.3vw',
				sm3: '49.7vw',
				md: '16vw',
				lg: '16vw',
				xl: '16vw',
				xl2: '10vw',
				xl3: '16vw',
			}}
			controlsOffset={width >= 1024 ? '4.5rem' : '0rem'}
			dragFree
			withControls={width >= 1024 ? true : false}
			// controlsOffset={'4.5rem'}
			align={'start'}
			pb={{ base: '1.5rem', md: '6.0625rem' }}
			px={{ base: '2rem', md: '2rem', lg: '7rem', xl: '7rem', xl2: '7rem' }}
			slideGap={{ base: '1rem', md: '2rem', lg: '1.5rem', xl: '1.5rem', xl2: '1.5rem' }}>
			{map(articles, (article: any, index: number) => {
				if (!article || Object.keys(article).length === 0) {
					return null; // Skip rendering if article is empty
				}
				const key = article.id || `/article/${encodeURI(get(article, 'slug', ''))}-${index}`;

				// const key = `/article/${encodeURI(get(article, 'attributes.slug', ''))}`;
				return (
					<CarouselSlide key={key}>
						<Fragment key={key}>
							<Card key={key} article={article} />
						</Fragment>
					</CarouselSlide>
				);
			})}
		</Carousel>
	);
};

export default function AudioVideoStories({ section }: any) {
	const message = useTranslations('Index');
	// console.log('kumar', section);
	// const articleRowOne = get(section, 'row1.data', []);
	// const articleRowTwo = get(section, 'row2.data', []);
	const articleRow1WithLang = get(section, 'article_with_lang_selection_1', []);
	const articleRow2WithLang = get(section, 'article_with_lang_selection_2', []);
	const parsedArticleRow1WithLang = processArticlesWithLang(articleRow1WithLang, tmpLocals);
	const parsedArticleRow2WithLang = processArticlesWithLang(articleRow2WithLang, tmpLocals);

	// Check if there's any data to display
	const hasData =
		parsedArticleRow1WithLang.length > 0 || parsedArticleRow2WithLang.length > 0 || parsedArticleRow2WithLang.length > 0;

	return (
		<div className='bg-[#F4F4F4]'>
			<div className='3xl:px-[104px] 2xl:px-[104px] xl:px-[104px] lg:px-[104px] md:px-[32px] sm:px-[32px] sm2:px-[32px] sm3:px-[32px] xs:px-[32px] flex flex-row items-center justify-between pb-[48px] xs:pb-[32px] sm:pb-[32px] sm2:pb-[32px] sm3:pb-[32px] md:pb-[32px] pt-[98.5px]'>
				<p className='flex flex-row gap-[8px] items-center font-sans font-semibold uppercase text-[15px] xs:text-[13px] sm:text-[13px] sm2:text-[13px] sm3:text-[13px] md:text-[13px] leading-normal xs:tracking-[-0.26px] sm:tracking-[-0.26px] sm2:tracking-[-0.26px] sm3:tracking-[-0.26px] md:tracking-[-0.26px] tracking-[-0.3px] text-[#828282]'>
					<AudioVideoIcon className='stroke-[#B82929]' />
					{message('AudioAndVideo')}
				</p>
				<div className='xs:hidden sm:hidden sm2:hidden sm3:hidden md:hidden  '>
					<Link
						href='/articles?type=video,audio'
						className='flex flex-row items-center font-sans text-primary-pari-red border text-[13px] xs:text-[12px] sm:text-[12px] sm2:text-[12px] sm3:text-[12px] md:text-[12px] not-italic font-medium leading-normal xs:leading-[-0.36px] sm:leading-[-0.36px] sm2:leading-[-0.36px] sm3:leading-[-0.36px] md:leading-[-0.36px] border-primary-pari-red hover:bg-primary-pari-red hover:text-white
						py-2 pl-[1.12rem] pr-[0.75rem]
						xs:px-[1.5rem] sm:px-[1.5rem] sm2:px-[1.5rem] sm3:px-[1.5rem] md:px-[1.5rem]

						xs:py-[0.75rem] sm:py-[0.75rem] sm2:py-[0.75rem] sm3:py-[0.75rem] md:py-[0.75rem]

						rounded-[32px]
                    '>
						{message('MoreAudioAndVideo')}
						<RightIcon className='stroke-[#B82929] hover:stroke-white' />
					</Link>
				</div>
			</div>
			{/* <List2 articles={articleRowOne} /> */}
			<List2 articles={parsedArticleRow1WithLang.map((item: any) => item)} />
			<List articles={parsedArticleRow2WithLang.map((item: any) => item)} />

			{/* <List articles={articleRowTwo} /> */}

			<div
				className='	flex 3xl:px-[104px] 2xl:px-[104px] xl:px-[104px] lg:px-[104px] md:px-[32px] sm:px-[32px] sm2:px-[32px] sm3:px-[32px]
					lg:hidden xl:hidden 2xl:hidden 3xl:hidden mb-[56px] '>
				<Link
					href='/articles?type=video,audio'
					className='
					flex flex-row items-center font-sans text-primary-pari-red border text-[13px] xs:text-[12px] sm:text-[12px] sm2:text-[12px] sm3:text-[12px] md:text-[12px] not-italic font-medium leading-normal xs:leading-[-0.36px] sm:leading-[-0.36px] sm2:leading-[-0.36px] sm3:leading-[-0.36px] md:leading-[-0.36px] border-primary-pari-red hover:bg-primary-pari-red hover:text-white
					py-2 pl-[1.12rem] pr-[0.75rem]
					xs:px-[1.5rem] sm:px-[1.5rem] sm2:px-[1.5rem] sm3:px-[1.5rem] md:px-[1.5rem]

					xs:py-[0.75rem] sm:py-[0.75rem] sm2:py-[0.75rem] sm3:py-[0.75rem] md:py-[0.75rem]

					rounded-[32px]
                    '>
					{message('MoreAudioAndVideo')}
					<RightIcon className='stroke-[#B82929] hover:stroke-white' />
				</Link>
			</div>
		</div>
	);
}
