'use client';

import { homelocales } from '../../homeconstants';
import { locales } from '../../constants';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Modal, Button, Group, Box } from '@mantine/core';

const Language = ({ isOpen, close, localizationsData }: any) => {
	const newLanguage: any[] = [];
	const { locale, push, pathname, query, asPath, reload } = useRouter();

	locales?.forEach((item) => {
		localizationsData?.forEach((lang: any) => {
			if (lang?.attributes?.locale === item.code) {
				newLanguage.push({
					...lang?.attributes,
					name: item.name,
				});
			}
		});
	});

	const [selectedLanguage, setSelectedLanguage] = useState(locale);
	const [selectedSlug, SetSelectedSlug] = useState();

	const handleLanguageClick = (languageCode: string) => {
		// console.log('languageCode', languageCode, selectedSlug);
		setSelectedLanguage(languageCode);
		if (selectedSlug) {
			if (selectedLanguage == 'hi-IN') {
				const newUrl = `/article/${encodeURIComponent(selectedSlug)}`;
				window.location.href = newUrl;
			} else {
				const newUrl = `/${selectedLanguage}/article/${encodeURIComponent(selectedSlug)}`;
				window.location.href = newUrl;
			}
		} else {
			// push({ pathname, query }, asPath, { locale: languageCode });
			// setTimeout(() => {
			// 	reload();
			// }, 1);

			// console.log(locale, pathname, query, asPath);
			const params = new URLSearchParams(query).toString(); // Convert query object to string
			const url = `/${languageCode}${pathname}${params ? `?${params}` : ''}`; // Construct URL with locale
			// console.log(url);
			window.location.href = url; // Perform hard reload
		}
		close();
	};

	const handleConfirmSelection = () => {
		if (selectedSlug) {
			if (selectedLanguage == 'hi-IN') {
				const newUrl = `/article/${encodeURIComponent(selectedSlug)}`;
				window.location.href = newUrl;
			} else {
				const newUrl = `/${selectedLanguage}/article/${encodeURIComponent(selectedSlug)}`;
				window.location.href = newUrl;
			}
		} else {
			push({ pathname, query }, asPath, { locale: selectedLanguage });
			reload();
		}
		close();
	};

	return (
		<Modal
			opened={isOpen}
			onClose={close}
			title='Select Language'
			styles={{
				content: {
					backgroundColor: '#f4f4f4',
				},
				header: {
					backgroundColor: '#f4f4f4',
				},
			}}
			centered
			fullScreen>
			<Box>
				<Group gap='sm'>
					{localizationsData?.length > 0
						? newLanguage.map((item) => (
								<button
									key={item.name}
									onClick={() => {
										handleLanguageClick(item.locale);
										SetSelectedSlug(item.slug);
									}}
									className={`
									text-primary-pari-red
									text-[13px]
									font-sans
									bg-white dark:bg-primary-pari-black
									w-[196px] h-[46px] rounded-[12px]
									flex flex-col items-center justify-center
									border ${item.locale === selectedLanguage ? 'border-primary-pari-red' : 'border-white'}
								`}>
									{item.name}
								</button>
						  ))
						: homelocales.map((item) => (
								<button
									key={item.name}
									onClick={() => {
										handleLanguageClick(item.code);
										// SetSelectedSlug(item.slug);
									}}
									className={`
									text-primary-pari-red
									text-[13px]
									font-sans
									bg-white dark:bg-primary-pari-black
									w-[196px] h-[46px] rounded-[12px]
									flex flex-col items-center justify-center
									border ${item.code === selectedLanguage ? 'border-primary-pari-red' : 'border-white'}
								`}>
									{item.name}
								</button>
						  ))}
				</Group>
				{/* <Group mt='md'>
					<Button onClick={handleConfirmSelection}>Confirm Selection</Button>
				</Group> */}
			</Box>
		</Modal>
	);
};

export default Language;
