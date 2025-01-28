import { BASE_URL, IMAGE_URL } from '@/config';
import { Button, Card, Divider, Image, Stack, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

import { FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';
import axios from 'axios';
import dayjs from 'dayjs';
import { RightArrowIcon } from '@/common/@the-source/Icon';
import { get } from '@/utils';

type story = {
	id: number;
	attributes: {
		Title: string;
		slug: string;
		location?: {
			data?: {
				attributes: {
					name: string;
					district:string;
					state:string;
				};
			};
		};
		publishedAt: string;
		length:any;
		Authors: {
			author_role: {
				data: {
					attributes: {
						Name: string;
					};
				};
			};
			author_name: {
				data: {
					attributes: {
						Name: string;
					};
				};
			};
		}[];
		Cover_image: {
			data: {
				attributes: {
					url: string;
				};
			};
		};
	};
};

const BannerCard = ({ id }: { id: number }) => {
	const [data, setData] = useState<story>();
	useEffect(() => {
		let isRefresh = true;
		if (isRefresh) {
			axios
				.get(
					`${BASE_URL}api/article/${id}?populate[location][populate]=*&populate[Authors][populate]=*&populate[Cover_image][populate]=*`,
				)
				.then((res) => {
					setData(res?.data?.data);
				});
		}
		return () => {
			isRefresh = false;
		};
	}, [id]);
	// let location = data?.attributes?.location?.data?.attributes?.name || '';
	const district = data?.attributes?.location?.data?.attributes?.district
	const state = data?.attributes?.location?.data?.attributes?.state
	const createdAt = get(data, 'attributes.Original_published_date') || get(data, 'attributes.publishedAt');
	const localDate = dayjs(createdAt).format('MMM DD, YYYY');
	const MAX_NAME_LENGTH = 15; // Define a maximum length for the name
	let displayText;

	return (
		<Link
			className=' min-w-[272px] max-w-[272px] rounded-[16px]  bg-white dark:bg-primary-pari-black font-sans flex flex-col'
			href={`${process.env.NEXT_PUBLIC_BASE_URL}/article/` + data?.attributes?.slug}>
			<Card
				p={0}
				shadow='xs'
				radius='1rem'
				withBorder
				h={{
					xs: '25em',
					sm: '22.6em',
					sm2: '22.6em',
					sm3: '22.6em',
					md: '22.6em',
					lg: '22.6em',
					xl: '22.6em',
					xl2: '22.6em',
					xl3: '28em',
				}}>
				<Card.Section>
					<Image
						h={{ base: '160px', sm3: '160px', md: '160px', lg: '160px', xl: '160px', xl2: '160px' }}
						src={IMAGE_URL + data?.attributes?.Cover_image?.data?.attributes?.url}
						alt={data?.attributes?.Title}
					/>
				</Card.Section>
				<Stack align='flex-start' justify='space-between' h='100%' p='24px'>
					<Title
						h={{
							xs: '3.5em',
							sm: '2.5em',
							sm2: '2.5em',
							sm3: '2.5em',
							md: '2.5em',
							lg: '2.5em',
							xl: '2.5em',
							xl2: '2.5em',
						}}
						style={{
							fontSize: '18px',
							fontWeight: '600',
							letterSpacing: '-0.045rem',
							lineHeight: '1.575rem',
							fontFamily: 'Noto Sans',
						}}
						c={'#202020'}
						lineClamp={2}>
						{data?.attributes?.Title}
					</Title>
					<div>
						<Text
							c={'#2F80ED'}
							style={{
								fontSize: '15px',
								fontStyle: 'normal',
								fontWeight: 500,
								letterSpacing: '-0.0375rem',
								lineHeight: '1.59375rem ',
								fontFamily: 'Noto Sans',
							}}>
							{data?.attributes?.Authors[0]?.author_name?.data?.attributes?.Name}
						</Text>
						<Text
							c={'#4F4F4F'}
							style={{
								fontSize: '12px',
								fontStyle: 'normal',
								fontWeight: 500,
								letterSpacing: '-0.0225rem',
								lineHeight: '1.2rem',
								fontFamily: 'Noto Sans',
							}}>
							{data?.attributes?.Authors[0]?.author_role?.data?.attributes?.Name}
						</Text>
					</div>

					<Divider size='sm' w='100%' />

					{/* <Button
						variant='transparent'
						radius='lg'
						c={'#2F80ED'}
						rightSection={<FaArrowRight size={14} />}
						style={{
							fontSize: '13px',
							fontStyle: 'normal',
							fontWeight: 600,
							paddingLeft: 0,
							letterSpacing: '-0.01625rem',
							textTransform: 'uppercase',
							lineHeight: 'normal',
							fontFamily: 'Noto Sans',
						}}>
						{data?.attributes?.location?.data?.attributes?.name}
						{' • '}
						{dayjs(data?.attributes?.publishedAt).format('MMM D, YYYY')}
					</Button> */}
					<div
						className='
					text-[#2F80ED] font-sans text-[0.8125rem] not-italic font-semibold	 dark:text-white
					leading-normal tracking-[-0.01625rem]

                        flex gap-[8px] items-center
                        uppercase
                         dark:gray-7
                        w-full overflow-hidden
                    '>
						{/* {loctionInfo ? `${cityAndState} • ${localDate}` : `${cityAndState} • ${localDate}`} */}
						{district}, {state} • {localDate}
						<RightArrowIcon isStudent={true} />
					</div>
				</Stack>
			</Card>
		</Link>
	);
};

export default BannerCard;
