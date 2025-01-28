import styles from '../../../../styles/library.module.css';
import Image from 'next/image';
import { HeadingOne, RegularText, Label, LabelDesc } from '@/component/Text';
import Link from 'next/link';
import MapService from '@/Services/MapService';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

interface Content {
	id: number;
	__component: string;
	Authors: string;
}

export default function SliderItems({ item, createdDate }: any) {
	// console.log(item);

	const articlecreatedDate = createdDate;

	const [city, setCity] = useState('');
	const {
		attributes: {
			Title,
			Location,
			slug,
			tags: { data },
			Thumbnail: {
				data: {
					attributes: { url },
				},
			},
		},
	} = {
		attributes: {
			Title: item?.attributes?.Title,
			Location: item?.attributes?.Location,
			slug: item?.attributes?.slug,
			tags: {
				data: item?.tags?.data,
			},
			Thumbnail: {
				data: {
					attributes: {
						url: item?.attributes?.Thumbnail?.data?.attributes?.url,
					},
				},
			},
		},
	};

	const getCity = useCallback(async () => {
		if (Location) {
			const loc = JSON.parse(Location);
			if (loc) {
				const result = await MapService.getAddress(`${loc.lat},${loc.lng}`);
				if (result.isOk()) {
					const { value } = result;
					setCity(value?.plus_code?.compound_code);
				}
			}
		}
	}, [Location]);

	useEffect(() => {
		getCity();
	}, [getCity]);

	return (
		<Link
			href={`/library/${slug}`}
			className={`card flex lg:flex-col xl:flex-col 2xl:flex-col 3xl:flex-col space-x-[1rem] lg:space-x-[0rem] xl:space-x-[0rem] 2xl:space-x-[0rem] 3xl:space-x-[0rem]`}
			style={{ marginTop: 48 }}>
			<div
				className='xs:w-[7rem] sm:w-[7rem] sm2:w-[7rem] sm3:w-[7rem] md:w-[7rem] w-[12.47619rem]
                            xs:h-[8.5rem] sm:h-[8.5rem] sm2:h-[8.5rem] sm3:h-[8.5rem] md:h-[8.5rem] h-[16.375rem] 
                            overflow-hidden rounded-[12px]  backdrop-blur-[10px] bh-[#fff]
              '
				style={{ background: `url(${process.env.NEXT_PUBLIC_API_URL}${url})`, backgroundSize: 'cover' }}>
				{/* <img src={`${process.env.NEXT_PUBLIC_API_URL}${url}`} className="max-w-full object-cover" alt="" /> */}
			</div>

			<div
				className={`description  ${styles['description']} sm:mt-0 lg:mt-[1.5rem] xl:mt-[1.5rem] 2xl:mt-[1.5rem] 3xl:mt-[1.5rem] overflow-hidden `}
				style={{ width: 201, minHeight: 75 }}>
				<div className=' h-[3.125rem] lg:h-[4.6875rem] xl:h-[4.6875rem] 2xl:h-[4.6875rem] 3xl:h-[4.6875rem]    overflow-hidden'>
					<h1 className='dark:text-white text-[1.125rem] text-[#202020] not-italic	 font-semibold font-sans  line-clamp-2 leading-[140%] tracking-[-0.045rem] break-words	lg:line-clamp-3 xl:line-clamp-3 2xl:line-clamp-3 3xl:line-clamp-3 lg:rtl:mr-0 rtl:mr-[1.2rem] '>
						{Title}
					</h1>
				</div>
				<div>
					<h2
						className={`desc2 text-[0.75rem] text-[#828282] not-italic font-medium font-sans line-clamp-1 leading-[160%] tracking-[-0.0225rem] mt-[1rem] mb-[0.75rem]`}>
						<div
							className='break-words'
							dangerouslySetInnerHTML={{
								__html: item?.attributes?.content.find(
									(content: Content) => content.__component === 'modular-content.authors',
								)?.Authors,
							}}></div>
					</h2>

					{/* strap */}

					<p className={`date flex align-middle lg:rtl:mr-0 rtl:mr-[1.2rem] `}>
						{/* {`Focus and Highlights`} */}
						<span
							className='dark:text-[#B82929] font-sans font-semibold  not-italic antialiased uppercase 
                            
                            xs:text-[0.8125rem] sm:text-[0.8125rem] sm2:text-[0.8125rem ] sm3:text-[0.8125rem] md:text-[0.8125rem] text-[0.8125rem]
                            
                            text-[#B82929]  leading-normal 
                            
                            xs:tracking-[-0.01625rem] sm:tracking-[-0.01625rem] sm2:tracking-[-0.01625rem] sm3:tracking-[-0.01625rem] md:tracking-[-0.01625rem] tracking-[-0.01625rem]     
                            
                            break-words text-ellipsis overflow-hidden
                            
                             '>
							Focus And Highlights
						</span>

						<span>
							<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M7.5 15L12.5 10L7.5 5'
									stroke='#B82929'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</span>
					</p>
				</div>
			</div>
		</Link>
	);
}
