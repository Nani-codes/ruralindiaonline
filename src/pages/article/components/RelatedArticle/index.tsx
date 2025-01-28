import './RelatedArticle.module.css';

import React, { useState } from 'react';

import { Box } from '@mantine/core';
import Link from 'next/link';
import dayjs from 'dayjs';
import { get } from '@/utils';
import styles from './RelatedArticle.module.css';
import { useTranslations } from 'next-intl';

interface relatedParams {
	relatedArticles: any; // Replace 'any' with the actual type of 'data'
}

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

		location: {
			description: string;
		};

		localizations: {
			data: [];
		};
	};

	// other properties
}

const CustomCarousel = ({ relatedArticles }: relatedParams) => {
	return (
		<>
			<div
				className={`${styles.relatedArticles} xs:!mx-[0] sm:!mx-[0] sm2:!mx-[0px] sm3:!mx-[0px]`}
				style={{ marginTop: '3rem' }}>
				<h3 className={`${styles.sectionTitle} justify-center`}>
					<svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M11 1L13.012 6.23109C13.294 6.96432 13.435 7.33093 13.6542 7.63931C13.8486 7.91262 14.0874 8.15141 14.3607 8.34575C14.6691 8.56503 15.0357 8.70603 15.7689 8.98804L21 11L15.7689 13.012C15.0357 13.294 14.6691 13.435 14.3607 13.6542C14.0874 13.8486 13.8486 14.0874 13.6542 14.3607C13.435 14.6691 13.294 15.0357 13.012 15.7689L11 21L8.98804 15.7689C8.70603 15.0357 8.56503 14.6691 8.34575 14.3607C8.15141 14.0874 7.91262 13.8486 7.63931 13.6542C7.33093 13.435 6.96432 13.294 6.23109 13.012L1 11L6.23108 8.98804C6.96431 8.70603 7.33093 8.56503 7.63931 8.34575C7.91262 8.15141 8.15141 7.91262 8.34575 7.63931C8.56503 7.33093 8.70603 6.96431 8.98804 6.23108L11 1Z'
							stroke='#B82929'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
					Related stories
				</h3>
			</div>
			<Box className={`${styles.row}`} w='100%'>
				{relatedArticles?.map((article: Article, index: number) => {
					// Extract location, date, and other information for each article
					const loctionInfo = get(article, 'attributes.location.description', '');
					const locationParts = loctionInfo.split(',').map((part: string) => part.trim());
					const cityAndState = locationParts[0];
					const createdAt = get(article, 'attributes.Original_published_date') || get(article, 'attributes.publishedAt');

					// Format date information
					const localDate = dayjs(createdAt).format('MMM DD, YYYY');

					// Other date-related information
					const weekdays = useTranslations('date');
					const date = dayjs(createdAt).format('dddd MMMM DD, YYYY');
					const parts = date.split(' ');
					const week = get(parts, '0', '');
					const month = get(parts, '1', '');

					return (
						<Link href={`/article/${article.attributes?.slug || ''}`} key={index}>
							<div className={`${styles.customcard}`} key={article.id}>
								<div
									className='h-96 rounded-3xl bg-white'
									style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
									<img
										className='w-full h-48 rounded-t-3xl object-cover'
										src={
											article.attributes?.Cover_image?.data?.attributes?.url
												? `${process.env.NEXT_PUBLIC_API_URL}${article.attributes?.Cover_image.data.attributes.url}`
												: ''
										}
										alt={article.attributes?.Title}
									/>
									<div
										className='dark:bg-[#000000] p-4'
										style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
										<div>
											<h3
												className='dark:text-[#ffffff] font-bold text-lg text-[#000000]'
												style={{
													whiteSpace: 'normal',
													height: '60px', // Set the desired height
													overflow: 'hidden',
													textOverflow: 'ellipsis',
													display: '-webkit-box',
													WebkitBoxOrient: 'vertical',
													WebkitLineClamp: 2,
												}}>
												{article.attributes?.Title}
											</h3>

											<p
												className='text-sm text-gray-500 dark:text-[#ffffff]'
												style={{
													whiteSpace: 'normal',
													maxWidth: '300px',
													overflow: 'hidden',
													textOverflow: 'ellipsis',
												}}>
												{article.attributes?.Authors[0]?.author_name?.data?.attributes?.Name || ''}
											</p>

											{/* Languages */}
											<p className='text-sm font-bold pt-2 text-gray-500 dark:text-[#ffffff]'>
												{article.attributes?.localizations?.data.length} languages
											</p>
										</div>

										{/* Location */}
										{/* {article.attributes?.location?.description && (
											<p
												className='text-sm font-bold'
												style={{
													marginTop: 'auto',
													color: '#B82929',
													whiteSpace: 'normal',
													height: '25px', // Set the desired height
													overflow: 'hidden',

													textOverflow: 'ellipsis',
													display: '-webkit-box',
													WebkitBoxOrient: 'vertical',
													WebkitLineClamp: 1,
												}}>
												{loctionInfo ? `${cityAndState} • ${localDate}` : `${cityAndState} • ${localDate}`}
											</p>
										)} */}
									</div>
								</div>
								<div className='px-48 pb-4'> </div>
							</div>
						</Link>
					);
				})}
			</Box>
		</>
	);
};

export default CustomCarousel;
