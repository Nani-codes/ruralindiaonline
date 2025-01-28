import { BackgroundImage, Box, Button, Center, Group, Pagination, Text } from '@mantine/core';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Next, Prev } from '../library';
import { useEffect, useState } from 'react';

import ChildrenService from '@/Services/ChildrenService';
import { GetStaticPaths } from 'next/types';
import Head from 'next/head';
import { Image } from '@mantine/core';
import Link from 'next/link';
import MainHeader from '@/component/ChildHeader';
import { Play } from '@/component/Card';
import ReactPaginate from 'react-paginate';
import styles from '@/styles/Children.module.css';
import { useRouter } from 'next/router';
import Header from '../../common/Header';

export default function ChildrenPaintings(props: any) {
	const [visible, setVisible] = useState(false);
	const { locale, query, push } = useRouter();
	const { page } = query;
	const { data } = props;

	useEffect(() => {
		// console.log('Data', data);
	}, [data]);

	const currentPage = +(page ?? 1);
	const totalPageCount = data?.meta?.pagination?.pageCount || 1;

	const RenderContent = () => (
		<>
			<div className={styles.paintingsMainHeaderContent}>
				<h1>Paintings from Odisha – Collection 1 </h1>
				<h2>The World Through the Art of Adivasi Children</h2>
				<p>
					PARI brings you the first ever archive of paintings by young Adivasi schoolchildren. The work recorded and
					documented here is from students in Classes 3 to 9 in schools in Jajapur and Kendujhar districts of Odisha.{' '}
					<Link
						href='/'
						onClick={(e: any) => {
							e.preventDefault();
							setVisible(true);
						}}>
						Read More...
					</Link>
				</p>
			</div>
			<div className='modal' style={{ display: visible ? 'block' : 'none' }}>
				<div className='modal-content modal-content-lg'>
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
					<div>
						<div className={styles.paintingsMainHeaderContent} style={{ padding: 60 }}>
							<h1>Paintings from Odisha – Collection 1 </h1>
							<h2>The World through the Art of Adivasi Children</h2>
							<p style={{ textAlign: 'left' }}>
								PARI brings you the first ever archive of paintings by young Adivasi schoolchildren. The work recorded
								and documented here is from students in Classes 3 to 9 in schools in Jajapur and Kendujhar districts of
								Odisha.
							</p>
							<br />
							<p style={{ textAlign: 'left' }}>
								We have 111 paintings by 98 Adivasi schoolchildren from 57 schools in this first collection from
								Odisha. The children are in the age group 9 to 15 and studying in Classes 3 to 9. Within the young
								artists, girls outnumber boys 68 to 30. Each painting is accompanied by a 20-30 second video where the
								young artist introduces herself/himself and their work. Most have spoken in Odia, but a few have also
								recorded their videos in Adivasi languages including Ho, Munda and Birhor.
							</p>
							<br />
							<p style={{ textAlign: 'left' }}>
								The 12 tribes the children belong to are: Bathudi, Bhuiya, Bhumij, Gandia, Gond, Ho, Kolha, Mankirdia
								(also spelt as Mankidia – an offshoot of the Birhor tribe), Munda, Samti, Santal and Sounti. Some of
								these are classified as Particularly Vulnerable Tribal Groups.
							</p>
							<br />
							<p style={{ textAlign: 'left' }}>
								These young Adivasi students of limited means and resources, living in some of the remotest tribal
								hamlets in Odisha, worked and produced these vibrant paintings with crayons, pencil colours, cheap
								sketch pens – and just a few managed to use water colours. All the paintings are on ordinary chart
								paper, the only type available to them. This collection in the archive was built in collaboration with
								community-teachers of the non-profit Aspire and the Tata Steel Foundation under their joint 1,000
								schools programme.
							</p>
							<br />
							<p style={{ textAlign: 'left' }}>
								The enormous amount of work that went into it on the ground, from the students and teachers involved,
								is truly inspiring. Aspire’s community-teachers read out to children PARI stories on Adivasis and
								village communities, culture, gender, environment and climate change. The children responded to those
								themes, working on them further, directly relating them to their own lives, families and communities,
								retelling some parts of the stories in their immediate context – and in these beautiful paintings.
							</p>
							<br />
							<p style={{ textAlign: 'left' }}>
								[To know more about the volunteer- teachers&apos; experiences read:{' '}
								<Link href='https://pari.education/teachers-blogs/history-geography-and-science-all-in-one-class/'>
									History, Science and Geography, all in one class
								</Link>
								;{' '}
								<Link href='https://pari.education/teachers-blogs/every-child-connects-to-stories-about-the-environment/'>
									&apos;Every child connects to stories about the environment&apos;
								</Link>
								;{' '}
								<Link href='https://pari.education/teachers-blogs/deep-dive-into-the-climate-crisis/'>
									Deep dive into the climate crisis
								</Link>{' '}
								and{' '}
								<Link href='https://pari.education/teachers-blogs/climate-crisis-buffaloes-elephants-and-people/'>
									Climate crisis: buffaloes, elephants and people
								</Link>
								].
							</p>
							<br />
							<p style={{ textAlign: 'left' }}>
								The 57 schools whose students participated in this endeavour are spread across 9 blocks. Of these, 55
								are in Banspal, Champua, Danagadi, Ghatgaon, Jhumpura, Joda and Sukinda blocks of Jajapur and Kendujhar
								districts. Only four of the total of 98 Adivasi students are hostelites in schools located in Athagad
								and Bhubaneswar blocks of Cuttack and Khordha districts.
							</p>
							<br />
							<p style={{ textAlign: 'left' }}>
								PARI’s tech partners DigiQuanta worked relentlessly to make this archival collection as creative and
								efficient as it is.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.content}>
				{/* <div className=' grid grid-rows-none grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-2 gap-4 xs:px-[2rem] sm:px-[2rem] sm2:px-[2rem] sm3:px-[2rem] md:px-[2rem]  '> */}
				{/* <div> */}
				{data?.data?.map((item: any, i: number) => (
					<Link href={`/childrens-painting/${item?.attributes?.slug}`} key={i} className={styles.item} locale={locale}>
						<div>
							<div className={styles['item-img']}>
								<div style={{ position: 'relative' }}>
									<Image
										src={`${process.env.NEXT_PUBLIC_API_URL}${item?.attributes?.Painting?.data?.attributes?.url}`}
										alt={item?.attributes?.slug}
										w='auto'
										mx='auto'
										h={250}
									/>
									<div className={styles.overlay} />
								</div>
								{/* <div className={styles.childrenImages}> */}
								<Link href={`/childrens-painting/${item?.attributes?.slug}/1`} key={i} locale={locale}>
									{/* <Play />

										<Image
											src={`${process.env.NEXT_PUBLIC_API_URL}${item?.attributes?.ChildPhoto?.data?.attributes?.url}`}
											alt={item?.attributes?.slug}
											width={100}
											height={100}
											className={styles['img']}
										/> */}
									<Box
										maw={70}
										mah={90}
										mx='auto'
										style={{
											position: 'absolute',
											zIndex: '2',
											right: '15px',
											top: '10px',
											border: '1px solid #FFFFFF',
											borderRadius: '8px',
										}}>
										<BackgroundImage
											src={`${process.env.NEXT_PUBLIC_API_URL}${item?.attributes?.ChildPhoto?.data?.attributes?.url}`}
											radius='8px'>
											<Center p='md'>
												<Play />
											</Center>
										</BackgroundImage>
									</Box>
								</Link>
								{/* </div> */}
							</div>
							<p className={styles.articleTitle}>{item?.attributes?.Name}</p>
						</div>
					</Link>
				))}
			</div>
			{/* <div className={styles.pagination}>
                <ReactPaginate
                    breakLabel='...'
                    nextLabel={<Next />}
                    onPageChange={({ selected }) =>
                        push({
                            pathname: `/childrens-paintings/${selected + 1}`,
                        })
                    }
                    pageRangeDisplayed={5}
                    pageCount={data?.meta?.pagination?.pageCount}
                    forcePage={+(page ?? 1) - 1}
                    previousLabel={<Prev />}
                    containerClassName='pagination'
                />
            </div> */}

			<Group justify='center' py={'xl'}>
				<Button
					variant='outline-hover-filled'
					color='#B82929'
					style={{ border: '2px solid' }}
					radius={'xl'}
					leftSection={<MdOutlineKeyboardArrowLeft size={20} />}
					onClick={() => push(`/childrens-paintings/${currentPage - 1}`)}
					disabled={currentPage === 1}>
					Previous
				</Button>

				<Pagination
					variant='outline-hover-filled'
					color='#B82929'
					total={totalPageCount}
					value={currentPage}
					onChange={(newPage) =>
						push({
							pathname: `/childrens-paintings/${newPage}`,
						})
					}
					withControls={false}
				/>

				<Button
					variant='outline-hover-filled'
					color='#B82929'
					style={{ border: '2px solid' }}
					radius={'xl'}
					rightSection={<MdOutlineKeyboardArrowRight size={20} />}
					onClick={() => push(`/childrens-paintings/${currentPage + 1}`)}
					disabled={currentPage === totalPageCount}>
					Next
				</Button>
			</Group>
		</>
	);

	return (
		<>
			<Head>
				<title>
					The World through the Art of Adivasi Children - People&#39;s Archive of Rural India People&#39;s Archive of Rural
					India
				</title>
				<meta name='keywords' content='rural india, archive, online archive, pari, p sainath, sainath, '></meta>
				<meta
					name='description'
					content='A journalism website reporting the stories of 833 million rural Indians. An archive of the living past, a journal of the present, a textbook of the future.'
				/>
			</Head>

			{/* Header */}
			<Header />
			{/* <MainHeader active='childrens-paintings' /> */}
			<div className={styles['header-top']} />
			<div className={styles.parentWrapper}>
				<RenderContent />
			</div>
		</>
	);
}

export async function getServerSideProps({ locale, context }: any) {
	let data: any[] = ['no'];
	const params = {
		populate: 'deep',
		locale: context?.locale,
		'pagination[page]': context?.params?.page || 1,
		'pagination[pageSize]': 24,
		sort: 'Title',
	};
	const response = await ChildrenService.getAllChildrenPosts(params);
	// // console.log("Children's Response", response);
	if (response.isOk()) {
		const { value } = response;
		// console.log('value ? ', value.data);
		data = value ?? [];
	}

	return {
		props: {
			messages: require(`@/locales/${locale}.json`),
			data,
			headers: {
				'Cache-Control': 'no-store',
			},
		},
	};
}
