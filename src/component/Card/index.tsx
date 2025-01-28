import MapService from '@/Services/MapService';
import { getAddressObject } from '@/utils/index';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import styles from './Card.module.css';

export default function Card(props: any) {
	const { locale } = useRouter();
	const [visible, setVisible] = useState(false);
	const {
		attributes: {
			Authors,
			Title,
			createdAt,
			Strap,
			time_to_read,
			Location,
			type,
			Cover_image: {
				data: {
					attributes: { url },
				},
			},
		},
	} = props.info;
	const [city, setCity] = useState('');

	let authorsInfo = Authors.find((i: any) => i?.author_role?.data?.attributes?.Name == 'Author');

	const getCity = useCallback(async () => {
		if (Location) {
			const loc = JSON.parse(Location);
			if (loc) {
				const result = await MapService.getAddress(`${loc.lat},${loc.lng}`);
				if (result.isOk()) {
					const { value } = result;
					const address = getAddressObject(value?.results?.[0]?.address_components ?? []);
					if (address) {
						setCity(address?.city);
					}
				}
			}
		}
	}, [Location]);

	useEffect(() => {
		getCity();
	}, [getCity]);

	return (
		<div className={`${styles.item} ${props.containerStyle}`}>
			<div style={{ position: 'relative' }}>
				<Link href={props.path ?? ''} className={styles.link} locale={locale}>
					<div style={{ position: 'relative' }}>
						<Image
							className={props.img}
							src={`${process.env.NEXT_PUBLIC_API_URL}${url}`}
							alt={Strap}
							width='500'
							height='500'
							loading='lazy'
						/>
						{type === 'video' ? (
							<div className={styles.svg}>
								<Play />
							</div>
						) : null}
					</div>
					<div className={styles.content}>
						{props?.isNew ? (
							<div className={styles.new}>
								<span className={styles.label}>New ON PARI</span>
								{moment.duration(time_to_read).asMinutes()} min Read
							</div>
						) : null}
						<h1 className={props.titleStyle ?? styles.title}>{Title}</h1>
						{props.type === 'video' ? (
							<p className={styles.strap}>{Strap}</p>
						) : (
							<p>{authorsInfo?.author?.data?.attributes?.Name}</p>
						)}
					</div>
				</Link>
				{props?.info?.attributes?.is_student ? (
					<button
						// href="#"
						className={styles.student}
						onClick={() => setVisible(true)}>
						<StudentContribution />
					</button>
				) : null}
			</div>
			<div className={styles.footer}>
				<Link href={props.path ?? ''} locale={locale}>
					<span className={props.ellipsis}>{city}</span>
					{` • ${moment(createdAt).format('dddd MMMM DD, YYYY')}`}
					<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path d='M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z' />
					</svg>
				</Link>
			</div>
			<div className='modal' style={{ display: visible ? 'block' : 'none' }}>
				<div className='modal-content'>
					<div className='modal-header'>
						<button onClick={() => setVisible(false)} className='close'>
							<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M19.3346 2.5465L17.4546 0.666504L10.0013 8.11984L2.54797 0.666504L0.667969 2.5465L8.1213 9.99984L0.667969 17.4532L2.54797 19.3332L10.0013 11.8798L17.4546 19.3332L19.3346 17.4532L11.8813 9.99984L19.3346 2.5465Z'
									fill='#B82929'
								/>
							</svg>
						</button>
					</div>
					<div className={styles['student-content']}>
						<svg width='88' height='72' viewBox='0 0 88 72' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M16 40.72V56.72L44 72L72 56.72V40.72L44 56L16 40.72ZM44 0L0 24L44 48L80 28.36V56H88V24L44 0Z'
								fill='#B82929'
							/>
						</svg>

						<h2>student contributed piece</h2>
						<h1 className={styles['student-title']}>{props?.info?.attributes?.student_contribution?.student_name}</h1>
						<div
							dangerouslySetInnerHTML={{
								__html: props?.info?.attributes?.student_contribution?.description,
							}}
						/>
						<div className={styles.divider}>
							<Link href='/' className={styles['student-anchor']} locale={locale}>
								See More from this region
								<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
									<path d='M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z' />
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const StudentContribution = () => (
	<svg width='54' height='54' viewBox='0 0 54 54' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<g filter='url(#filter0_d_688_5609)'>
			<rect x='7' y='7' width='40' height='40' rx='20' fill='#B82929' shapeRendering='crispEdges' />
			<path
				d='M21.1663 27.9833V31.3167L26.9997 34.5L32.833 31.3167V27.9833L26.9997 31.1667L21.1663 27.9833ZM26.9997 19.5L17.833 24.5L26.9997 29.5L34.4997 25.4083V31.1667H36.1663V24.5L26.9997 19.5Z'
				fill='white'
			/>
		</g>
		<defs>
			<filter
				id='filter0_d_688_5609'
				x='0.333333'
				y='0.333333'
				width='53.3333'
				height='53.3333'
				filterUnits='userSpaceOnUse'
				colorInterpolationFilters='sRGB'>
				<feFlood floodOpacity='0' result='BackgroundImageFix' />
				<feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha' />
				<feOffset />
				<feGaussianBlur stdDeviation='3.33333' />
				<feComposite in2='hardAlpha' operator='out' />
				<feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
				<feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_688_5609' />
				<feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_688_5609' result='shape' />
			</filter>
		</defs>
	</svg>
);

export const Play = () => (
	<svg width='55' height='48' viewBox='0 0 55 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<ellipse cx='27.4998' cy='24' rx='26.5574' ry='24' fill='#B82929' />
		<path d='M38.124 24.0004L22.1896 32.3142L22.1896 15.6865L38.124 24.0004Z' fill='white' />
	</svg>
);
