'use client';

import {
	ActionIcon,
	Box,
	Button,
	Card,
	Collapse,
	Divider,
	Group,
	Pill,
	SimpleGrid,
	Space,
	Stack,
	Text,
	Title,
	useMantineColorScheme,
} from '@mantine/core';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import { useDisclosure, useScrollIntoView, useViewportSize } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useLnStyles, useSizeModifier } from '@/store/language_styles_store';

import { BASE_URL } from '@/config';
import Link from 'next/link';
import axios from 'axios';
import dayjs from 'dayjs';
import { get } from '@/utils';
import Author from '@/pages/article/components/Author';
import { duration } from 'moment';

export default function ArticleTitle({ article, categories, scrollToview }: any) {
	const { width } = useViewportSize();
	const [opened, { toggle }] = useDisclosure(true);
	const button = get(article, 'attributes.seeallcredits');
	const createdAt = get(article, 'attributes.Original_published_date') || get(article, 'attributes.publishedAt');
	const ArtTitle = get(article, 'attributes.Title');
	const Strap = get(article, 'attributes.Strap');
	const location = get(article, 'attributes.location', '');
	const Authors = get(article, 'attributes.Authors', []) as Author[];
	const authorList = Authors.map((author) => {
		const name = author.author_name.data?.attributes?.Name;
		const role = author.author_role.data?.attributes?.Name;
		const id = author.id;
		return { name, role, id };
	});	
	const localDate = dayjs(createdAt).format('MMM DD, YYYY');
	const { colorScheme } = useMantineColorScheme();
	const [ln_styles] = useLnStyles();
	const [size_modifier] = useSizeModifier();

	return (
		<Box
			w={{ base: '100%', sm: '90vw' }}
			mx='auto'
			// mt={{ base: '-3rem', md: '-6.8rem' }}
			mt={opened ? { base: '0rem', md: '-6.8rem' } : { base: '-1.4rem', md: '-2rem' }}
			px={{ base: '0', md: 'sm', xl: 'xl' }}
			style={{ borderRadius: '1rem' }}>
			{!opened && (
				<Group justify='right' px={{ base: 'sm', md: 'sm', xl: 'xl' }}>
					<ActionIcon
						variant='filled'
						color='#B82929'
						aria-label='Expand'
						size={width >= 1024 ? '3.5rem' : '2.5rem'}
						style={{ borderRadius: '1rem' }}
						onClick={toggle}>
						<FiPlusCircle width='24px' height={'24px'} />
					</ActionIcon>
				</Group>
			)}
			<Collapse in={opened} px={{ base: '0', md: 'md', xl: 'xl' }}>
				<Card p={0} radius={'1rem'}>
					<Group justify='right'>
						<ActionIcon
							variant='white'
							color='#B82929'
							aria-label='Collapse'
							size={width >= 1024 ? (width >= 2560 ? '4rem' : '3.5rem') : '2.5rem'}
							style={{ borderRadius: '1rem' }}
							onClick={toggle}>
							<FiMinusCircle width='24px' height={'24px'} />
						</ActionIcon>
					</Group>

					<Card
						px={{ base: '2rem', sm: '2rem', md: '2.5rem', lg: '4.5rem', xl: '5.5rem', xl2: '5rem' }}
						pb={{ base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '3.5rem', xl: '3.5rem', xl2: '4rem' }}
						pt={0}>
						<Group gap={8}>
							<Text
								c={'#B82929'}
								style={{
									fontWeight: 600,
									fontSize: '13px',
									textTransform: 'uppercase',
									letterSpacing: '-0.01625rem',
								}}>
								{location?.data?.attributes?.district}, {location?.data?.attributes?.state}
							</Text>
							<Text
								c={'#828282'}
								style={{
									fontWeight: 600,
									fontSize: '13px',
									textTransform: 'uppercase',
									letterSpacing: '-0.01625rem',
								}}>
								{localDate}
							</Text>
						</Group>

						<Group
							mt={{
								base: `${ln_styles?.xs?.IntroCard_Spacing?.introCard_Category_margin}rem`,
								sm: `${ln_styles?.sm?.IntroCard_Spacing?.introCard_Category_margin}rem`,
								md: `${ln_styles?.md?.IntroCard_Spacing?.introCard_Category_margin}rem`,
								lg: `${ln_styles?.lg?.IntroCard_Spacing?.introCard_Category_margin}rem`,
								xl: `${ln_styles?.xl?.IntroCard_Spacing?.introCard_Category_margin}rem`,
								xl2: `${ln_styles?.xl2?.IntroCard_Spacing?.introCard_Category_margin}rem`,
							}}
							gap={'0.5rem'}>
							{categories?.map((category: any) => (
								<Pill component={Link} href={`/articles?&categoryIds=${category.id}`} key={category.id}>
									{category.attributes.Title}
								</Pill>
							))}
						</Group>
						<Title
							mt={{
								base: `${ln_styles?.xs?.IntroCard_Spacing?.introCard_title_margin}rem`,
								sm: `${ln_styles?.sm?.IntroCard_Spacing?.introCard_title_margin}rem`,
								md: `${ln_styles?.md?.IntroCard_Spacing?.introCard_title_margin}rem`,
								lg: `${ln_styles?.lg?.IntroCard_Spacing?.introCard_title_margin}rem`,
								xl: `${ln_styles?.xl?.IntroCard_Spacing?.introCard_title_margin}rem`,
								xl2: `${ln_styles?.xl2?.IntroCard_Spacing?.introCard_title_margin}rem`,
							}}
							c={colorScheme === 'light' ? '#202020' : '#FFFFFF'}
							ff={{
								base: ln_styles?.xs?.Title?.font_family,
								sm: ln_styles?.sm?.Title?.font_family,
								md: ln_styles?.md?.Title?.font_family,
								lg: ln_styles?.lg?.Title?.font_family,
								xl: ln_styles?.xl?.Title?.font_family,
								xl2: ln_styles?.xl2?.Title?.font_family,
							}}
							fz={{
								base: (ln_styles?.xs?.Title?.font_size || 1) * size_modifier + 'rem',
								sm: (ln_styles?.sm?.Title?.font_size || 1) * size_modifier + 'rem',
								md: (ln_styles?.md?.Title?.font_size || 1) * size_modifier + 'rem',
								lg: (ln_styles?.lg?.Title?.font_size || 1) * size_modifier + 'rem',
								xl: (ln_styles?.xl?.Title?.font_size || 1) * size_modifier + 'rem',
								xl2: (ln_styles?.xl2?.Title?.font_size || 1) * size_modifier + 'rem',
							}}
							lh={{
								base: ln_styles?.xs?.Title?.line_height + '%',
								sm: ln_styles?.sm?.Title?.line_height + '%',
								md: ln_styles?.md?.Title?.line_height + '%',
								lg: ln_styles?.lg?.Title?.line_height + '%',
								xl: ln_styles?.xl?.Title?.line_height + '%',
								xl2: ln_styles?.xl2?.Title?.line_height + '%',
							}}
							fw={{
								base: ln_styles?.xs?.Title?.font_weight,
								sm: ln_styles?.sm?.Title?.font_weight,
								md: ln_styles?.md?.Title?.font_weight,
								lg: ln_styles?.lg?.Title?.font_weight,
								xl: ln_styles?.xl?.Title?.font_weight,
								xl2: ln_styles?.xl2?.Title?.font_weight,
							}}
							lts={{
								base: ln_styles?.xs?.Title?.letter_spacing + 'rem',
								sm: ln_styles?.sm?.Title?.letter_spacing + 'rem',
								md: ln_styles?.md?.Title?.letter_spacing + 'rem',
								lg: ln_styles?.lg?.Title?.letter_spacing + 'rem',
								xl: ln_styles?.xl?.Title?.letter_spacing + 'rem',
								xl2: ln_styles?.xl2?.Title?.letter_spacing + 'rem',
							}}>
							{ArtTitle}
						</Title>
						<Title
							mt={{
								base: `${ln_styles?.xs?.IntroCard_Spacing?.introCard_Content_margin}rem`,
								sm: `${ln_styles?.sm?.IntroCard_Spacing?.introCard_Content_margin}rem`,
								md: `${ln_styles?.md?.IntroCard_Spacing?.introCard_Content_margin}rem`,
								lg: `${ln_styles?.lg?.IntroCard_Spacing?.introCard_Content_margin}rem`,
								xl: `${ln_styles?.xl?.IntroCard_Spacing?.introCard_Content_margin}rem`,
								xl2: `${ln_styles?.xl2?.IntroCard_Spacing?.introCard_Content_margin}rem`,
							}}
							c={colorScheme === 'light' ? '#333333' : '#E0E0E0'}
							ff={{
								base: ln_styles?.xs?.Description?.font_family,
								sm: ln_styles?.sm?.Description?.font_family,
								md: ln_styles?.md?.Description?.font_family,
								lg: ln_styles?.lg?.Description?.font_family,
								xl: ln_styles?.xl?.Description?.font_family,
								xl2: ln_styles?.xl2?.Description?.font_family,
							}}
							fz={{
								base: (ln_styles?.xs?.Description?.font_size || 1) * size_modifier + 'rem',
								sm: (ln_styles?.sm?.Description?.font_size || 1) * size_modifier + 'rem',
								md: (ln_styles?.md?.Description?.font_size || 1) * size_modifier + 'rem',
								lg: (ln_styles?.lg?.Description?.font_size || 1) * size_modifier + 'rem',
								xl: (ln_styles?.xl?.Description?.font_size || 1) * size_modifier + 'rem',
								xl2: (ln_styles?.xl2?.Description?.font_size || 1) * size_modifier + 'rem',
							}}
							lh={{
								base: ln_styles?.xs?.Description?.line_height + '%',
								sm: ln_styles?.sm?.Description?.line_height + '%',
								md: ln_styles?.md?.Description?.line_height + '%',
								lg: ln_styles?.lg?.Description?.line_height + '%',
								xl: ln_styles?.xl?.Description?.line_height + '%',
								xl2: ln_styles?.xl2?.Description?.line_height + '%',
							}}
							fw={{
								base: ln_styles?.xs?.Description?.font_weight,
								sm: ln_styles?.sm?.Description?.font_weight,
								md: ln_styles?.md?.Description?.font_weight,
								lg: ln_styles?.lg?.Description?.font_weight,
								xl: ln_styles?.xl?.Description?.font_weight,
								xl2: ln_styles?.xl2?.Description?.font_weight,
							}}
							lts={{
								base: ln_styles?.xs?.Description?.letter_spacing + 'rem',
								sm: ln_styles?.sm?.Description?.letter_spacing + 'rem',
								md: ln_styles?.md?.Description?.letter_spacing + 'rem',
								lg: ln_styles?.lg?.Description?.letter_spacing + 'rem',
								xl: ln_styles?.xl?.Description?.letter_spacing + 'rem',
								xl2: ln_styles?.xl2?.Description?.letter_spacing + 'rem',
							}}>
							{Strap}
						</Title>
						<Space h={width >= 2560 ? '2.5rem' : '2rem'} />
						<Divider />
						<Space h={width >= 2559 ? '2.5rem' : '2rem'} />
						<Group justify='space-between' gap={'32px'}>
							<SimpleGrid
								cols={{ xs: 3, sm: 3, sm2: 3, sm3: 3, md: 3, lg: 3, xl: 3, xl2: 3 }}
								spacing={width >= 768 ? '3rem' : '1.5rem'}
								verticalSpacing={'1rem'}>
								{authorList.map((author, index: number) => {
									return (
										<Stack gap={'12px'} key={index}>
											<Text
												key={author.id}
												style={{
													fontFamily: 'Noto Sans',
													fontSize: '13px',
													fontWeight: 600,
													letterSpacing: '-0.01625rem',
													lineHeight: 'normal',
													textTransform: 'capitalize',
												}}
												c={
													!author.role || author.role.trim() === '' || author.role === '\t'
														? '#FFFFFF'
														: '#828282'
												}>
												{!author.role || author.role.trim() === '' || author.role === '\t'
													? '--'
													: author.role}
											</Text>
											<Text
												key={author.name}
												style={{
													fontFamily: 'Noto Sans',
													fontWeight: 500,
													letterSpacing: width >= 1024 ? '-0.01875rem' : '-0.0225rem',
													lineHeight: width >= 1024 ? '1.6875rem' : '1.2rem',
												}}
												size={width >= 1024 ? '15px' : '12px'}
												c={author.name === '-' ? '#FFFFFF' : '#333'}>
												<Link href={`/articles?&authorName=${author.name}`} style={{ textDecoration: 'none' }}>
													{author.name === '-' ? '--' : author.name}
												</Link>
											</Text>
										</Stack>
									);
								})}
							</SimpleGrid>

							{/* <Link href='#seeallcredits'> */}
							<Button
								type='button'
								variant='outline-hover-filled'
								color={'#B82929'}
								radius={'3rem'}
								onClick={() =>
									scrollToview({
										alignment: 'center',
										duration: '1500',
									})
								}
								style={{ border: '2px solid' }}
								styles={{
									label: {
										paddingTop: '0.5rem',
										paddingBottom: '0.5rem',
										paddingLeft: '1rem',
										paddingRight: '1rem',
									},
									root: { padding: '0' },
								}}>
								See All Credits
							</Button>
							{/* </Link> */}
						</Group>
					</Card>
				</Card>
			</Collapse>
		</Box>
	);
}
