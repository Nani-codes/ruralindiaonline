'use client';

import { BackIcon, Down, Search } from '../@the-source/Icon';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import Filters from './Filters';
import Language from './Language';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Button, Container, Group, Input, Paper, Transition, Flex } from '@mantine/core';

const SearchHeader = () => {
	const message = useTranslations('Index');

	const { push } = useRouter();
	const [isOpenFilter, setIsOpenFilter] = useState(false);
	const [isLanguage, setIsLanguage] = useState(false);
	const { theme, setTheme } = useTheme();

	const params = useParams();
	const locale = params?.locale || 'en';

	const toggleFilter = () => {
		setIsOpenFilter(!isOpenFilter);
	};
	const toggleLanguageFilter = () => {
		setIsLanguage(!isLanguage);
	};
	const closeLanguageFilter = () => {
		setIsLanguage(false);
	};

	const closeFilter = () => {
		setIsOpenFilter(false);
	};

	const onEnter = (event: any) => {
		if (event.keyCode === 13) {
			push('/articles?search=q&searchText=' + event.target.value);
		}
	};

	useEffect(() => {
		let lastScrollTop: number;
		const navbar = document.getElementById('navbar');

		window.addEventListener('scroll', function () {
			let scrollTop = window.scrollY || document.documentElement.scrollTop;

			if (navbar) {
				if (scrollTop <= lastScrollTop && lastScrollTop > 0) {
					navbar.style.top = '0';
				} else {
					navbar.style.top = '-300px';
				}
				lastScrollTop = scrollTop;
			}
			setIsLanguage(false);
		});
	});

	return (
		<>
			<Paper id='navbar' shadow='sm' style={{ position: 'sticky', top: 0, zIndex: 10, transition: 'all 0.3s' }}>
				<Container size='xl'>
					<Flex align='center' justify='space-between' style={{ height: 60 }}>
						<Group gap='md'>
							<Link href='/'>
								<BackIcon />
							</Link>
							<Button
								visibleFrom='md'
								onClick={toggleLanguageFilter}
								style={{ backgroundColor: '#FFE8E8', padding: '8px 16px' }}
								radius='xl'
								variant='light'>
								{message('ChooseLanguage')}
								<Down className='stroke-[#B82929]' />
							</Button>
						</Group>

						<Input
							leftSection={<Search />}
							placeholder='Enter a name of author'
							onKeyDown={onEnter}
							style={{ flex: 1, margin: '0 16px' }}
						/>

						<Group gap='md'>
							<Button onClick={toggleFilter} radius='xl' variant='filled'>
								{message('Filters')}
							</Button>
						</Group>
					</Flex>
				</Container>
			</Paper>
			<Language close={closeLanguageFilter} isOpen={isLanguage} />
			<Filters close={closeFilter} isOpen={isOpenFilter} />
		</>
	);
};

export default SearchHeader;
