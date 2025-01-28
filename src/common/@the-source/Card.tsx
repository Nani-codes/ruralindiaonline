'use client';

import { IMAGE_URL } from '@/config';
import Image from 'next/image';
import Link from 'next/link';
import { RightArrowIcon } from './Icon';
import dayjs from 'dayjs';
import { get } from '@/utils';
import { useTranslations } from 'next-intl';

// PARI RECOMMENDS card

export default function Card({ article }: any) {
	const href = `/article/${encodeURI(get(article, 'attributes.slug', ''))}`;
	const title = get(article, 'attributes.Title', '');
	const url = get(article, 'attributes.Cover_image.data.attributes.url', '');
	const localizations = get(article, 'attributes.localizations.data', []);
	const Authors = get(article, 'attributes.Authors', []);
	const createdAt = get(article, 'attributes.Original_published_date') || get(article, 'attributes.publishedAt');

	const weekdays = useTranslations('date');
	const date = dayjs(createdAt).format('dddd MMMM DD, YYYY');
	const parts = date.split(' ');
	const week = get(parts, '0', '');
	const month = get(parts, '1', '');
	const localDate = dayjs(createdAt).format('MMM DD, YYYY');

	// const Authors = get(article, 'attributes.Authors', []);

	// Extract author names from the Authors array
	const authorNames = Authors.map((author: any) => {
		// Assuming the author_name is nested as described in your data structure
		return get(author, 'author_name.data.attributes.Name', '');
	});

	// Join author names with a comma and space
	const authorsString = authorNames.join(', ');

	const dummy = "<span style='opacity:0'>language</span>";
	const district = article?.attributes?.location?.data?.attributes?.district;
	const state = article?.attributes?.location?.data?.attributes?.state;

	return (
		<Link
			href={href}
			className=' min-w-[272px] max-w-[272px] rounded-[16px]  bg-white dark:bg-primary-pari-black font-sans flex flex-col'>
			<div
				className='w-full h-[156px] !bg-cover bg-no-repeat overflow-hidden
				rounded-t-[16px]  dark:bg-black  md:w-[272px] sm:w-[272px] xs:w-[272px]
              '
				style={{ background: `url(${IMAGE_URL}${url})` }}
			/>

			{/* <Image
				src={`${IMAGE_URL}${url}`}
				width={272}
				height={156}
				alt={title}
				className='rounded-t-[16px] rounded-b-none object-contain w-[272px] h-[156px] bg-gray-5 dark:bg-black  md:w-[272px] sm:w-[272px] xs:w-[272px]'
			/> */}
			<div className='p-[24px] flex flex-col space-y-[1rem]'>
				<div className=''>
					<h1
						className='
												font-sans text-[1.125rem] not-italic font-semibold	 text-[#202020] dark:text-white
                        leading-[140%] tracking-[-0.045rem] pb-[0.25rem] min-h-[3.125rem]
												 line-clamp-2
                    '>
						{title}
					</h1>

					<p
						className='
						font-sans text-[0.9375rem] not-italic font-medium	 text-[#828282] dark:text-white
                        leading-[170%] tracking-[-0.0375rem] pb-[0.25rem] line-clamp-1	min-h-[1.625rem]
                    '>
						{authorsString}
					</p>

					<p
						className='
						text-[#4F4F4F] font-sans text-[0.75rem] not-italic font-medium dark:text-white
                        leading-[160%] tracking-[-0.0225rem] pb-[1.5] min-h-[0.5625rem]
                    '>
						{localizations?.length > 0 && `${localizations.length} Language${localizations.length > 1 ? 's' : ''}`}

						{(!localizations || localizations.length <= 0) && <span dangerouslySetInnerHTML={{ __html: dummy }} />}
					</p>
				</div>

				<div className='border-t border-[#F2F2F2]'></div>

				<div
					className='
					text-[#B82929] font-sans text-[0.8125rem] not-italic font-semibold	 dark:text-white
					leading-normal tracking-[-0.01625rem]

                        flex gap-[8px] items-center
                        uppercase
                         dark:gray-7
                        w-full overflow-hidden
                    '>
					{/* {loctionInfo ? `${cityAndState} • ${localDate}` : `${cityAndState} • ${localDate}`} */}
					{district}, {state} • {localDate}
					<RightArrowIcon />
				</div>
			</div>
		</Link>
	);
}

// rounded-t-2xl rounded-b-none
