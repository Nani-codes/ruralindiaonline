import SubHeader from '@/component/MainHeader';
import styles from '@/styles/library.module.css';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import Head from '@/component/Head';
import ArchiveService from '@/Services/ArchiveService';
import { Fragment, useEffect, useState } from 'react';
import Item from './components/Item';
import Focus from '@/component/components/focus';
import Tabs from '@/component/Tabs';
import Button from '@/component/Button';
import Filters from './components/Filters';
import FilterModal from './components/FilterModal';

export default function Library(props: any) {
	const { libraries, types, pagination, banner, options, rooms } = props;
	const { locale, query, push } = useRouter();
	const { page, gte, lte, room, type, tab = 'All' } = query;
	const [open, setOpen] = useState(false);
	const [selectedRoom, setRooms] = useState<any>('');
	const [selectedType, setTypes] = useState<any>('');

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

	const selectTypes = (e: any, value: string) => {
		e.preventDefault();

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

	const navigate = (e: any, value: string) => {
		e.preventDefault();
		push({
			pathname: 'library',
			query: { page: page || 1, room: selectedRoom, type: selectedType, tab },
		});
	};

	const removeFilter = (e: any, value: string) => {
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

	return (
		<div>
			<Head
				title='Library'
				description='A collection of official and independent reports on rural India, from economic trends to policy briefings to census data.'
			/>
			<SubHeader active='library' options={options} />
			<div className={styles.row}>
				<Focus isLibrary item={banner?.attributes?.library_banners || []} />
			</div>
			<div className={styles['top']}>
				<div className={styles['main-header']}>
					<div>
						<h1 className={styles['title']}>
							<svg width='22' height='20' viewBox='0 0 22 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
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
				<div className={styles['content-wrapper']}>
					<div className={styles['desktop']}>
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

					<div className={styles['container']}>
						<div className={styles.content}>
							{libraries?.map((item: any, i: number) => (
								<Fragment key={`/library/${item?.attributes?.slug}`}>
									<Item item={item} />
								</Fragment>
							))}
						</div>
						<div className={styles.divider} />
						<ReactPaginate
							breakLabel='...'
							nextLabel={<Next />}
							onPageChange={({ selected }) =>
								push({
									pathname: 'library',
									query: { page: `${selected + 1}`, room, type, tab },
								})
							}
							pageRangeDisplayed={5}
							pageCount={pagination?.pageCount}
							forcePage={+(page ?? 1) - 1}
							previousLabel={<Prev />}
							containerClassName='pagination'
						/>
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

	const params = {
		populate: 'deep,10',
		locale,
		'filters[racks][id][$eq]': query?.room || undefined,
		'filters[content_types][id][$eq]': query?.type || undefined,
		'pagination[page]': query?.page || 1,
		'pagination[pageSize]': 25,
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
		locale,
	});
	if (roomRes.isOk()) {
		const { value } = roomRes;
		rooms = value.data ?? [];
	}

	const typeRes = await ArchiveService.getTypes({
		populate: 'deep,10',
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
	<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
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
	<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
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
		<svg width='8' height='13' viewBox='0 0 8 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path d='M6.5 11.5L1.5 6.5L6.5 1.5' stroke='#B82929' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
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
