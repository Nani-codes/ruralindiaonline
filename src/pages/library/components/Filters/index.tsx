import styles from '../../../../styles/library.module.css';
import Link from 'next/link';
import { Selected, Select } from '../..';
import { useEffect, useMemo, useState } from 'react';

export default function Filters({ type, types, room, rooms, selectFilters, selectTypes, navigate, removeFilter }: any) {
	return (
		<div>
			{navigate ? (
				<>
					<div className={styles['filter-header']}>
						<h1 className='dark:text-[#ffff] font-sans font-semibold  not-italic antialiased text-[1.5rem] text-[#333]  leading-[2.25rem] tracking-[-0.075rem]'>
							Filters
						</h1>
						<div>
							<button
								type='button'
								className={`border-2 border-solid border-[#B82929] rounded-[3rem] px-[1rem] py-[0.5rem] dark:text-[#B82929] font-sans font-medium  not-italic antialiased text-[0.75rem] text-[#B82929]  leading-[160%]  tracking-[-0.0225rem]`}
								onClick={removeFilter}>
								Remove filters
							</button>
						</div>
					</div>
					<div className={styles.divider} />
				</>
			) : null}

			<div className={`${styles['filter']} max-w-full testing`}>
				<div className={styles['header']}>
					<ContentTypeFilter onSelect={selectTypes} selected={type} options={types} />
				</div>
			</div>
			<RoomsFilter rooms={rooms} selectFilters={selectFilters} selectedRacksCsv={room} />
		</div>
	);
}

function ContentTypeFilter({
	onSelect,
	selected,
	options = [],
}: {
	onSelect: any;
	selected: string;
	options: {
		id: number;
		attributes: {
			PariContentType: string;
		};
	}[];
}) {
	const selectedTypes = useMemo(() => new Set(selected?.split(',')?.map(Number)), [selected]);
	return (
		<div className={`${styles['filter']} max-w-full testing`}>
			<div className={styles['header']}>
				<h1>
					<svg
						className='rtl:ml-[0.5rem]'
						width='16'
						height='20'
						viewBox='0 0 16 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M1 5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H10.2C11.8802 1 12.7202 1 13.362 1.32698C13.9265 1.6146 14.3854 2.07354 14.673 2.63803C15 3.27976 15 4.11984 15 5.8V19L8 15L1 19V5.8Z'
							stroke='#B82929'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
					Content Types
					<span className='rtl:mr-[0.5rem]'>{options?.length}</span>
				</h1>
			</div>

			<div className={styles['filter-item']}>
				{options.map((op) => (
					<Link
						key={op?.id}
						href='#'
						onClick={(e) => {
							e.preventDefault();
							onSelect(op.id);
						}}
						className={styles['item']}>
						{selectedTypes.has(op.id) ? <Selected /> : <Select />}
						{op.attributes.PariContentType}
					</Link>
				))}
			</div>
		</div>
	);
}

function RoomsFilter({
	rooms,
	selectedRacksCsv,
	selectFilters,
}: {
	rooms: {
		id: number;
		attributes: {
			Name: string;
			slug: string;
			createdAt: string;
			updatedAt: string;
			publishedAt: string;
			racks: {
				data: {
					id: number;
					attributes: {
						Name: string;
						slug: string;
						createdAt: string;
						updatedAt: string;
						publishedAt: string;
						room: {
							data: null;
						};
					};
				}[];
			};
		};
	}[];
	selectedRacksCsv: string;
	selectFilters: any;
}) {
	const selectedRacks = useMemo(() => new Set(selectedRacksCsv?.split(',')), [selectedRacksCsv]);
	const [openState, setOpenState] = useState<{ [key: string]: boolean }>({});

	useEffect(() => {
		const openStateObj: { [key: string]: boolean } = {};
		for (let i = 0; i < rooms?.length; i++) {
			const room = rooms[i];
			const racks = room.attributes.racks.data;
			const open = racks.some((rack) => selectedRacks.has(rack.id.toString()));
			if (open) {
				openStateObj[room.attributes.slug] = true;
			}
		}
		setOpenState(openStateObj);
		// rooms.
	}, [selectedRacks]);

	const handleToggle = (e: any, id: any) => {
		e.preventDefault();
		setOpenState((prev) => ({
			...prev,
			[id]: !prev?.[id],
		}));
	};

	return (
		<div className={`${styles['filter']} max-w-full testing2`}>
			<div className={styles['header']}>
				<h1>
					<svg
						className='rtl:ml-[1rem]'
						width='16'
						height='20'
						viewBox='0 0 16 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M1 5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H10.2C11.8802 1 12.7202 1 13.362 1.32698C13.9265 1.6146 14.3854 2.07354 14.673 2.63803C15 3.27976 15 4.11984 15 5.8V19L8 15L1 19V5.8Z'
							stroke='#B82929'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
					Rooms
					<span className='rtl:mr-[1rem]'>{rooms?.length}</span>
				</h1>
			</div>

			<div className={styles['filter-item']}>
				{rooms?.map((filter) => (
					<div key={filter.attributes.slug} style={{ width: '100%' }}>
						<div className={`${styles['accordion']} ${openState?.[filter.attributes.slug] ? styles['is-active'] : ''}`}>
							<div onClick={(e) => handleToggle(e, filter.attributes.slug)} className={styles['accordion-title']}>
								<span>{filter.attributes.Name}</span>
								<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M10.0001 4.16663V15.8333M4.16675 9.99996H15.8334'
										stroke='#828282'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</div>
							<div className={styles['accordion-content']}>
								{filter?.attributes?.racks?.data?.map((rack: any) => (
									<Link
										key={rack?.attributes?.id}
										href='#'
										onClick={(e) => {
											selectFilters(e, rack?.id);
										}}
										className={styles['item']}>
										{selectedRacks.has(rack?.id?.toString()) ? <Selected /> : <Select />}
										{rack?.attributes?.Name}
									</Link>
								)) ?? <p>no racks</p>}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
