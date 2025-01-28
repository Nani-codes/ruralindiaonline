'use client';

import { Carousel, CarouselSlide } from '@mantine/carousel';
import { RightArrowIcon, RightIcon, StandIcon } from '@/common/@the-source/Icon';
import { get, map } from '@/utils';
import { useLayoutEffect, useState } from 'react';
import { Category } from '@/strapi-types/categories.types';
import { IMAGE_URL } from '@/config';
import Image from 'next/image';
import Link from 'next/link';
import { Text, Button, Container, Group, Box, Title, Badge, Flex } from '@mantine/core';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useViewportSize } from '@mantine/hooks';
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
export default function New({ thisWeekOnPari }: any) {
	// console.log('this week', thisWeekOnPari);
	const weekdays = useTranslations('date');
	const message = useTranslations('Index');
	const { width } = useViewportSize();
	// const articles = thisWeekOnPari?.article_with_lang_selection_1?.data;
	const articleRow1WithLang = get(thisWeekOnPari, 'article_with_lang_selection_1', []);
	const articles = processArticlesWithLang(articleRow1WithLang, tmpLocals);

	const [windowWidth, setWindowWidth] = useState(0);

	const isMobile = windowWidth <= 768;

	useLayoutEffect(() => {
		setWindowWidth(window.innerWidth);

		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<Box bg='#f4f4f4' className='pb-[72px] xs:pb-[8px] sm:pb-[8px] sm2:pb-[8px] sm3:pb-[8px] md:pb-[8px]'>
			<div className='3xl:px-[104px] 2xl:px-[104px] xl:px-[104px] lg:px-[104px] md:px-[32px] sm:px-[32px] sm2:px-[32px] sm3:px-[32px] xs:px-[32px] flex flex-row items-center justify-between pb-[46px] xs:pb-[30px] sm:pb-[30px] sm2:pb-[30px] sm3:pb-[30px] md:pb-[30px] pt-[80px] xs:pt-[64px] sm:pt-[64px] sm2:pt-[64px] sm3:pt-[64px] md:pt-[64px]'>
				<p className='flex flex-row gap-[8px] items-center font-sans font-semibold uppercase text-[15px] xs:text-[13px] sm:text-[13px] sm2:text-[13px] sm3:text-[13px] md:text-[13px] leading-normal xs:tracking-[-0.26px] sm:tracking-[-0.26px] sm2:tracking-[-0.26px] sm3:tracking-[-0.26px] md:tracking-[-0.26px] tracking-[-0.3px] text-[#828282]'>
					<StandIcon className='stroke-[#B82929]' />
					<Text size='sm' fw={700} tt='uppercase' c='dimmed'>
						{message('ThisWeekOnPari')}
					</Text>
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

			{/* <Container py='md' size='xl' display='flex' style={{ justifyContent: 'space-between', alignContent: 'center' }}>
				<Group gap='xs' align='center'>
					<StandIcon className='stroke-[#B82929]' />
					<Text size='sm' fw={700} tt='uppercase' c='dimmed'>
						{message('ThisWeekOnPari')}
					</Text>
				</Group>
				<Box visibleFrom='md'>
					<Button
						component={Link}
						href='/articles?type=articles'
						variant='outline-hover-filled'
						rightSection={<RightIcon className='stroke-[#B82929] hover:stroke-white' />}>
						{message('SeeAllStories')}
					</Button>
				</Box>
			</Container> */}

			{/* <Container py='md' size='xl2' display='flex' style={{ justifyContent: 'space-between', alignContent: 'center' }}> */}
			<Carousel
				styles={{ root: { width: '100%' } }}
				slideSize={{
					xs: '80vw',
					sm: '80vw',
					sm2: '80vw',
					sm3: '49.7vw',
					md: '35vw',
					lg: '27vw',
					xl: '27vw',
					xl2: '22vw',
					xl3: '23vw',
				}}
				controlsOffset={width >= 1024 ? '4.5em' : '0rem'}
				dragFree
				withControls={width >= 1024 ? true : false}
				// pb={width >= 1024 ? '6.0625rem' : '4.125rem'}
				px={{ base: '2rem', md: '2rem', lg: '7rem', xl: '7rem', xl2: '7rem' }}
				align={'start'}
				slideGap={{
					xs: '1rem',
					sm: '1rem',
					sm2: '1rem',
					sm3: '1rem',
					md: '2rem',
					lg: '1.5rem',
					xl: '1.5rem',
					xl2: '1.5rem',
				}}>
				{articles?.map((article: any, index: number) => {
					const slug = get(article, 'attributes.slug', null);
					const strap = get(article, 'attributes.Strap', null);
					const categories = get(article, 'attributes.categories.data', []);
					const href = `/article/${encodeURI(slug)}`;
					const Authors = get(article, 'attributes.Authors', []);
					// console.log(article);

					const district = article?.attributes?.location?.data?.attributes?.district;
					const state = article?.attributes?.location?.data?.attributes?.state;

					const createdAt = get(article, 'attributes.Original_published_date') || get(article, 'attributes.publishedAt');

					const authorNames = Authors.map((author: any) => {
						return get(author, 'author_name.data.attributes.Name', '');
					});
					const autherName = authorNames.join(', ');

					const featureImage =
						get(article, 'attributes.Feature_image.data.attributes.url') ||
						get(article, 'attributes.Cover_image.data.attributes.url');
					const featreImageMobile =
						get(article, 'attributes.Feature_image_mobile.data.attributes.url') ||
						get(article, 'attributes.mobilecover.data.attributes.url');
					// console.log(featreImageMobile, featureImage);
					const url = isMobile ? (featreImageMobile ? featreImageMobile : featureImage) : featureImage;
					// console.log(url);
					const date = dayjs(createdAt).format('dddd MMMM DD, YYYY');
					const parts = date.split(' ');
					const week = get(parts, '0', '');
					const month = get(parts, '1', '');
					const localDate = dayjs(createdAt).format('MMM DD, YYYY');
					const title = get(article, 'attributes.Title', '');

					return (
						<CarouselSlide key={index}>
							<Link href={href} key={slug} className='flex flex-col'>
								<Box className='font-sans' style={{ flex: 1, width: isMobile ? '100%' : '750px', gap: '24px' }}>
									<Image
										src={`${IMAGE_URL}${url}`}
										alt={strap}
										width={750}
										height={402}
										style={{
											borderRadius: '16px',
											objectFit: 'cover',
											width: '100%',
											height: '402px',
											boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.28)',
										}}
									/>
								</Box>

								{/* <Box>
										<Flex direction='column' gap='sm'>
											<Group gap='xs'>
												{map(categories?.slice(0, 1), (category: any) => (
													<Button
														component={Link}
														href={getArticlesUrl({
															categoryIds: [category?.id],
														})}
														key={category?.attributes?.Title}
														variant='outline-hover-filled'
														size='xs'>
														{category?.attributes?.Title}
													</Button>
												))}

												{categories?.length > 1 ? (
													<Button variant='outline-hover-filled' size='xs'>
														+{categories?.length - 1}
													</Button>
												) : null}
											</Group>
											<Text lineClamp={2} my='sm'>
												{title}
											</Text>
											<Text size='sm' c='dimmed' lineClamp={2}>
												{strap}
											</Text>

											<Text size='sm' c='dimmed' fw={500}>
												{autherName}
											</Text>
											<Group>
												<Button
													p={0}
													size='xs'
													component={Link}
													href={href}
													variant='transparent'
													rightSection={<RightArrowIcon />}>
													{location} • {localDate}
												</Button>
											</Group>
										</Flex>
									</Box> */}

								<div className='mt-[1.5rem] content-part md:w-[auto] sm:w-[auto] sm2:w-[auto] sm3:w-[auto] xs:w-[auto] xs:p-[1.5rem] sm:p-[1.5rem] sm2:p-[1.5rem] sm3:p-[1.5rem] md:p-[1.5rem] flex flex-col justify-between overflow-hidden gap-[1rem] rtl:mt-[1rem] rtl:mr-[1rem] rtl:space-y-[1rem]'>
									<div className='flex flex-col gap-[4px]'>
										<div className='flex gap-[8px] flex-wrap pb-[0.5rem]'>
											{map(categories?.slice(0, 1), (category: Category) => (
												<Link
													href={getArticlesUrl({
														categoryIds: [category.id],
													})}
													key={category.attributes.Title}
													className='border border-[#B82929] text-[#B82929] hover:bg-[#B82929] hover:text-white
rounded-[2rem]
text-[0.75rem]
font-medium
leading-[160%]
tracking-[-0.0225rem]
px-[12px] py-[7px]
flex items-center justify-center
h-[23px]
w-[auto] min-w-[50px]'>
													{category.attributes.Title}
												</Link>
											))}

											{categories.length > 1 ? (
												<button
													className='
border
border-[#B82929]
text-[#B82929]
hover:bg-[#B82929] hover:text-white
px-[12px] py-[7px]
rounded-[2rem]
text-[0.75rem]
h-[23px]
flex items-center justify-center
font-medium'>
													+{categories?.length - 1}
												</button>
											) : null}
										</div>

										<div className='min-h-16 mt-[0.5rem]'>
											<h1
												className='
						font-sans text-[#202020] text-[1.5rem]
                          dark:text-white not-italic
                        leading-[2rem] tracking-[-0.0625rem]
                        font-semibold
                        line-clamp-2 min-h-[60px] pb-[0.5rem]
                    '>
												{' '}
												{title}
											</h1>
										</div>
										<Text
											style={{ lineHeight: '24px', fontSize: '16px' }}
											size='sm'
											lineClamp={2}
											className='mt-[0.5rem] 
						font-sans line-clamp-2 min-h-[30px] pb-[0.5rem]
                    '>
											{strap}
										</Text>
										<div className='min-h-8 mt-[1rem]'>
											<p
												className='
						font-sans text-[#828282] text-[0.9375rem]
                          dark:text-white not-italic
                        leading-[170%] tracking-[-0.0375rem]
                        font-medium pb-[0.5rem]
                    '>
												{autherName}
												{/* {authorsString} */}
											</p>
										</div>

										{/* <p
												className='
                        font-sans text-[#4F4F4F] text-[0.75rem]
                          dark:text-white not-italic
                        leading-[160%] tracking-[-0.0225rem]
                        font-medium
                        pb-[1.5rem]
                    '>
												{localizations?.length > 0 &&
													`${localizations.length} Language${localizations.length > 1 ? 's' : ''}`}
											</p> */}
										<div
											className='
                        font-semibold
                        text-[13px]
                        text-primary-pari-red dark:text-white
                        flex gap-[8px] items-center
                        uppercase
                        border-t  border-gray-6 dark:gray-7
                      
						tracking-[-0.26px]
                    '>
											{/* {loctionInfo ? `${cityAndState} • ${localDate}` : `${localDate}`} location */}
											{district}, {state} • {localDate}
											<RightArrowIcon />
										</div>
									</div>
								</div>
							</Link>
						</CarouselSlide>
					);
				})}
			</Carousel>
			{/* </Container> */}
			<div className='flex 3xl:px-[104px] 2xl:px-[104px] xl:px-[104px] lg:px-[104px] md:px-[32px] sm:px-[32px] sm2:px-[32px] sm3:px-[32px] xs:px-[32px] lg:hidden xl:hidden 2xl:hidden 3xl:hidden pb-[56px] xs:pt-[8px] sm:pt-[8px] sm2:pt-[8px] sm3:pt-[8px] md:pt-[8px]'>
				<Link
					href='/articles?type=article'
					className='flex flex-row items-center font-sans text-primary-pari-red border text-[13px] xs:text-[12px] sm:text-[12px] sm2:text-[12px] sm3:text-[12px] md:text-[12px] not-italic font-medium leading-normal xs:leading-[-0.36px] sm:leading-[-0.36px] sm2:leading-[-0.36px] sm3:leading-[-0.36px] md:leading-[-0.36px] border-primary-pari-red hover:bg-primary-pari-red hover:text-white py-2 pl-[1.12rem] pr-[0.75rem] xs:px-[1.5rem] sm:px-[1.5rem] sm2:px-[1.5rem] sm3:px-[1.5rem] md:px-[1.5rem] xs:py-[0.75rem] sm:py-[0.75rem] sm2:py-[0.75rem] sm3:py-[0.75rem] md:py-[0.75rem] rounded-[32px]'>
					{message('SeeAllStories')}
					<RightIcon className='stroke-[#B82929] hover:stroke-white' />
				</Link>
			</div>
			{/* <Container py='md' px='lg' hiddenFrom='lg'>
				<Button
					component={Link}
					href='/articles?type=articles'
					variant='outline-hover-filled'
					rightSection={<RightIcon className='stroke-[#B82929] hover:stroke-white' />}>
					{message('SeeAllStories')}
				</Button>
			</Container> */}
		</Box>
	);
}
