import Image from 'next/image';
import styles from './Focus.module.css';
import { useCallback, useEffect, useState } from 'react';
import MapService from '@/Services/MapService';
import { get } from '@/utils';
import moment from 'moment';
import Link from 'next/link';
import { Label, RegularText } from '@/component/Text';

// ...
// ... (other imports)

export default function Item(props: any) {
	// console.log('from item', props);

	let title = '';
	let description = '';
	let url = '';

	// Check the structure of props.item and extract properties accordingly
	if (props.item) {
		title = get(props.item, 'title', '');
		description = get(props.item, 'description', '');
		url = get(props.item, 'image.data.attributes.url', '');
	}

	const Authors = get(props.thisWeekOnPari, 'attributes.Authors', []);
	const localizations = get(props.thisWeekOnPari, 'attributes.localizations', []);
	const Location = get(props.thisWeekOnPari, 'attributes.Location');
	const Strap = get(props.thisWeekOnPari, 'attributes.Strap');
	const type = get(props.thisWeekOnPari, 'attributes.type');
	const data = get(props.thisWeekOnPari, 'attributes.categories.data', '');

	return (
		<div className={styles['card']}>
			{props.isLibrary && props.index === 0 ? (
				<div
					className={styles.lib}
					style={{
						backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${url})`,
						height: '300px', // Set the desired height
					}}>
					{/* <h1>{title}</h1> */}
					{/* <div
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          /> */}
				</div>
			) : (
				<div
					className={styles.lib}
					style={{
						backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${url})`,
						height: '300px', // Set the desired height
					}}>
					{/* <h1>{title}</h1> */}
					{/* <div
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        /> */}
				</div>
			)}

			{!props.isLibrary ? (
				<>
					<div style={{ width: '80%' }}>
						{/* <RegularText>
              <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </RegularText> */}
						<Label className={styles['date']}>
							{`View the project`}
							<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path d='M1 8H15M15 8L8 1M15 8L8 15' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
							</svg>
						</Label>
					</div>
				</>
			) : null}
		</div>
	);
}
