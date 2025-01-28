import styles from './LibraryDetails.module.css';
import moment from 'moment';
import Image from 'next/image';
import { Label, LabelDesc } from '@/component/Text';
import Button from '@/component/Button';
import Tabs from '@/component/Tabs';
import { useState } from 'react';
import Link from 'next/link';

export default function LibraryDetails({ data }: any) {
	const attributes = data?.attributes;
	const [activeTab, setActiveTab] = useState('Focus');
	// console.log(activeTab)
	const copyRight = attributes?.content?.filter((item: any) => item?.__component === 'modular-content.copy-right')[0];
	const focus = attributes?.content?.filter((item: any) => item?.__component === 'modular-content.focus')[0];
	const tags = attributes?.tags?.data?.map((item: any) => `#${item?.attributes?.Title}`.replace(' ', '-'))?.join(', ');

	const factiods = attributes?.content?.filter((factiod: any) => factiod?.__component === 'modular-content.factoids');
	const author = attributes?.content?.filter((author: any) => author?.__component === 'modular-content.authors')[0];

	return (
		<div className={styles.top}>
			<div className={styles.content}>
				<div className={styles.right}>
					<Image
						src={`${process.env.NEXT_PUBLIC_API_URL}${attributes?.Thumbnail?.data?.attributes?.url}`}
						alt={attributes?.slug}
						width='296'
						height='386'
						loading='lazy'
					/>
					<div className={styles.divider} />
					<Label>Published On</Label>
					<LabelDesc className={styles.tags}>{moment(attributes?.createdAt).format('dddd MMMM DD, YYYY')}</LabelDesc>

					<Label>Tags</Label>
					<LabelDesc className={styles.tags}>
						{attributes?.tags?.data?.map((i: any) => {
							return (
								<span key={i.id} className={styles.tag}>
									{i.attributes.Title}
								</span>
							);
						})}
					</LabelDesc>

					<div className={styles.btnWrapper}>
						<Link
							href={`${process.env.NEXT_PUBLIC_API_URL}${attributes?.Document?.data?.attributes?.url}`}
							passHref={true}
							target='_blank'>
							<Button type='secondary'>
								<svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M16.5 16.5H1.5M14 8.16667L9 13.1667M9 13.1667L4 8.16667M9 13.1667V1.5'
										stroke='#B82929'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
								View PDF
							</Button>
						</Link>
						<Button type='secondary'>
							<svg width='18' height='16' viewBox='0 0 18 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M16.3261 8.50617C16.5296 8.3318 16.6313 8.24461 16.6686 8.14086C16.7013 8.0498 16.7013 7.9502 16.6686 7.85914C16.6313 7.75539 16.5296 7.6682 16.3261 7.49383L9.26719 1.44331C8.917 1.14315 8.74191 0.993063 8.59367 0.989386C8.46483 0.986191 8.34177 1.04279 8.26035 1.14269C8.16667 1.25764 8.16667 1.48825 8.16667 1.94948V5.52886C6.38777 5.84007 4.75966 6.74146 3.54976 8.09489C2.23069 9.57043 1.50103 11.48 1.5 13.4591V13.9691C2.37445 12.9157 3.46626 12.0638 4.70063 11.4716C5.78891 10.9495 6.96535 10.6403 8.16667 10.5588V14.0505C8.16667 14.5117 8.16667 14.7424 8.26035 14.8573C8.34177 14.9572 8.46483 15.0138 8.59367 15.0106C8.74191 15.0069 8.917 14.8569 9.26719 14.5567L16.3261 8.50617Z'
									stroke='#B82929'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</Button>
					</div>
				</div>
				<div>
					<h2 className={styles['title']}>
						<svg
							className='rtl:mr-[1rem]'
							width='22'
							height='20'
							viewBox='0 0 22 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M11 19L10.8999 18.8499C10.2053 17.808 9.85798 17.287 9.3991 16.9098C8.99286 16.5759 8.52476 16.3254 8.02161 16.1726C7.45325 16 6.82711 16 5.57482 16H4.2C3.07989 16 2.51984 16 2.09202 15.782C1.71569 15.5903 1.40973 15.2843 1.21799 14.908C1 14.4802 1 13.9201 1 12.8V4.2C1 3.07989 1 2.51984 1.21799 2.09202C1.40973 1.71569 1.71569 1.40973 2.09202 1.21799C2.51984 1 3.07989 1 4.2 1H4.6C6.84021 1 7.96031 1 8.81596 1.43597C9.56861 1.81947 10.1805 2.43139 10.564 3.18404C11 4.03968 11 5.15979 11 7.4M11 19V7.4M11 19L11.1001 18.8499C11.7947 17.808 12.142 17.287 12.6009 16.9098C13.0071 16.5759 13.4752 16.3254 13.9784 16.1726C14.5467 16 15.1729 16 16.4252 16H17.8C18.9201 16 19.4802 16 19.908 15.782C20.2843 15.5903 20.5903 15.2843 20.782 14.908C21 14.4802 21 13.9201 21 12.8V4.2C21 3.07989 21 2.51984 20.782 2.09202C20.5903 1.71569 20.2843 1.40973 19.908 1.21799C19.4802 1 18.9201 1 17.8 1H17.4C15.1598 1 14.0397 1 13.184 1.43597C12.4314 1.81947 11.8195 2.43139 11.436 3.18404C11 4.03968 11 5.15979 11 7.4'
								stroke='#B82929'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
						Library / Gender
					</h2>

					<h1 className={styles.subTitle}>{attributes?.Title}</h1>
					<div className={styles.divider} />
					<Tabs
						active={activeTab}
						tabs={[
							{
								label: 'Focus & Highlights',
								id: 'Focus',
								onClick: () => setActiveTab('Focus'),
							},
							{
								label: 'ok',
								id: 'Credits',
								onClick: () => setActiveTab('Credits'),
							},
						]}
					/>
					<div className={styles.contents}>
						<div className={`${styles['content-item']} ${activeTab === 'Focus' ? styles['content-active'] : ''}`}>
							{activeTab === 'Focus' && (
								<>
									<h1>oka</h1>
									<div
										className={styles.sub_title}
										dangerouslySetInnerHTML={{
											__html: focus?.Focus,
										}}
									/>

									<h1>nice</h1>
									<ol className={styles.sub_title}>
										{factiods?.map((factiod: any) => (
											<div
												dangerouslySetInnerHTML={{
													__html: factiod?.highlights
														?.replaceAll('<li>', '<li><span>')
														.replaceAll('</li>', '</span></li>'),
												}}
												key={factiod?.highlights}
											/>
										))}
									</ol>
								</>
							)}
						</div>

						<div className={`${styles['content-item']} ${activeTab === 'Credits' ? styles['content-active'] : ''}`}>
							{activeTab === 'Credits' && (
								<>
									<h1>Author</h1>
									<div
										className={styles.sub_title}
										dangerouslySetInnerHTML={{
											__html: author?.Authors,
										}}
									/>

									<h1>Copyright</h1>
									<div
										className={styles.sub_title}
										dangerouslySetInnerHTML={{
											__html: copyRight?.CopyRight,
										}}
									/>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
