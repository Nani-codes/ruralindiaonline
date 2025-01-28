import Link from 'next/link';
import axios from 'axios';
import dynamic from 'next/dynamic';
import CardWithTabs from './cardwithtabs';
import Faq from './faq';
import Video from './video';

import { useState } from 'react';

import { get, map } from '@/utils';
import { BASE_URL } from '@/config';
import { useRouter } from 'next/router';
import Head from '@/common/Head';
const Pagination = dynamic(() => import('@/common/Library/components/Pagination'), { ssr: false });
const Card = dynamic(() => import('@/common/Library/components/Card'), { ssr: false });
// const CardWithTabs = dynamic(() => import('CardWithTabs'), { ssr: false });

const Header = dynamic(() => import('@/common/Header'), { ssr: false });
const Top = dynamic(() => import('@/common/Library/components/Top'), { ssr: false });

export default function Donate({ data }: any) {
	const { query } = useRouter();

	return (
		<div>
			<Head
				title='Donate'
				description='Donate to  PARI'
				keywords='rural india, archive, online archive, pari, p sainath, sainath,'
			/>
			<Header />

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div className='p-6 bg-gray-200'>
					<div className='Video'>
						<Video />
					</div>
				</div>
			</div>

			<div className='p-6 bg-gray-200'>
				<div className='max-w-md mx-auto'>
					<div className='bg-gray-900'>
						<div>
							<h2 className='text-3xl font-bold text-red-500'>
								We can do this without governments - and will. We can't do it without you
							</h2>
							<p className='text-gray-700 font-bold'>
								PARI is changing the way Indian journalism reports and documents rural India.
							</p>
						</div>
						<div className='flex justify-center items-center mt-4'>{/* Other content here */}</div>
					</div>
				</div>
			</div>

			<div className='p-6 bg-white-200'>
				<Faq />
			</div>

			<div className='p-6 bg-gray-300'>
				<CardWithTabs />
			</div>
		</div>
	);
}

export async function getServerSideProps({ locale, query }: any) {
	const params = {
		'filters[Categories][$eq]': query.tab === 'All' ? undefined : query.tab || undefined,
		'filters[content_types][id][$eq]': query?.type || undefined,
		'filters[racks][id][$eq]': query?.room || undefined,
		locale: query?.locale,
		'pagination[pageSize]': 25,
		'pagination[page]': query?.page || 1,
		populate: 'deep,10',
	};

	const [libraryRes, bannerRes, roomRes, typeRes] = await Promise.all([
		axios({ url: `${BASE_URL}api/archives`, method: 'GET', params }),
		axios({ url: `${BASE_URL}api/library-banner`, method: 'GET', params: { populate: 'deep,10', locale: query?.locale } }),
		axios({ url: `${BASE_URL}api/rooms`, method: 'GET', params: { populate: 'deep,10', locale: query?.locale } }),
		axios({ url: `${BASE_URL}api/content-types`, method: 'GET', params: { populate: 'deep,10', locale: query?.locale } }),
	]);

	if (libraryRes.status !== 200 || bannerRes.status !== 200 || roomRes.status !== 200 || typeRes.status !== 200) {
		throw new Error('Failed to fetch data');
	}

	return {
		props: {
			messages: require(`@/locales/${locale}.json`),
			data: {
				banner: get(bannerRes, 'data.data', []),
				libraries: get(libraryRes, 'data.data', []),
				pagination: get(libraryRes, 'data.meta.pagination', {}),
				rooms: get(roomRes, 'data.data', []),
				types: get(typeRes, 'data.data', []),
			},
			headers: {
				'Cache-Control': 'no-store',
			},
		},
	};
}
