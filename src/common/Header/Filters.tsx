'use client';

import { BASE_URL, IMAGE_URL } from '@/config';
import { Close, DateIcon, LocationIcon, Search, Select, Selected, TypeIcon, UserIcon } from '../@the-source/Icon';
import { get, map } from '@/utils';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Link from 'next/link';
import { Drawer, Button, Text, Group, Divider, Input, ScrollArea, Box, Tabs, Autocomplete } from '@mantine/core';
import styles from "./Filter.module.css";

const dateOptions = [
	{ name: 'Past 7 days', value: 7 },
	{ name: 'Past 14 days', value: 14 },
	{ name: 'Past 30 days', value: 30 },
	{ name: 'Past 1 year', value: 365 },
];

const contentTypes = [
	'Article',
	//"Editorials",
	'Video',
	'Audio',
	// "Student Articles",
];

const debounce = <T extends (...args: any[]) => any>(func: T, delay: number): ((...args: Parameters<T>) => void) => {
	let timeoutId: ReturnType<typeof setTimeout>;

	return (...args: Parameters<T>): void => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
};

const Filters = ({ isOpen, close }: any) => {
	const searchParams = useSearchParams();
	const { push } = useRouter();
	const search = searchParams.get('search');

	const [activeTab, setActiveTab] = useState<string | null>('Categories');
	const [categories, setCategories] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

	const [authorName, setAuthorName] = useState<string>(searchParams.get('authorName') || '');
	const [location, setLocation] = useState<string>(searchParams.get('location') || '');
	const [contentType, setContentType] = useState<string>(searchParams.get('type') || '');
	const [dateRange, setDateRange] = useState<string>(searchParams.get('dateRange') || '');

	const searchCategoryIds = useMemo(() => searchParams.get('categoryIds')?.split(',').map(Number) ?? [], [searchParams]);

	const selectDate = (e: React.MouseEvent<HTMLAnchorElement>, value: number) => {
		e.preventDefault();
		setDateRange(value.toString());
	};

	useEffect(() => {
		setSelectedCategories(searchCategoryIds);
	}, [searchCategoryIds]);

	const toggleCategorySelection = (id: number) => {
		setSelectedCategories((prevSelectedCategories) =>
			prevSelectedCategories.includes(id)
				? prevSelectedCategories.filter((categoryId) => categoryId !== id)
				: [...prevSelectedCategories, id]
		);
	};

	const selectType = (e: React.MouseEvent<HTMLAnchorElement>, value: string) => {
		e.preventDefault();
		setContentType((prevContentType) => {
			const types = prevContentType.split(',').filter(Boolean);
			return types.includes(value)
				? types.filter((type) => type !== value).join(',')
				: [...types, value].join(',');
		});
	};

	const getData = async () => {
		try {
			const res = await fetch(
				`${BASE_URL}api/categories?populate=deep,5&locale=en&pagination[page]=1&pagination[pageSize]=100`
			);
			const result = await res.json();
			setCategories(get(result, 'data', []));
		} catch (error) {
			console.error('Failed to fetch data', error);
		}
	};

	const navigate = () => {
		const queryParams = {
			categoryIds: selectedCategories.join(','),
			authorName,
			location,
			dateRange,
			type: contentType,
		};

		const searchParams = `?${new URLSearchParams(queryParams)}`;

		push(`/articles${searchParams}`);
	};

	useEffect(() => {
		getData();
	}, []);

	const renderCategoryBox = (category: any) => {
		const categoryId = get(category, 'id');
		const title = get(category, 'attributes.Title');
		const isSelected = selectedCategories.includes(categoryId);

		return (
			<Box
				key={categoryId}
				onClick={() => toggleCategorySelection(categoryId)}
				style={{
					width: '10rem',
					height: '164px',
					borderRadius: '16px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: `linear-gradient(360deg, ${
						isSelected ? '#B82929' : '#000000'
					} 10.82%, rgba(0, 0, 0, 0) 92.31%), url(${IMAGE_URL}${
						category?.attributes?.category_image?.data?.attributes?.url
					}) black no-repeat center center / cover`,
				}}
			>
				<Text c="white" ta='center'>
					{title}
				</Text>
			</Box>
		);
	};

	const renderFilterOption = (item: any, isSelected: boolean, onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void) => (
		<Link
			key={item.name || item}
			href="/"
			onClick={onClick}
			style={{
				display: 'flex',
				alignItems: 'center',
				padding: '8px',
				backgroundColor: isSelected ? '#eee' : '#fff',
				borderBottom: '1px solid #ccc',
			}}
		>
			{isSelected ? <Selected /> : <Select />}
			<Text ml="xs">{item.name || item}</Text>
		</Link>
	);

	return (
		<Tabs value={activeTab} onChange={setActiveTab} variant='pills' classNames={styles}>
			<Drawer
				opened={isOpen}
				onClose={close}
				position="right"
				size="lg"
				padding="0"
				withCloseButton={false}
				title={(
					<Tabs.List>
						<Button variant="subtle" onClick={close}>
							<Close />
						</Button>
						<Tabs.Tab value="Categories">Categories</Tabs.Tab>
						<Tabs.Tab value="Filters">Filters</Tabs.Tab>
					</Tabs.List>
				)}
			>
				<ScrollArea style={{ height: '90vh', backgroundColor: "#f9f9f9", color: "#666" }} px="md">
					<Tabs.Panel value="Categories">
						<Box>
							<Text size="xl" fw={500} mb="md">
								Choose a category of interest
							</Text>
							<Group gap="md">
								{map(categories, renderCategoryBox)}
							</Group>
						</Box>
					</Tabs.Panel>

					<Tabs.Panel value="Filters">
						<Box>
							<Text size="xl" fw={500} mb="md">
								Choose filters to apply
							</Text>
							<AuthorInput authorName={authorName} setAuthorName={setAuthorName} />
							<Divider my="md" />

							<Box mb="md">
								<Group align="center" mb="xs">
									<LocationIcon />
									<Text size="sm" fw={700}>
										Place
									</Text>
								</Group>
								<Input
									leftSection={<Search />}
									placeholder="Enter name of Location"
									value={location}
									onChange={(e) => setLocation(e.target.value)}
								/>
							</Box>
							<Divider my="md" />


							<Box mb="md">
								<Group align="center" mb="xs">
									<DateIcon />
									<Text size="sm" fw={700}>
										Date Range
									</Text>
								</Group>
								{map(dateOptions, (item: any) => renderFilterOption(item, dateRange === item.value?.toString(), (e) => selectDate(e, item.value)))}
							</Box>
							<Divider my="md" />

							<Box mb="md">
								<Group align="center" mb="xs">
									<TypeIcon />
									<Text size="sm" fw={700}>
										Content type
									</Text>
								</Group>
								{map(contentTypes, (item: any) => renderFilterOption(item, contentType.split(',').includes(item), (e) => selectType(e, item)))}
							</Box>
						</Box>
					</Tabs.Panel>
					<Box mt="md">
						<Button fullWidth onClick={navigate}>
							Confirm Selection
						</Button>
					</Box>
				</ScrollArea>
			</Drawer>
		</Tabs>
	);
};

interface AuthorInputProps {
	authorName: string;
	setAuthorName: (name: string) => void;
}

const AuthorInput: React.FC<AuthorInputProps> = ({ authorName, setAuthorName }) => {
	const [suggestions, setSuggestions] = useState<string[]>([]);

	const handleSelect = (val: string) => {
		setAuthorName(val);
		setSuggestions([]);
	};

	const handleChange = useCallback(debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.value) {
			setSuggestions([]);
			return;
		}

		try {
			const response = await fetch(`${BASE_URL}api/authors?filters[Name][$containsi]=${e.target.value}`);
			const result = await response.json();
			const data = result?.data.map?.((i: any) => i?.attributes?.Name);
			setSuggestions(data ?? []);
		} catch (error) {
			console.error('Error fetching suggestions:', error);
			setSuggestions([]);
		}
	}, 400), []);



	return (
		<Box mb="md">
			<Group align="center" mb="xs">
				<UserIcon />
				<Text size="sm" fw={700}>
					Author Name
				</Text>
			</Group>
			<Autocomplete
				data={suggestions}
				value={authorName}
				onChange={(val) => {
					setAuthorName(val);
					handleChange({ target: { value: val } } as React.ChangeEvent<HTMLInputElement>);
				}}
				onOptionSubmit={(item) => handleSelect(item.value)}
				placeholder="Enter name of author"
				leftSection={<Search />}
			/>
		</Box>
	);
};

export default Filters;
