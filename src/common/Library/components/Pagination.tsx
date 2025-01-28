'use client';
import ReactPaginate from 'react-paginate';

import { Next, Prev } from '@/common/@the-source/Icon';
import { useRouter } from 'next/navigation';

export default function Pagination({ params, pagination }: any) {
	const { push } = useRouter();
	const {
		tab = 'All',
		type = '',
		room = '',
		page = 1,
	} = params;

	const onPageChange = ({ selected }: any) => {
		let params: any = {
			page: `${selected + 1}`,
			room,
			tab, 
			type,
		};
		let searchParams = new URLSearchParams(params);

		searchParams.forEach((value: any, key: any) => {
			if (value === '' || value === 'undefined' || value === 'null' || value === undefined || value === null)
				searchParams.delete(key);
		});

		push(`/library?${searchParams.toString()}`);
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
			containerClassName='flex flex-row gap-[8px] items-center flex-wrap'
			pageLinkClassName='
				border-2 rounded-full border-transparent 
				px-[24px] py-[12px] 
				font-sans text-[15px] font-semibold leading-[27px] tracking-[-0.3px]
				hover:border-2 hover:border-primary-pari-red
			'
			activeLinkClassName='border-2 !border-primary-pari-red rounded-full bg-[#EB5757] text-white'
			disabledLinkClassName='opacity-30'
			previousLinkClassName='
                flex flex-row items-center
                border-2 border-primary-pari-red
                px-[24px] py-[12px] rounded-full
                text-primary-pari-red gap-[8px]
            '
			nextLinkClassName='
                flex flex-row items-center
                border-2 border-primary-pari-red
                px-[24px] py-[12px] rounded-full
                text-primary-pari-red gap-[8px]
            '
		/>
	);
}
