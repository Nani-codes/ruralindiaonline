import SubHeader from '@/component/MainHeader';
import Head from '@/component/Head';
import ArchiveService from '@/Services/ArchiveService';
import LibraryDetails from './components/LibraryDetails';
import styles from '@/styles/libraryDetails.module.css';
import { Fragment } from 'react';
import Item from './components/Item';
import ItemSmaller from './components/Item/itemsmaller';
import SliderItems from './components/Item/sliderItems';
import Header from '../../common/Header';

export default function Library(props: any) {
	const { data, options, libraries } = props;
	// console.log(data, options, libraries);
	return (
		<div>
			<Head title={data?.attributes?.Title ?? 'Archive Page'} description={data?.attributes?.strap} />
			<Header />

			{/* <SubHeader options={options} /> */}
			{/* <LibraryDetails data={data} libraries={libraries} /> */}
		</div>
	);
}

export async function getServerSideProps({ locale, query }: any) {
	const { slug } = query;
	let data: any = {};
	let libraries: any[] = [];
	// console.log(query, slug);
	const params = {
		populate: 'deep,10',
		locale,
		// 'filters[slug][$eq]': slug,
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
				'Cache-Control': 'no-store',
			},
		},
	};
}
