import SubHeader from '@/component/MainHeader';
import Header from '../../common/Header';
import styles from '@/styles/library.module.css';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import Head from '@/component/Head';
import ArchiveService from '@/Services/ArchiveService';
import { Fragment, useEffect, useState } from 'react';
import Item from './components/Item';
import ItemSmaller from './components/Item/itemsmaller';

import Focus from '@/component/components/focus';
import Tabs from '@/component/Tabs';
import Button from '@/component/Button';
import Filters from './components/Filters';
import FilterModal from './components/FilterModal';
import CustomPagination from './components/CustomPagination';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import LibrarySliderItems from '../library/librarysliderItem';
import { useMediaQuery } from 'react-responsive';

export default function Library(props: any) {
	// console.log('library props', props);
	const { libraries, types, pagination, banner, options, rooms } = props;
	const { locale, query, push } = useRouter();
	const { page, gte, lte, room, type, tab = 'All' } = query;
	const [open, setOpen] = useState(false);
	const [selectedRoom, setRooms] = useState<any>('');
	const [selectedType, setTypes] = useState<any>('');
	const [currentPage, setCurrentPage] = useState(1);
	const pageCount = 10; // Replace with your actual page count
	const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' }); // Adjust the max-width as needed

	let q = `?page=${page || 1}`;
	if (room) {
		q += `&room=${room}`;
	}
	const selectFilters = (e: any, value: string) => {
		e.preventDefault();
		let r = (selectedRoom as string)?.split(',') ?? [];
		if ((selectedRoom as string)?.split(',')?.includes(value?.toString())) {
			r = r.filter((item) => item !== value?.toString());
		} else {
			r.push(value);
		}
		setRooms(r.filter((i) => i).join(','));

		push({
			pathname: 'library',
			query: { page: page || 1, room: r.filter((i) => i).join(','), type: selectedType, tab },
		});
	};

	const selectTypes = (value: string) => {
		let r = (selectedType as string)?.split(',') ?? [];
		if ((selectedType as string)?.split(',')?.includes(value?.toString())) {
			r = r.filter((item) => item !== value?.toString());
		} else {
			r.push(value);
		}
		setTypes(r.filter((i) => i).join(','));

		push({
			pathname: 'library',
			query: { page: page || 1, room, type: r.filter((i) => i).join(','), tab },
		});
	};

	const navigate = (e: any) => {
		e.preventDefault();
		push({
			pathname: 'library',
			query: { page: page || 1, room: selectedRoom, type: selectedType, tab },
		});
	};

	const removeFilter = (e: any) => {
		e.preventDefault();
		push({
			pathname: 'library',
			query: { page: page || 1 },
		});
	};

	useEffect(() => {
		setRooms(room || '');
		setTypes(type || '');
	}, [room, type]);
	const roomValue = room || '';

	return (
		<div>
			<Head
				title='Library'
				description='A collection of official and independent reports on rural India, from economic trends to policy briefings to census data.'
			/>
			{/* <SubHeader active="library" options={options} /> */}
			<Header />
			<div className='no-scrollbar w-full flex flex-row items-stretch gap-[1.5rem] lg:gap-[1.5rem] xl:gap-[1.5rem] 2xl:gap-[1.5rem] 3xl:gap-[1.5rem]   scroll-behavior-smooth overflow-y-hidden overflow-x-scroll !important px-[1.5rem] md:px-[2.5rem] lg:px-[3.5rem]  xl:px-[3.5rem] 2xl:px-[3.5rem] 3xl:px-[3.5rem] pt-[2rem] lg:pt-[3rem] xl:pt-[3rem] 2xl:pt-[3rem] 3xl:pt-[3rem] pb-[3rem] md:pb-[3rem] lg:pb-[3.5rem] xl:pb-[3.5rem] 2xl:pb-[3.5rem] 3xl:pb-[3.5rem] '>
				<Focus isLibrary item={banner?.attributes?.library_banners || []} />
			</div>
			<div
				className='xs:px-[1.5rem] sm:px-[1.5rem] sm2:px-[1.5rem] sm3:px-[1.5rem] md:px-[2.5rem] lg:px-[3.5rem] xl:px-[3.5rem] 2xl:px-[9.75rem] 3xl:px-[21.75rem] '
				style={{ overflow: 'hidden' }}>
				<div className={`${styles['main-header']} w-full mx-auto max-w-[76.4975rem] `}>
					<div>
						<h1 className={styles['title']}>
							<svg
								className='rtl:ml-[1rem]'
								width='22'
								height='20'
								viewBox='0 0 22 20'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M11 19L10.8999 18.8499C10.2053 17.808 9.85798 17.287 9.3991 16.9098C8.99286 16.5759 8.52476 16.3254 8.02161 16.1726C7.45325 16 6.82711 16 5.57482 16H4.2C3.07989 16 2.51984 16 2.09202 15.782C1.71569 15.5903 1.40973 15.2843 1.21799 14.908C1 14.4802 1 13.9201 1 12.8V4.2C1 3.07989 1 2.51984 1.21799 2.09202C1.40973 1.71569 1.71569 1.40973 2.09202 1.21799C2.51984 1 3.07989 1 4.2 1H4.6C6.84021 1 7.96031 1 8.81596 1.43597C9.56861 1.81947 10.1805 2.43139 10.564 3.18404C11 4.03968 11 5.15979 11 7.4M11 19V7.4M11 19L11.1001 18.8499C11.7947 17.808 12.142 17.287 12.6009 16.9098C13.0071 16.5759 13.4752 16.3254 13.9784 16.1726C14.5467 16 15.1729 16 16.4252 16H17.8C18.9201 16 19.4802 16 19.908 15.782C20.2843 15.5903 20.5903 15.2843 20.782 14.908C21 14.4802 21 13.9201 21 12.8V4.2C21 3.07989 21 2.51984 20.782 2.09202C20.5903 1.71569 20.2843 1.40973 19.908 1.21799C19.4802 1 18.9201 1 17.8 1H17.4C15.1598 1 14.0397 1 13.184 1.43597C12.4314 1.81947 11.8195 2.43139 11.436 3.18404C11 4.03968 11 5.15979 11 7.4'
									stroke='#B82929'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
							Find a report
						</h1>
						<h1 className={styles['sub-title']}>Open source and free forever</h1>
					</div>
					<div className={styles['sub-header']}>
						<Tabs
							active={tab}
							tabs={[
								{
									label: 'All',
									id: 'All',
									onClick: () => {
										push({
											pathname: 'library',
											query: { page, room, type, tab: 'All' },
										});
									},
								},
								{
									label: 'Indian',
									id: 'Indian',
									onClick: () => {
										push({
											pathname: 'library',
											query: { page, room, type, tab: 'Indian' },
										});
									},
								},
								{
									label: 'Global',
									id: 'Global',
									onClick: () => {
										push({
											pathname: 'library',
											query: { page, room, type, tab: 'Global' },
										});
									},
								},
							]}
						/>

						<Button type='secondary' label='Filter' className={`${styles.bnt}`} onClick={() => setOpen(true)} />
					</div>
				</div>
				<div className={`${styles['content-wrapper']} w-full mx-auto max-w-[76.4975rem]  overflow-hidden`}>
					<div className={`${styles['desktop']}   test max-w-[216px] overflow-hidden`}>
						<Filters
							type={selectedType}
							types={types}
							selectTypes={selectTypes}
							room={selectedRoom}
							rooms={rooms}
							selectFilters={selectFilters}
							navigate={navigate}
							removeFilter={removeFilter}
						/>
					</div>

					<div className={`${styles['container']} test2`}>
						<div className={`${styles.content} test3`}>
							{libraries?.map((item: any) => (
								<Fragment key={`/library/${item?.attributes?.slug}`}>
									<LibrarySliderItems item={item} createdDate={item?.attributes?.createdAt} />

									{/* {isSmallScreen ? (


                                <Item item={item} />
                                // <>
                                // <h1>test 1 </h1>
                                // </>


          ) : (

            <ItemSmaller item={item} />
            // <>
            //                     <h1>test 2</h1>
            //                     </>


          )} */}
								</Fragment>
							))}
						</div>
						<div className={styles.divider} />

						<CustomPagination
							pageCount={pagination?.pageCount}
							initialPage={1}
							room={roomValue as string}
							type={type as string}
							tab={tab as string}
						/>
						{/* <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={({ selected }) =>
                  push({
                    pathname: "library",
                    query: { page: `${selected + 1}`, room, type, tab },
                  })
                }
                pageRangeDisplayed={5}
                pageCount={pagination?.pageCount}
                forcePage={+(page ?? 1) - 1}
                previousLabel="Prev"
                containerClassName="pagination"
              /> */}
					</div>
				</div>
			</div>
			<FilterModal
				type={selectedType}
				types={types}
				selectTypes={selectTypes}
				room={selectedRoom}
				rooms={rooms}
				selectFilters={selectFilters}
				navigate={navigate}
				setOpen={setOpen}
				open={open}
			/>
		</div>
	);
}

export async function getServerSideProps({ locale, query }: any) {
	let libraries: any[] = [];
	let banner: any[] = [];
	let pagination: any = {};
	let types: any[] = [];
	let rooms: any[] = [];

	const roomsQuery = query?.room ? query?.room.split(',') : undefined;
	const typeQuery = query?.type ? query?.type.split(',')?.map(Number) : undefined;
	const params = {
		populate: 'deep,10',
		locale,
		'filters[racks][id][$in]': roomsQuery,
		'filters[pari_content_types][id][$in]': typeQuery || undefined,
		'pagination[page]': query?.page || 1,
		'pagination[pageSize]': 25,
		sort: 'createdAt:desc',
		'filters[Categories][$eq]': query.tab === 'All' ? undefined : query.tab || undefined,
	};

	const response = await ArchiveService.getArchive(params);

	if (response.isOk()) {
		const { value } = response;
		libraries = value.data ?? [];
		pagination = value?.meta?.pagination ?? {};
	}

	const bannerRes = await ArchiveService.getLibraryBanner({
		populate: 'deep,10',
		locale,
	});

	if (bannerRes.isOk()) {
		const { value } = bannerRes;
		banner = value.data ?? [];
	}

	const roomRes = await ArchiveService.getRooms({
		populate: 'deep,10',
		sort: 'Name:asc',
		locale,
		'pagination[pageSize]': 30,
	});
	if (roomRes.isOk()) {
		const { value } = roomRes;
		rooms = value.data ?? [];
	}

	const typeRes = await ArchiveService.getTypes({
		populate: 'deep,10',
		sort: 'PariContentType:asc',
		locale,
	});
	if (typeRes.isOk()) {
		const { value } = typeRes;
		types = value.data ?? [];
	}

	return {
		props: {
			messages: require(`@/locales/${locale}.json`),
			libraries,
			pagination,
			types,
			banner,
			rooms,
			headers: {
				'Cache-Control': 'no-store',
			},
		},
	};
}
export const Select = () => (
	<svg
		width='20'
		height='20'
		viewBox='0 0 20 20'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className='min-w-[1.5rem] min-h-[1.5rem]'>
		<path
			d='M1 5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H14.2C15.8802 1 16.7202 1 17.362 1.32698C17.9265 1.6146 18.3854 2.07354 18.673 2.63803C19 3.27976 19 4.11984 19 5.8V14.2C19 15.8802 19 16.7202 18.673 17.362C18.3854 17.9265 17.9265 18.3854 17.362 18.673C16.7202 19 15.8802 19 14.2 19H5.8C4.11984 19 3.27976 19 2.63803 18.673C2.07354 18.3854 1.6146 17.9265 1.32698 17.362C1 16.7202 1 15.8802 1 14.2V5.8Z'
			stroke='#828282'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export const Selected = () => (
	<svg
		width='20'
		height='20'
		viewBox='0 0 20 20'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className='min-w-[1.5rem] min-h-[1.5rem]'>
		<path
			d='M5.5 10L8.5 13L14.5 7M5.8 19H14.2C15.8802 19 16.7202 19 17.362 18.673C17.9265 18.3854 18.3854 17.9265 18.673 17.362C19 16.7202 19 15.8802 19 14.2V5.8C19 4.11984 19 3.27976 18.673 2.63803C18.3854 2.07354 17.9265 1.6146 17.362 1.32698C16.7202 1 15.8802 1 14.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V14.2C1 15.8802 1 16.7202 1.32698 17.362C1.6146 17.9265 2.07354 18.3854 2.63803 18.673C3.27976 19 4.11984 19 5.8 19Z'
			stroke='#b82929'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export const Prev = () => (
	<>
		<svg width='103' height='44' viewBox='0 0 103 44' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<rect x='1' y='1' width='101' height='42' rx='21' stroke='#B82929' strokeWidth='2' />
			<path d='M36.5 27L31.5 22L36.5 17' stroke='#B82929' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
			<path
				d='M52.425 16.79C53.825 16.79 54.845 17.075 55.485 17.645C56.125 18.205 56.445 18.99 56.445 20C56.445 20.45 56.37 20.88 56.22 21.29C56.08 21.7 55.845 22.07 55.515 22.4C55.185 22.72 54.745 22.975 54.195 23.165C53.655 23.345 52.99 23.435 52.2 23.435H51.045V27.5H49.425V16.79H52.425ZM52.305 18.155H51.045V22.07H52.02C52.63 22.07 53.14 22.005 53.55 21.875C53.96 21.735 54.265 21.52 54.465 21.23C54.675 20.93 54.78 20.54 54.78 20.06C54.78 19.42 54.58 18.945 54.18 18.635C53.79 18.315 53.165 18.155 52.305 18.155ZM62.1196 19.265C62.2596 19.265 62.4146 19.275 62.5846 19.295C62.7546 19.305 62.8946 19.32 63.0046 19.34L62.8396 20.825C62.7296 20.795 62.5996 20.77 62.4496 20.75C62.2996 20.73 62.1596 20.72 62.0296 20.72C61.7296 20.72 61.4396 20.78 61.1596 20.9C60.8896 21.01 60.6446 21.175 60.4246 21.395C60.2046 21.605 60.0296 21.865 59.8996 22.175C59.7796 22.485 59.7196 22.84 59.7196 23.24V27.5H58.1296V19.415H59.3896L59.5996 20.855H59.6596C59.8296 20.565 60.0346 20.3 60.2746 20.06C60.5146 19.82 60.7896 19.63 61.0996 19.49C61.4096 19.34 61.7496 19.265 62.1196 19.265ZM67.0887 19.265C67.7987 19.265 68.4087 19.415 68.9187 19.715C69.4287 20.005 69.8187 20.425 70.0887 20.975C70.3687 21.525 70.5087 22.175 70.5087 22.925V23.795H65.0787C65.0987 24.625 65.3137 25.26 65.7237 25.7C66.1437 26.14 66.7287 26.36 67.4787 26.36C67.9987 26.36 68.4587 26.315 68.8587 26.225C69.2687 26.125 69.6887 25.98 70.1187 25.79V27.11C69.7187 27.29 69.3087 27.425 68.8887 27.515C68.4787 27.605 67.9887 27.65 67.4187 27.65C66.6387 27.65 65.9487 27.495 65.3487 27.185C64.7487 26.875 64.2787 26.415 63.9387 25.805C63.6087 25.185 63.4437 24.425 63.4437 23.525C63.4437 22.615 63.5937 21.845 63.8937 21.215C64.2037 20.585 64.6287 20.105 65.1687 19.775C65.7187 19.435 66.3587 19.265 67.0887 19.265ZM67.0887 20.495C66.5187 20.495 66.0587 20.68 65.7087 21.05C65.3687 21.42 65.1687 21.945 65.1087 22.625H68.9187C68.9187 22.205 68.8537 21.835 68.7237 21.515C68.5937 21.195 68.3937 20.945 68.1237 20.765C67.8537 20.585 67.5087 20.495 67.0887 20.495ZM73.7147 27.5L70.6547 19.415H72.3347L74.0147 24.14C74.0847 24.34 74.1547 24.565 74.2247 24.815C74.3047 25.065 74.3747 25.305 74.4347 25.535C74.4947 25.765 74.5347 25.965 74.5547 26.135H74.6147C74.6447 25.965 74.6897 25.765 74.7497 25.535C74.8197 25.295 74.8947 25.055 74.9747 24.815C75.0547 24.565 75.1247 24.34 75.1847 24.14L76.8647 19.415H78.5447L75.4697 27.5H73.7147Z'
				fill='#B82929'
			/>
		</svg>
		Prev
	</>
);

export const Next = () => (
	<>
		Next
		<svg width='8' height='13' viewBox='0 0 8 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path d='M1.5 11.5L6.5 6.5L1.5 1.5' stroke='#B82929' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	</>
);
