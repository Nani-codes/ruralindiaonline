'use client';
import { RightArrowIcon } from '@/common/@the-source/Icon';
import { IMAGE_URL } from '@/config';
import { Category } from '@/strapi-types/categories.types';
import { get, map } from '@/utils';
import { getArticlesUrl } from '@/utils/articlesUrl';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

// PARI SPOTLIGHT card

export default function Card({ article }: any) {
	interface Author {
		id: number;
		author_role: {
			data: {
				attributes: {
					Name: string;
					// Add other properties as needed
				};
			};
		};
		author_name: {
			data: {
				id: number;
				attributes: {
					Name: string;
					// Add other properties as needed
				};
			} | null;
		};
		// Add other properties as needed
	}
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
	const authorsInfo = Authors.find((i: Author | undefined) => i?.author_role?.data?.attributes?.Name === 'Author');
	const authorName = get(authorsInfo, 'author_name.data.attributes.Name', '');

	const weekdays = useTranslations('date');
	const date = dayjs(createdAt).format('dddd MMMM DD, YYYY');
	const parts = date.split(' ');
	const week = get(parts, '0', '');
	const month = get(parts, '1', '');
	const localDate = dayjs(createdAt).format('MMM DD, YYYY');

	const location = article?.attributes?.location?.data?.attributes?.name;
	const district = article?.attributes?.location?.data?.attributes?.district;
	const state = article?.attributes?.location?.data?.attributes?.state;
	// const Authors = get(article, 'attributes.Authors', []);

	// Extract author names from the Authors array
	const authorNames = Authors.map((author: any) => {
		// Assuming the author_name is nested as described in your data structure
		return get(author, 'author_name.data.attributes.Name', '');
	});

	// Join author names with a comma and space
	const authorsString = authorNames.join(', ');

	return (
		<Link
			href={href}
			className='
			
                xs:min-w-[19.4375rem] sm:min-w-[19.4375rem] sm2:min-w-[19.4375rem] sm3:min-w-[19.4375rem] md:min-w-[19.4rem] lg:min-w-[40rem] xl:min-w-[40rem] 2xl:min-w-[40rem] 3xl:min-w-[40rem]
                rounded-[16px] overflow-hidden
                shadow-[0px_1px_4px_rgba(0,_0,_0,_0.10)]
                bg-white dark:bg-primary-pari-black
                font-sans

                flex  items-stretch justify-between xs:flex-col sm:flex-col sm2:flex-col sm3:flex-col  md:flex-col xl:flex-row  2xl:flex-row 3xl:flex-row  align-middle justify-center


				xs:px-[0] sm:px-[0] sm2:px-[0] sm3:px-[0] md:px-[0] lg:px-[1.5rem] xl:px-[1.5rem] 2xl:px-[1.5rem] 3xl:px-[1.5rem]

				xs:py-[0] sm:py-[0] sm2:py-[0] sm3:py-[0] md:py-[0] lg:py-[1.5rem] xl:py-[1.5rem] 2xl:py-[1.5rem] 3xl:py-[1.5rem]

				xs:space-x-[0rem] sm:space-x-[0rem] sm2:space-x-[0rem] sm3:space-x-[0rem] md:space-x-[0rem] lg:space-x-[1.5rem] xl:space-x-[1.5rem] 2xl:space-x-[1.5rem] 3xl:space-x-[1.5rem]
				p-[24px]
				gap-[24px]

            '>
			<div className='image-part'>
				<div
					className='w-[212px] h-[200px]   xs:w-full sm:w-full sm2:w-full sm3:w-full md:w-full

					!bg-cover bg-no-repeat overflow-hidden lg:rounded-[12px] xl:rounded-[12px] 2xl:rounded-[12px] 3xl:rounded-[12px]  backdrop-blur-[10px] bh-[#fff]
				'
					style={{ background: `url(${IMAGE_URL}${url})` }}
				/>
			</div>
			<div className='content-part w-[380px] md:w-[auto] sm:w-[auto] sm2:w-[auto] sm3:w-[auto] xs:w-[auto] xs:p-[1.5rem] sm:p-[1.5rem] sm2:p-[1.5rem] sm3:p-[1.5rem] md:p-[1.5rem] flex flex-col justify-between overflow-hidden'>
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

					<div className='min-h-16'>
						<h1
							className='
						font-sans text-[#202020] text-[1.25rem]
                          dark:text-white not-italic
                        leading-[135%] tracking-[-0.0625rem]
                        font-semibold
                        line-clamp-2 min-h-[60px] pb-[0.5rem]
                    '>
							{' '}
							{title}
						</h1>
					</div>

					<div className='min-h-14'>
						<p
							className='
						font-sans text-[#828282] text-[0.9375rem]
                          dark:text-white not-italic
                        leading-[170%] tracking-[-0.0375rem]
                        font-medium pb-[0.5rem]
                    '>
							{/* {authorName} */}
							{authorsString}
						</p>
					</div>

					<p
						className='
                        font-sans text-[#4F4F4F] text-[0.75rem]
                          dark:text-white not-italic
                        leading-[160%] tracking-[-0.0225rem]
                        font-medium
                        pb-[1.5rem]
                    '>
						{localizations?.length > 0 && `${localizations.length} Language${localizations.length > 1 ? 's' : ''}`}
					</p>
				</div>

				<div
					className='
                        font-semibold
                        text-[13px]
                        text-primary-pari-red dark:text-white
                        flex gap-[8px] items-center
                        uppercase
                        border-t  border-gray-6 dark:gray-7
                        pt-[1rem]
						tracking-[-0.26px]
                    '>
					{/* {loctionInfo ? `${cityAndState} • ${localDate}` : `${localDate}`} location */}
					{district}, {state} • {localDate}
					<RightArrowIcon />
				</div>
			</div>
		</Link>
	);
}
