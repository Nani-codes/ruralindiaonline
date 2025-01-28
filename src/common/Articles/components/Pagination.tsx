'use client';

import { Next, Prev } from '@/common/@the-source/Icon';

import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/navigation';
import classes from './Pagination.module.css'
export default function Pagination({ params, pagination }: any) {
	const { push } = useRouter();
	const {
		categoryIds = '',
		authorName = '',
		tags='',
		location = '',
		type = '',
		dateRange = '',
		search = '',
		searchText = '',
		page = 1,
	} = params;

	const onPageChange = ({ selected }: any) => {
		let params: any = {
			page: `${selected + 1}`,
			categoryIds,
			authorName,
			tags,
			location,
			type,
			dateRange,
			search,
			searchText,
		};
		let searchParams = new URLSearchParams(params);

		searchParams.forEach((value: any, key: any) => {
			if (value === '' || value === 'undefined' || value === 'null' || value === undefined || value === null)
				searchParams.delete(key);
		});

		push(`/articles?${searchParams.toString()}`);
	};

	return (
		<ReactPaginate
			breakLabel='...'
			nextLabel={<Next />}
			onPageChange={onPageChange}
			pageRangeDisplayed={5}
			pageCount={pagination?.pageCount}
			forcePage={+(page ?? 1) - 1}
			previousLabel={<Prev />}
			containerClassName={classes.container}
			pageLinkClassName={classes.pagelink}
			activeLinkClassName={classes.activelink}
			disabledLinkClassName={classes.disablelink}
			previousLinkClassName={classes.previouslink}
			nextLinkClassName={classes.nextlink}
		/>
	);
}
