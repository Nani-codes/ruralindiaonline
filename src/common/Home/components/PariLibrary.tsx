'use client';

// import DOMPurify from 'dompurify';
import DOMPurify from 'isomorphic-dompurify';

import { Carousel, CarouselSlide } from '@mantine/carousel';
import { LibraryIcon, RightArrowIcon, RightIcon } from '@/common/@the-source/Icon';
import { get, map } from '@/utils';
import { useLayoutEffect, useState } from 'react';

import { IMAGE_URL } from '@/config';
import Image from 'next/image';
import Link from 'next/link';
import { Space } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useViewportSize } from '@mantine/hooks';

export default function PariLibrary({ section }: any) {
	const message = useTranslations('Index');
	const { width } = useViewportSize();
	const projects = get(section, 'pariProjects', []);
	const libraryArticles = get(section, 'libraryArticles.data', []);

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
		<div className='bg-[#f4f4f4] pb-[50px]'>
			<div className='3xl:px-[104px] 2xl:px-[104px] xl:px-[104px] lg:px-[104px] md:px-[32px] sm:px-[32px] sm2:px-[32px] sm3:px-[32px] xs:px-[32px]  pb-[48px] xs:pb-[36px] sm:pb-[36px] sm2:pb-[36px] sm3:pb-[36px] md:pb-[36px] pt-[97px] xs:pt-[62px] sm:pt-[62px] sm2:pt-[62px] sm3:pt-[62px] md:pt-[62px]'>
				<p className='flex flex-row gap-[8px] items-center font-sans font-semibold uppercase text-[15px] xs:text-[13px] sm:text-[13px] sm2:text-[13px] sm3:text-[13px] md:text-[13px] leading-normal xs:tracking-[-0.26px] sm:tracking-[-0.26px] sm2:tracking-[-0.26px] sm3:tracking-[-0.26px] md:tracking-[-0.26px] tracking-[-0.3px] text-[#828282] xs:pb-[0px] sm:pb-[0px] sm2:pb-[0px] sm3:pb-[0px] md:pb-[0px] '>
					<LibraryIcon className='stroke-[#B82929]' /> {message('InFocus')}
				</p>
				<div className='flex flex-row xs:flex-col sm:flex-col sm2:flex-col sm3:flex-col md:flex-col justify-between items-end xs:items-start sm:items-start sm2:items-start sm3:items-start xs:gap-[32px] sm:gap-[32px] sm2:gap-[32px] sm3:gap-[32px]'>
					<div className='w-[60%] md:w-[100%] sm:w-[100%] sm2:w-[100%] sm3:w-[100%] xs:w-[100%]'>
						<h3 className='font-sans font-semibold text-[28px] text-[#000] dark:text-white my-[16px] xs:mt-[4px] sm:mt-[4px] sm2:mt-[4px] sm3:mt-[4px] md:mt-[4px]'>
							{section.title}
						</h3>
						<p className='w-4/5 font-sans font-normal text-[16px] xs:text-[15px] sm:text-[15px] sm2:text-[15px] sm3:text-[15px] md:text-[15px] not-italic text-[#333] line-height-[170%] dark:text-gray-5 leading-[27.2px] xs:leading-[25.5px] sm:leading-[25.5px] sm2:leading-[25.5px] sm3:leading-[25.5px] md:leading-[25.5px] tracking-[-0.16px] xs:tracking-[-0.45px] sm:tracking-[-0.45px] sm2:tracking-[-0.45px] sm3:tracking-[-0.45px] md:tracking-[-0.45px] '>
							<div
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(section?.description),
								}}></div>
						</p>
					</div>

					<div className=' xs:hidden sm:hidden sm2:hidden sm3:hidden  md:hidden '>
						<Link
							href='/library'
							className='
							flex flex-row items-center font-sans text-primary-pari-red border text-[13px] xs:text-[12px] sm:text-[12px] sm2:text-[12px] sm3:text-[12px] md:text-[12px] not-italic font-medium leading-normal xs:leading-[-0.36px] sm:leading-[-0.36px] sm2:leading-[-0.36px] sm3:leading-[-0.36px] md:leading-[-0.36px] border-primary-pari-red hover:bg-primary-pari-red hover:text-white 

						py-2 pl-[1.12rem] pr-[0.75rem]

						xs:px-[1.5rem] sm:px-[1.5rem] sm2:px-[1.5rem] sm3:px-[1.5rem] md:px-[1.5rem] 
						
						xs:py-[0.75rem] sm:py-[0.75rem] sm2:py-[0.75rem] sm3:py-[0.75rem] md:py-[0.75rem]
						
						rounded-[32px] min-w-max
						'>
							{/* {section?.Button} */}
							{message('SeeMoreReports')}

							<RightIcon className='stroke-[#B82929] hover:stroke-white' />
						</Link>
					</div>
				</div>
			</div>
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
				align={'start'}
				dragFree
				withControls={width >= 1024 ? true : false}
				controlsOffset={width >= 1024 ? '4.5rem' : '0rem'}
				px={{ base: '2rem', md: '2rem', lg: '7rem', xl: '7rem', xl2: '7rem' }}
				slideGap={{ base: '1rem', md: '2rem', lg: '1.5rem', xl: '1.5rem', xl2: '1.5rem' }}>
				{map(projects, (project: any, index: number) => {
					const categories = get(project, 'attributes.categories.data', []);
					const title = get(project, 'title', null);
					const description = get(project, 'description', null);
					const href = get(project, 'link', null);
					let loctionInfo = get(project, 'attributes.location.description', '');
					const createdAt = get(project, 'attributes.createdAt');
					const featureImage =
						get(project, 'Feature_image.data.attributes.url') || get(project, 'image.data.attributes.url');
					const featreImageMobile =
						get(project, 'Feature_image_mobile.data.attributes.url') || get(project, 'image.data.attributes.url');
					const url = isMobile ? featreImageMobile : featureImage;

					return (
						<CarouselSlide key={index}>
							<Link href={href || ''} key={index}>
								<div className='font-sans w-[750px] lg:w-[572px] md:w-[572px] sm:w-[311px] sm2:w-[311px] flex flex-col'>
									<Image
										src={`${IMAGE_URL}${url}`}
										alt={title}
										width={750}
										height={402}
										className='
																								rounded-[16px]
																								shadow-[0px_1px_4px_rgba(0,_0,_0,_0.28)]
																								w-[750px] lg:w-[572px] md:w-[572px] sm:w-[311px] sm2:w-[311px]
																								h-[402px] lg:h-[402px] md:h-[402px] sm:h-[402px] sm2:h-[402px]
																								object-cover mb-[24px]
																						'
									/>
									<div
										style={{ fontFamily: 'Noto Sans, sans-serif' }}
										className='w-4/5 sm:w-[4/5] sm2:w-[4/5] md:w-[100%] font-sans line-clamp-3
							font-normal not-italic
							text-[16px] xs:text-[15px] sm:text-[15px] sm2:text-[15px] md:text-[15px]
							text-[#333] dark:text-gray-5 leading-[170%] tracking-[-0.16px] xs:tracking-[-0.45px] sm:tracking-[-0.45px] sm2:tracking-[-0.45px] md:tracking-[-0.45px] pb-[16px]'
										dangerouslySetInnerHTML={{
											__html: DOMPurify.sanitize(description),
										}}></div>
									<div className='flex flex-row'>
										{map(categories, (category: any, index: number) => (
											<div
												key={index}
												className={`flex items-center bg-primary-pari-red
																											rounded-[32px] py-1
																											px-[0.75rem] mr-2
																											text-[13px]
																											xs:text-[12px] sm:text-[12px] sm2:text-[12px] md:text-[12px]
																											text-[#fff]
																											font-medium`}>
												{category.attributes.name}
											</div>
										))}
									</div>

									<Link
										href={href || ''}
										className='
																								font-semibold
																								text-[13px]
												not-italic
												leading-normal tracking-[-0.26px] 
																								text-primary-pari-red dark:text-[#B82929]
																								flex gap-[8px] items-center
																								uppercase
																						'>
										{section?.view_project}
										<RightArrowIcon className='[stroke-[#B82929] dark:stroke-[#fff]' />
									</Link>
								</div>
							</Link>
						</CarouselSlide>
					);
				})}
			</Carousel>
			<Space h={'4rem'} />
			{libraryArticles?.length > 0 && (
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
					controlsOffset={width >= 1024 ? '4.5rem' : '0rem'}
					dragFree
					withControls={width >= 1024 ? true : false}
					align={'start'}
					px={{ base: '2rem', md: '2rem', lg: '7rem', xl: '7rem', xl2: '7rem' }}
					slideGap={{ base: '1rem', md: '2rem', lg: '1.5rem', xl: '1.5rem', xl2: '1.5rem' }}>
					{map(libraryArticles, (library: any, index: number) => {
						const slug = get(library, 'attributes.slug', null);
						const thumbnail = get(library, 'attributes.Thumbnail.data.attributes.url');
						const title = get(library, 'attributes.Title');
						const href = `/library/${slug}`;

						const categories = get(library, 'attributes.Categories');
						return (
							<CarouselSlide key={index}>
								<Link href={href || ''} key={index}>
									<div className='font-sans w-[256px] lg:w-[256px] md:w-[256px] sm2:w-[311px] sm:w-[311px] gap-[12px] flex flex-col'>
										<Image
											src={`${IMAGE_URL}${thumbnail}`}
											alt={title}
											width={256}
											height={336}
											className='
																								rounded-[16px]
																								shadow-[0px_1px_4px_rgba(0,_0,_0,_0.28)]
																								w-[750px] lg:w-[572px] md:w-[572px] sm2:w-[311px] sm:w-[311px]
																								h-[402px] lg:h-[402px] md:h-[402px] sm:h-[402px]
																								object-cover
												mb-[20px]
																						'
										/>
									</div>
									{/* {
										categories &&
										<Link
												href='/'
												className='
																														border
																														border-primary-pari-red
																														text-primary-pari-red 
																														hover:bg-primary-pari-red hover:text-white 
																														py-2 px-4 
																														rounded-[32px]
																														text-[12px]
																														font-mediu
																												'>
												{categories}
											</Link>
									} */}

									<div className='mt-[20px] w-[256px]'>
										<h3 className='h-24 text-black font-sans font-semibold text-[22px] text-[#202020] dark:text-white line-clamp-3'>
											{title}
										</h3>
										<div
											className='
																								font-semibold
																								text-[13px]
																								text-primary-pari-red dark:text-[#B82929]
																								flex gap-[8px] items-center
																								uppercase
																								pt-[16px]
																						'>
											FOCUS AND HIGHLIGHTS
											<RightArrowIcon className='stroke-[#B82929] dark:stroke-[#fff]' />
										</div>
									</div>
								</Link>
							</CarouselSlide>
						);
					})}
				</Carousel>
			)}
			<Space h={'1.5rem'} hiddenFrom='lg' />
			<div
				className='
					flex 3xl:px-[104px] 2xl:px-[104px] xl:px-[104px] lg:px-[104px] md:px-[32px] sm:px-[32px] sm2:px-[32px] sm3:px-[32px] xs:px-[32px] lg:hidden xl:hidden 2xl:hidden 3xl:hidden '>
				<Link
					href='/library'
					className='
							flex flex-row items-center font-sans text-primary-pari-red border text-[13px] xs:text-[12px] sm:text-[12px] sm2:text-[12px] sm3:text-[12px] md:text-[12px] not-italic font-medium leading-normal xs:leading-[-0.36px] sm:leading-[-0.36px] sm2:leading-[-0.36px] sm3:leading-[-0.36px] md:leading-[-0.36px] border-primary-pari-red hover:bg-primary-pari-red hover:text-white 

						py-2 pl-[1.12rem] pr-[0.75rem]

						xs:px-[1.5rem] sm:px-[1.5rem] sm2:px-[1.5rem] sm3:px-[1.5rem] md:px-[1.5rem] 
						
						xs:py-[0.75rem] sm:py-[0.75rem] sm2:py-[0.75rem] sm3:py-[0.75rem] md:py-[0.75rem]
						
						rounded-[32px]
						'>
					{message('SeeMoreReports')}
					<RightIcon className='stroke-[#B82929] hover:stroke-white' />
				</Link>
			</div>
		</div>
	);
}
