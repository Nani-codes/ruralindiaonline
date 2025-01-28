import styles from '../../../../styles/library.module.css';
import Link from 'next/link';
import { Selected, Select } from '../..';
import Button from '@/component/Button';
import { useState } from 'react';

export default function Filters({ type, types, selectTypes, room, rooms, selectFilters, navigate, removeFilter }: any) {
	// console.log(rooms, 'rooms');

	const [open, setOpen] = useState<any>({});

	const toggle = (e: any, id: any) => {
		e.preventDefault();
		setOpen((prev: any) => ({
			...prev,
			[id]: !prev?.[id],
		}));
	};

	return (
		<div>
			{navigate ? (
				<>
					<div className={styles['filter-header']}>
						<h1>Filters</h1>
						<div>
							<Button type='secondary' label='Remove fiters' className={`${styles.bnt}`} onClick={removeFilter} />
							{/* <Link href="/library?page=1"  className={styles['remove-filters']}>remove fiters</Link> */}
						</div>
					</div>
					<div className={styles.divider} />
				</>
			) : null}

			<div className={styles['filter']}>
				<div className={styles['header']}>
					<h1>
						<svg width='16' height='20' viewBox='0 0 16 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M1 5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H10.2C11.8802 1 12.7202 1 13.362 1.32698C13.9265 1.6146 14.3854 2.07354 14.673 2.63803C15 3.27976 15 4.11984 15 5.8V19L8 15L1 19V5.8Z'
								stroke='#B82929'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
						Content Type
						<span>0</span>
					</h1>
				</div>

				<div className={styles['filter-item']}>
					{types?.map((filter: any) => (
						<Link
							key={filter?.attributes?.vuid}
							href='/'
							onClick={(e) => selectTypes(e, filter?.id?.toString())}
							className={styles['item']}>
							{(type as string)?.split(',')?.includes(filter?.id?.toString()) ? <Selected /> : <Select />}

							{filter?.attributes?.contentType}
						</Link>
					))}
				</div>
			</div>

			<div className={styles['filter']}>
				<div className={styles['header']}>
					<h1>
						<svg width='16' height='20' viewBox='0 0 16 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M1 5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H10.2C11.8802 1 12.7202 1 13.362 1.32698C13.9265 1.6146 14.3854 2.07354 14.673 2.63803C15 3.27976 15 4.11984 15 5.8V19L8 15L1 19V5.8Z'
								stroke='#B82929'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
						Rooms
						<span>0</span>
					</h1>
				</div>

				<div className={styles['filter-item']}>
					{rooms?.map((filter: any) => (
						<div key={filter?.attributes?.vuid} style={{ width: '100%' }}>
							<div className={`${styles['accordion']} ${open?.[filter?.attributes?.vuid] ? styles['is-active'] : ''}`}>
								<Link
									href='/'
									onClick={(e) => toggle(e, filter?.attributes?.vuid)}
									className={styles['accordion-title']}>
									<p>{filter?.attributes?.Name}</p>
									<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M10.0001 4.16663V15.8333M4.16675 9.99996H15.8334'
											stroke='#828282'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</Link>
								<div className={styles['accordion-content']}>
									{filter?.attributes?.racks?.data?.map((rack: any) => (
										<Link
											key={rack?.attributes?.vuid}
											href='/'
											onClick={(e) => selectFilters(e, rack?.id?.toString())}
											className={styles['item']}>
											{(room as string)?.split(',')?.includes(rack?.id?.toString()) ? <Selected /> : <Select />}

											{rack?.attributes?.Name}
										</Link>
									)) ?? <p>no racks</p>}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
