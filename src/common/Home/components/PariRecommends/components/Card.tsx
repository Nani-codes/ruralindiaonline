import { RightArrowIcon } from '@/common/@the-source/Icon';
import { IMAGE_URL } from '@/config';
import { get } from '@/utils';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

export default function Card({ article }: any) {
	const href = `/article/${encodeURI(get(article, 'attributes.slug', ''))}`;
	const title = get(article, 'attributes.Title', '');
	const url = get(article, 'attributes.Cover_image.data.attributes.url', '');
	const localizations = get(article, 'attributes.localizations.data', []);
	const Authors = get(article, 'attributes.Authors', []);
	const loctionInfo = get(article, 'attributes.location.description', '');
	const createdAt = get(article, 'attributes.Original_published_date') || get(article, 'attributes.publishedAt');
	const authorsInfo = Authors.find((i: any) => i?.author_role?.data?.attributes?.Name === 'Author');
	const authorName = get(authorsInfo, 'author.data.attributes.Name');

	return (
		<Link
			href={href}
			className='
                w-[272px]
                rounded-[16px]
                shadow-[0px_1px_4px_rgba(0,_0,_0,_0.10)]
                bg-white dark:bg-primary-pari-black
                font-sans
                flex flex-col
            '>
			<Image
				src={`${IMAGE_URL}${url}`}
				width={272}
				height={156}
				alt={title}
				className='rounded-t-[16px] rounded-b-none object-contain w-[272px] h-[156px] bg-gray-5 dark:bg-black  md:w-[272px] sm:w-[272px] xs:w-[272px]'
			/>
			<div className='p-[24px] flex flex-col justify-between' style={{ flex: 1 }}>
				<div className='flex flex-col gap-[4px] pb-[24px]'>
					<h1
						className='
                        text-[18px] text-gray dark:text-white
                        leading-[25.2px]
                        font-semibold
                    '>
						{' '}
						{title}
					</h1>
					<p
						className='
                        text-[15px] text-gray-3 dark:text-gray-7
                        font-medium
                    '>
						{authorName}
					</p>
					<p
						className='
                        text-[12px] text-gray-2 dark:text-gray-3
                        font-medium
                    '>{`${localizations?.length} Languages`}</p>
				</div>

				<div
					className='
                        font-semibold
                        text-[13px]
                        text-primary-pari-red dark:text-white
                        flex gap-[8px] items-center
                        uppercase
                        border-t  border-gray-6 dark:gray-7
                        pt-[16px]
                        w-[272px]
                    '>
					{`${loctionInfo} • ${dayjs(createdAt).format('dddd MMMM DD, YYYY')}`}
					<RightArrowIcon className='stroke-[#B82929] dark:stroke-[#fff]' />
				</div>
			</div>
		</Link>
	);
}

// rounded-t-2xl rounded-b-none
