'use client';

import { get, map } from '@/utils';
import { useEffect, useState } from 'react';

import { BASE_URL } from '@/config';
import { ClearIcon } from '@/common/@the-source/Icon';
import Link from 'next/link';
import classes from './FilterHeader.module.css';
import { Category } from '@/strapi-types/categories.types';
import axios from 'axios';
import { Pill } from '@mantine/core';
import { useSearchParams } from 'next/navigation';
const Label = ({ cardKey, title }: any) => (
	<Link
		href='/'
		key={cardKey}
		className='
            border
            border-primary-pari-red
            text-primary-pari-red
            hover:bg-primary-pari-red hover:text-white
            py-[7px] px-[12px]
            rounded-[32px]
            text-[12px]
            font-medium
        '>
		{title}
	</Link>
);

export default function FilterHeader({ params, pagination, size }: any) {
	const [categories, seCategories] = useState<Category[]>([]);
	const searchParams = useSearchParams();
	const categoryIdsParam = searchParams.get('categoryIds');
	const authorName = searchParams.get('authorName');
	const tags = searchParams.get('tags');
	const location = searchParams.get('location');
	const typeParam = searchParams.get('type');
	const dateRange = searchParams.get('dateRange') as '7' | '30' | '365' | '';
	const search = searchParams.get('search');
	const searchText = searchParams.get('searchText');
	const total = get(pagination, 'total', 0);
	useEffect(() => {
		const categoryIds = (categoryIdsParam as string)?.split(',') || [];

		if (categoryIds.length === 0) {
			seCategories([]);
			return;
		}

		(() => {
			axios({
				url: `${BASE_URL}api/categories`,
				params: {
					'filters[id][$in]': categoryIds,
				},
			}).then((res) => {
				if (res.data.data) {
					seCategories(res.data.data);
				}
			});
		})();
	}, [categoryIdsParam]);

	// console.log({
	// 	search, categoryIdsParam, authorName, location, typeParam, dateRange
	// })
	if ([search, categoryIdsParam, authorName, location, typeParam, dateRange,tags].every((param) => !param)) {
		return null;
	}
	const type = (typeParam as string)?.split(',') || [];

	const dateRangeLabels = {
		'7': 'Last 7 days',
		'14': 'Last 14 days',
		'30': 'Last 30 days',
		'365': 'Last 365 days',
	};

	const dateRangeLabel = dateRange && dateRangeLabels[dateRange];
	// console.log(categories, type, authorName, dateRangeLabel);

	return (
		<>
			{(categories.length || type.length || authorName || dateRangeLabel) && (
				<div className={classes.div}>
					<div className={classes.container}>
						<p className={classes.textelement}>
							Showing {size} of {total} results for {}
						</p>
						<div
							style={{
								display: 'flex',
								alignItems: 'start',
								justifyContent: 'space-between',
							}}>
							<div
								style={{
									display: 'flex',
									gap: '8px',
									flexWrap: 'wrap',
								}}>
								{/* Render category pills */}
								{categories.map(
									(c, index) => c?.attributes?.Title && <Pill key={'c' + index}>{c.attributes.Title}</Pill>,
								)}

								{/* Render type pills */}
								{type.map((item, index) => item && <Pill key={'n' + index}>{item}</Pill>)}

								{/* Render author name pill */}
								{authorName && <Pill>{authorName}</Pill>}
								{/* {tags && <Pill>{tags}</Pill>} */}

								{/* Render date range label pill */}
								{dateRangeLabel && <Pill>{dateRangeLabel}</Pill>}
							</div>

							{/* Clear filters button */}
							<Link href='/articles' className={classes.button}>
								<ClearIcon />
								Clear filters
							</Link>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

// <div className={classes.div}>
// 	<div className={classes.container}>
// 		<p className={classes.textelement}>
// 			Showing {size} of {total} results for {}
// 		</p>
// 		<div
// 			style={{
// 				display: 'flex',
// 				alignItems: 'start',
// 				justifyContent: 'space-between',
// 			}}>
// 			<div
// 				style={{
// 					display: 'flex',
// 					gap: '8px',
// 					flexWrap: 'wrap',
// 				}}>
// 				{categories.map((c, index) => (
// 					<Pill key={'c' + index}>{c.attributes.Title}</Pill>
// 				))}

// 				{type.map((item, index) => (
// 					<Pill key={'n' + index}>{item}</Pill>
// 				))}

// 				{authorName && <Pill>{authorName}</Pill>}
// 				{dateRangeLabel && <Pill>{dateRangeLabel}</Pill>}
// 			</div>

// 			<Link href='/articles' className={classes.button}>
// 				<ClearIcon />
// 				Clear filters
// 			</Link>
// 		</div>
// 	</div>
// </div>
