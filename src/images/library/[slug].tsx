// import SubHeader from '@/component/MainHeader';
import Head from '@/component/Head';
import ArchiveService from '@/Services/ArchiveService';
import LibraryDetails from './components/LibraryDetails';
import styles from '@/styles/libraryDetails.module.css';
import { Fragment } from 'react';
import Item from './components/Item';
import Header from '@/common/Header';

export default function Library(props: any) {
	const { data, options, libraries } = props;

	return (
		<div>
			<Head title={data?.attributes?.Title ?? 'Archive Page'} description={data?.attributes?.strap} />
			{/* <SubHeader options={options} /> */}
			<Header />
			<LibraryDetails data={data} />

			<div className={`${styles.relatedArticles}`}>
				<h3 className={`${styles.sectionTitle}`}>
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
				<h1>Related reports you may find useful</h1>
			</div>

			<div className={styles.row}>
				{libraries?.map((item: any, i: number) => (
					<Fragment key={`/library/${item?.attributes?.slug}`}>
						<Item item={item} />
					</Fragment>
				))}
			</div>
		</div>
	);
}

export async function getStaticProps({ params, locale }: any) {
	const { slug } = params;  // `params` contains the slug from the dynamic route
	let data: any = {};
	let libraries: any[] = [];

	const params = {
		populate: 'deep,10',
		locale,
		// 'filters[slug][$eq]': slug, // Uncomment if needed to fetch based on slug
	};

	const response = await ArchiveService.getArchive(params);

	if (response.isOk()) {
		const { value } = response;
		data = value.data?.[0] ?? {};
		const p = {
			populate: 'deep,10',
			'filters[authors][id][$eq]': data?.attributes?.authors?.[0]?.id,
		};

		const res = await ArchiveService.getArchive(p);
		if (res.isOk()) {
			const { value } = res;
			libraries = value.data ?? [];
		}
	}

	return {
		props: {
			messages: require(`@/locales/${locale}.json`),
			data,
			libraries,
			headers: {
				'Cache-Control': 'no-store',  // Optional: you can set caching headers if necessary
			},
		},
		revalidate: 60, // Optional: Rebuild the page every 60 seconds if needed
	};
}

