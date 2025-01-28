import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import Carousel from '@itseasy21/react-elastic-carousel';
import ChildrenService from '@/Services/ChildrenService';
import { GetStaticPaths } from 'next/types';
import Head from '@/component/Head';
import Image from 'next/image';
import SliderControlls from '../SliderControlls';
import SubHeader from '@/component/ArticleHeader';
import styles from '../Children.module.css';
import { useRouter } from 'next/router';
import { BASE_URL } from '@/config';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function ChildrenIndividual(props: any) {
	const [visible, setVisible] = useState(false);
	const [changed, setChanged] = useState(true);
	const [_conpleted, setConpleted] = useState(0);
	const ref = useRef<any>(null);
	const refSlider = useRef<any>(null);
	const { data } = props;
	const router = useRouter();
	const { slider } = router.query;
	const [opened, { open, close }] = useDisclosure(false);

	useEffect(() => {
		setTimeout(() => {
			refSlider?.current?.goTo(+(slider || 0));
		}, 10);
	}, [slider]);

	const Controlls = ({ zoomIn, zoomOut, resetTransform }: any) => (
		<div className={styles.tools}>
			<button onClick={() => zoomIn()}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='28'
					height='28'
					viewBox='0 0 24 24'
					fill='none'
					stroke='#b82929'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'>
					<circle cx='11' cy='11' r='8'></circle>
					<line x1='21' y1='21' x2='16.65' y2='16.65'></line>
					<line x1='11' y1='8' x2='11' y2='14'></line>
					<line x1='8' y1='11' x2='14' y2='11'></line>
				</svg>
			</button>
			{/* <button onClick={() => resetTransform()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="feather feather-x-circle"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </button> */}
			<button onClick={() => zoomOut()}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='28'
					height='28'
					viewBox='0 0 24 24'
					fill='none'
					stroke='#b82929'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'>
					<circle cx='11' cy='11' r='8'></circle>
					<line x1='21' y1='21' x2='16.65' y2='16.65'></line>
					<line x1='8' y1='11' x2='14' y2='11'></line>
				</svg>
			</button>
		</div>
	);

	return (
		<>
			<Head title={data?.attributes?.Title ?? 'Adivasi'} description={data?.attributes?.Medium} />
			<SubHeader title='Library' location={data?.attributes?.Location} />

			<div className={styles.top}>
				<div id='child' className={styles['children-carousel']}>
					<Carousel
						isRTL={false}
						ref={refSlider}
						pagination={false}
						showArrows={false}
						enableMouseSwipe={false}
						enableSwipe={false}
						itemPadding={[0, 0]}>
						<div className={`${styles.item}`}>
							<button onClick={open} className='close'>
								{/* {data?.attributes?.Painting?.data?.attributes?.url ? ( */}

								<Image
									src={`${BASE_URL}${data?.attributes?.Painting?.data?.attributes?.url}`}
									alt={data?.attributes?.slug}
									width='500'
									height='392'
									priority={true}
									ref={ref}
									onLoadingComplete={() => setConpleted(1)}
								/>
								{/* ) : null} */}
							</button>
						</div>
						{data?.attributes?.videos?.map((video: any) => (
							<div className={styles.item} key={video?.VideoID + video?.id}>
								<iframe
									src={`https://www.youtube.com/embed/${video?.VideoID}`}
									// allowFullScreen
								></iframe>
							</div>
						))}
					</Carousel>

					<SliderControlls
						refSlider={refSlider}
						setChanged={setChanged}
						changed={changed}
						src={`${BASE_URL}${data?.attributes?.Painting?.data?.attributes?.url}`}
						src2={`${BASE_URL}${data?.attributes?.ChildPhoto?.data?.attributes?.url}`}
					/>
				</div>

				<div>
					<div className={styles.resource}>
						<div>
							<h1>Name</h1>
							<p>{data?.attributes?.Name}</p>
						</div>
						<div>
							<h1>Age</h1>
							<p>{data?.attributes?.Age}</p>
						</div>
						<div>
							<h1>Class</h1>
							<p>{data?.attributes?.Class}</p>
						</div>
						<div>
							<h1>School Name</h1>
							<p>{data?.attributes?.School}</p>
						</div>
						<div>
							<h1>School Block</h1>
							<p>{data?.attributes?.Block}</p>
						</div>
						<div>
							<h1>School District</h1>
							<p>{data?.attributes?.District}</p>
						</div>
						<div>
							<h1>School State</h1>
							<p>{data?.attributes?.State}</p>
						</div>
						<div>
							<h1>Tribe</h1>
							<p>{data?.attributes?.Tribe}</p>
						</div>
						<div>
							<h1>Medium</h1>
							<p>{data?.attributes?.Medium}</p>
						</div>
						<div>
							<h1>Date</h1>
							<p>{data?.attributes?.Year}</p>
						</div>
						<div>
							<h1>Project Teacher</h1>
							<p>{data?.attributes?.ProjectTeacher}</p>
						</div>
						<blockquote className={styles.quotation}>{data?.attributes?.Translation}</blockquote>
					</div>
				</div>
			</div>

			<Modal opened={opened} onClose={close} fullScreen withCloseButton={false}>
				<div className='modal-content modal-content-lg'>
					<div>
						<div className={`${styles.item}`}>
							<button className={`${styles.button}`} onClick={close}>
								<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M19.3346 2.5465L17.4546 0.666504L10.0013 8.11984L2.54797 0.666504L0.667969 2.5465L8.1213 9.99984L0.667969 17.4532L2.54797 19.3332L10.0013 11.8798L17.4546 19.3332L19.3346 17.4532L11.8813 9.99984L19.3346 2.5465Z'
										fill='#B82929'
									/>
								</svg>
							</button>
							<TransformWrapper>
								{({ zoomIn, zoomOut, resetTransform, ...rest }: any) => (
									<>
										<Controlls {...{ zoomIn, zoomOut, resetTransform, ...rest }} />
										<TransformComponent>
											{data?.attributes?.Painting?.data?.attributes?.url ? (
												<Image
													src={`${BASE_URL}${data?.attributes?.Painting?.data?.attributes?.url}`}
													alt={data?.attributes?.slug}
													width='500'
													height='392'
													loading='lazy'
													className={`${styles.img}`}
												/>
											) : null}
										</TransformComponent>
									</>
								)}
							</TransformWrapper>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}

export async function getServerSideProps(context: any) {
	let data: any = {};
	const response = await ChildrenService.getChildrenBySlug(context?.params?.slug);
	if (response.isOk()) {
		const { value } = response;
		// console.log('value', value.data?.[0]);
		data = value.data?.[0] ?? {};
	}
	return {
		props: { data },
	};
}
