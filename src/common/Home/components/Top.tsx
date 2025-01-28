'use client';

import '@mantine/carousel/styles.css';

import { get, map } from '@/utils';

import { BASE_URL } from '@/config';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useViewportSize } from '@mantine/hooks';
import sanitizeHtml from 'sanitize-html';
import { useRouter } from 'next/router';
const bg = [
	{ bg: 'bg-[#000]', text: 'text-[#fff]', hover: 'hover:bg-[#fff]', hoverText: 'hover:text-[#000]' },
	{ bg: 'bg-[#B82929]', text: 'text-[#fff]', hover: 'hover:bg-[#fff]', hoverText: 'hover:text-[#B82929]' },
	{ bg: 'bg-[#FFFFFF]', text: 'text-[#000]', hover: 'hover:bg-[#000]', hoverText: 'hover:text-[#FFFFFF]' },
	{ bg: 'bg-[#F2C94C]', text: 'text-[#333333]', hover: 'hover:bg-[#333333]', hoverText: 'hover:text-[#F2C94C]' },
	{ bg: 'bg-[#2F80ED]', text: 'text-[#fff]', hover: 'hover:bg-[#fff]', hoverText: 'hover:text-[#2F80ED]' },
];

export default function TopSession({ pariInformation, week_days, monthly }: any) {
	// console.log(week_days, monthly);
	const params = useParams();
	const weekdays = useTranslations('date');
	const mesage = useTranslations('Index');
	const { locale } = useRouter();

	const day = dayjs().format('dddd');
	const month = dayjs().format('MMMM');
	const date = dayjs().format('DD');
	const year = dayjs().format('YYYY');
	const { width } = useViewportSize();

	const weekDay = Object?.keys(week_days)?.find((w: string) => w.toLowerCase() === day.toLowerCase());
	const month_name = Object?.keys(monthly)?.find((m: string) => m.toLowerCase() === month.toLowerCase());
	// console.log(weekDay, month_name);
	const formattedDate = `${week_days[weekDay || '']} | ${monthly[month_name || '']} ${date}, ${year}`;

	return (
		<div className='bg-[#f4f4f4]'>
			<div className='3xl:px-[104px] 2xl:px-[104px] xl:px-[104px] lg:px-[104px] md:px-[32px] sm:px-[32px] sm2:px-[32px] sm3:px-[32px] xs:px-[32px] flex flex-row items-end justify-between pb-[32px] lg:pb-[48px] xl:pb-[48px] 2xl:pb-[48px] 3xl:pb-[48px] pt-[56px]'>
				<div>
					<p className='font-sans font-semibold uppercase text-[15px] text-[#828282] leading-normal not-italic xs:tracking-[-0.26px] sm:tracking-[-0.26px] sm2:tracking-[-0.26px] sm3:tracking-[-0.26px] md:tracking-[-0.26px] tracking-[-0.3px]  pb-[8px] lg:pb-[16px] xl:pb-[16px] 2xl:pb-[16px] 3xl:pb-[16px]'>
						{formattedDate}
					</p>
					<h1
						className='
						font-sans font-bold not-italic
						lg:text-[56px] xl:text-[56px] 2xl:text-[56px] 3xl:text-[56px] md:text-[32px] text-[32px]
						leading-[39.68px] lg:leading-[68.32px] xl:leading-[68.32px] 2xl:leading-[68.32px] 3xl:leading-[68.32px]
						light:text-black
						dark:text-white
						
						tracking-[-1.28px] lg:tracking-[-2.24px] xl:tracking-[-2.24px] 2xl:tracking-[-2.24px] 3xl:tracking-[-2.24px] lg:pl-[2px] xl:pl-[2px] 2xl:pl-[2px] 3xl:pl-[2px]
						'>
						{mesage('title')}!
						<br />
						{mesage('subtitle')}
					</h1>
				</div>
				{/* <Link
					href='#ThisWeekOnPari'
					className='text-[13px] sm:hidden sm2:hidden sm3:hidden xs:hidden md:hidden flex flex-row items-center font-sans border border-primary-pari-red text-primary-pari-red hover:bg-primary-pari-red hover:text-white py-2 pl-4 pr-2 rounded-[32px]'>
					{mesage('JumpToStories')}
					<Down className='stroke-[#B82929] hover:stroke-white' />
				</Link> */}
			</div>

			<Carousel
				styles={{ root: { width: '100%' } }}
				slideSize={{
					xs: '80vw',
					sm: '80vw',
					sm2: '66.3vw',
					sm3: '49.7vw',
					md: '35vw',
					lg: '20vw',
					xl: '20vw',
					xl2: '14vw',
					xl3: '23vw',
				}}
				controlsOffset={width >= 1024 ? '4.5rem' : '0rem'}
				dragFree
				dir={locale === 'ur' ? 'rtl' : 'ltr'}
				// dir='rtl'
				withControls={width >= 1024 ? true : false}
				px={{ base: '2rem', md: '2rem', lg: '7rem', xl: '7rem', xl2: '7rem' }}
				align={'start'}
				slideGap={{ base: '1rem', md: '2rem', lg: '1.5rem', xl: '1.5rem', xl2: '1.5rem' }}>
				{map(pariInformation, (item: any, index: number) => {
					const Imageurl = item?.image?.data?.attributes?.url;

					const title = item?.title;
					const description = item?.description;
					// const details = getLinkDetails(title);

					// console.log('details', details);
					return (
						<CarouselSlide key={index}>
							<div
								className={`flex flex-col font-sans shadow-[0px_1px_4px_rgba(0,_0,_0,_0.28)] w-[366px] xs:w-[280px] sm:w-[311px] rounded-[32px] ${
									bg[index % 5]?.text
								} ${bg[index % 5]?.bg}`}>
								<Image
									width={366}
									height={216}
									className='relative rounded-t-2xl rounded-b-none w-[366px] xs:w-[280px] sm:w-[311px] h-[216px] object-cover'
									alt={title}
									src={`${BASE_URL}${Imageurl}`}
								/>
								<div className='p-[32px] flex flex-col items-start justify-between' style={{ flex: 1 }}>
									<div>
										{/* <p className='text-[32px] not-italic font-bold leading-[39.68px] tracking-[-1.28px] min-h-[90px] sm:min-h-[140px] pb-[12px]'>
											{title}
										</p> */}
										<p
											style={{
												display: '-webkit-box',
												WebkitLineClamp: 2, // Limits text to 2 lines
												WebkitBoxOrient: 'vertical',
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												lineHeight: '1.3em', // Ensure consistent line height
												maxHeight: 'calc(1.3em * 2)', // Explicit height for Safari
											}}
											className='text-[32px] not-italic font-bold tracking-[-1.28px] min-h-[90px] sm:min-h-[140px]'>
											{title}
										</p>
										<div
											className='content-part mt-[12px] relative text-[15px] not-italic font-normal tracking-[-0.45px] leading-[170%] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:6] [-webkit-box-orient:vertical] w-[302px] sm:w-[247px] xs:w-[222px] min-h-[155px] '
											dangerouslySetInnerHTML={{
												__html: sanitizeHtml(description, {
													// allowedTags: [ 'b', 'i', 'em', 'strong', 'a','span','p' ],
													transformTags: {
														// 'span': 'i',
													},
													allowedStyles: {},
													// allowedAttributes: {
													// 	a: ['href'],
													// },
												}),
											}}></div>
									</div>
									<div className='mt-[24px]'>
										<Link
											href={item?.url || '/'}
											className={`py-2 px-[1rem] rounded-[32px] font-sans border border-[${
												bg[index % 5]?.bg
											}] text-[12px] ${bg[index % 5]?.hover} ${bg[index % 5]?.hoverText}`}>
											{item?.ButtonText || 'Read More'}
										</Link>
									</div>
								</div>
							</div>
						</CarouselSlide>
					);
				})}
			</Carousel>
		</div>
	);
}

const Down = ({ className }: any) => (
	<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
		<path d='M5 7.5L10 12.5L15 7.5' strokeWidth='1.5' className={className} strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

// const getLinkDetails = (title: string) => {
// 	const value = title?.toLowerCase();
// 	if (value?.includes('education')) {
// 		return {
// 			href: '/education',
// 			text: 'Visit PARI Education',
// 		};
// 	}

// 	if (value?.includes('multilingual')) {
// 		return {
// 			href: '/en/article/Many%20Worlds,%20One%20Website',
// 			text: 'Choose a language',
// 		};
// 	}

// 	if (value?.includes('library')) {
// 		return {
// 			href: '/library?page=1',
// 			text: 'Go to the Library',
// 		};
// 	}

// 	if (value?.includes('donate')) {
// 		return {
// 			href: '/donate-pari',
// 			text: 'Donate to us',
// 		};
// 	}

// 	return {
// 		href: '/en/article/pari-s-language-universe',
// 		text: 'Read More',
// 	};
// };
