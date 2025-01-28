import { DirectionProvider, Space, useDirection } from '@mantine/core';
import { get, map } from '@/utils';
import { useEffect, useState } from 'react';
import qs from 'qs';
import { BASE_URL } from '@/config';
import Footer from '@/common/Footer';
import Head from '@/common/Head';
import Header from '../common/Header';
import { SECTIONS } from '@/constants';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useLnStyles } from '@/store/language_styles_store';
import { useRouter } from 'next/router';
import { useViewportSize } from '@mantine/hooks';
import Announcement from '@/component/Announcement';
import New from '@/common/Home/components/New';
const TopSession = dynamic(() => import('@/common/Home/components/Top'), { ssr: false });
const AudioVideoStories = dynamic(() => import('@/common/Home/components/AudioVideoStories'), { ssr: false });
const PariRecommends = dynamic(() => import('@/common/Home/components/PariRecommends'), { ssr: false });
const PariLibrary = dynamic(() => import('@/common/Home/components/PariLibrary'), { ssr: false });
const EditorChoice = dynamic(() => import('@/common/Home/components/EditorChoice'), { ssr: false });

const SectionComponents = {
	[SECTIONS.AudioVideoStories]: AudioVideoStories,
	[SECTIONS.EditorChoice]: EditorChoice,
	[SECTIONS.PariRecommends]: PariRecommends,
	[SECTIONS.PariLibrary]: PariLibrary,
};

// [SECTIONS.PariLibrary]: PariLibrary,

export default function Home({ data, ln_styles }: any) {
	const pariInformation = get(data, 'pariInfo', []);
	const thisWeekOnPari = get(data, 'thisWeekOnPari.thisWeekOnPari', {});

	const pariMovableSections = get(data, 'pari_movable_sections', []);
	// console.log('pariMovableSections', pariMovableSections);
	const monthly = get(data, 'months', {});
	const week_days = get(data, 'weekDays', {});
	const { width } = useViewportSize();
	const [dir, setDir] = useState('ltr');
	const router = useRouter();

	const [, setLnStyles] = useLnStyles();

	useEffect(() => {
		if (ln_styles) {
			setLnStyles(ln_styles);
		}
	}, [ln_styles]);

	useEffect(() => {
		let isRefresh = true;
		if (isRefresh) {
			axios
				.get(
					`${BASE_URL}api/language-style?locale=${router.locale}&populate[xs][populate]=*&populate[sm][populate]=*&populate[md][populate]=*&populate[lg][populate]=*&populate[xl][populate]=*&populate[xl2][populate]=*`,
				)
				.then((res) => {
					setLnStyles(res?.data?.data?.attributes);
				});
			if (router.locale === 'ur') {
				setDir('rtl');
			} else {
				setDir('ltr');
			}
		}
		return () => {
			isRefresh = false;
		};
	}, [router.locale]);

	return (
		<>
			<Head
				title='People&#39;s Archive of Rural India'
				description='A journalism website reporting the stories of 833 million rural Indians. An archive of the living past, a journal of the present, a textbook of the future.'
				keywords='rural india, archive, online archive, pari, p sainath, sainath,'
			/>
			<Header />

			<div style={{ maxWidth: '1536px', margin: '0 auto' }}>
				<Announcement />
				<TopSession pariInformation={pariInformation} monthly={monthly} week_days={week_days} currentLocale={router.locale} />
				<Space h={width >= 1024 ? '5.625rem' : '3.75rem'} />
				<div id='ThisWeekOnPari' />
				<New thisWeekOnPari={thisWeekOnPari} />
				{/* {map(pariMovableSections, (section: any) => {
					const type = get(section, '__component');
					('section', section);
					const Component = SectionComponents[type] || null;
					return <Component key={type
					} section={section} currentLocale={router.locale} />;
				})} */}
				{map(pariMovableSections, (section: any) => {
					const type = get(section, '__component');
					// ('section', section);

					// Find the component based on the type
					const Component = SectionComponents[type];

					// Handle missing components
					if (!Component) {
						console.warn(`Component not found for type: ${type}`);
						return null; // Skip rendering this section
					}

					return <Component key={type} section={section} currentLocale={router.locale} />;
				})}
			</div>
		</>
	);
}

const fetchPariInformation = async (locale: string) => {
	try {
		const query = {
			populate: {
				pariInformation: {
					fields: ['title', 'url', 'ButtonText', 'description'],
					populate: {
						image: {
							fields: ['url'],
						},
					},
				},
			},
		};

		const url = `${BASE_URL}api/home-page?${qs.stringify(query)}&locale=${locale}`;
		// console.log('Fetching URL for Pari Information:', url);

		const response = await axios.get(url);
		// Adjust the access path based on the API response structure
		return response?.data?.data?.attributes?.pariInformation || [];
	} catch (error) {
		console.error('Error fetching pariInformation:', error);
		return [];
	}
};

const fetchThisWeekOnPari = async (locale: string) => {
	try {
		const query = {
			populate: {
				thisWeekOnPari: {
					populate: {
						article_with_lang_selection_1: {
							fields: ['id'],
							populate: {
								all_language: { fields: ['language_name'] },
								article: {
									fields: ['Title', 'strap', 'original_published_date', 'slug', 'location_auto_suggestion'],
									populate: {
										location: { fields: ['name','district','state'] },
										localizations: {
											fields: ['locale', 'title', 'strap', 'slug'],
										},
										Authors: {
											populate: {
												author_role: { fields: ['Name'] },
												author_name: { fields: ['Name'] },
											},
										},
										Cover_image: { fields: ['url'] },
										mobilecover: { fields: ['url'] },
										categories: {
											fields: ['slug', 'Title'],
										},
									},
								},
							},
						},
					},
				},
			},
		};

		const response = await axios.get(`${BASE_URL}api/home-page?${qs.stringify(query)}&locale=${locale}`);
		// console.log('hello world', `${BASE_URL}api/home-page?${qs.stringify(query)}&locale=${locale}`, response?.data?.attributes);
		return response?.data?.data?.attributes || null;
	} catch (error) {
		console.error('Error fetching thisWeekOnPari:', error);
		return null;
	}
};

const fetchPariMovableSections = async (locale: string) => {
	try {
		const query = {
			populate: {
				pari_movable_sections: {
					on: {
						'home-page.editors-choice': {
							fields: ['title', 'sub_title'],
							populate: {
								article_with_lang_selection_1: {
									fields: ['id'],
									populate: {
										all_language: { fields: ['language_name'] },
										article: {
											fields: ['Title', 'strap', 'original_published_date', 'slug', 'location_auto_suggestion'],
											populate: {
												location: { fields: ['name','district','state'] },
												localizations: {
													fields: ['locale', 'title', 'strap', 'slug'],
												},
												Authors: {
													populate: {
														author_role: { fields: ['Name'] },
														author_name: { fields: ['Name'] },
													},
												},
												Cover_image: { fields: ['url'] },
												mobilecover: { fields: ['url'] },
												categories: {
													fields: ['slug', 'Title'],
												},
											},
										},
									},
								},
								article_with_lang_selection_2: {
									fields: ['id'],
									populate: {
										all_language: { fields: ['language_name'] },
										article: {
											fields: ['Title', 'strap', 'original_published_date', 'slug', 'location_auto_suggestion'],
											populate: {
												location: { fields: ['name','district','state'] },
												localizations: {
													fields: ['locale', 'title', 'strap', 'slug'],
												},
												Authors: {
													populate: {
														author_role: { fields: ['Name'] },
														author_name: { fields: ['Name'] },
													},
												},
												Cover_image: { fields: ['url'] },
												mobilecover: { fields: ['url'] },
												categories: {
													fields: ['slug', 'Title'],
												},
											},
										},
									},
								},
							},
						},
					},
				},
			},
		};

		const response = await axios.get(`${BASE_URL}api/home-page?${qs.stringify(query)}&locale=${locale}`);
		return response?.data?.data?.attributes?.pari_movable_sections[0] || null;
	} catch (error) {
		console.error('Error fetching pariMovableSections:', error);
		return null;
	}
};

const fetchPariRecommends = async (locale: string) => {
	try {
		const query = {
			populate: {
				pari_movable_sections: {
					on: {
						'home-page.pari-recommends': {
							fields: ['Title'],
							populate: {
								article_with_lang_selection_1: {
									fields: ['id'], // Include the top-level ID field
									populate: {
										all_language: { fields: ['language_name'] }, // Necessary fields in all_language
										article: {
											fields: ['Title', 'strap', 'original_published_date', 'slug', 'location_auto_suggestion'],
											populate: {
												location: { fields: ['name','district','state'] },
												localizations: {
													fields: ['locale', 'title', 'strap', 'slug'],
												},
												Authors: {
													populate: {
														author_role: { fields: ['Name'] },
														author_name: { fields: ['Name'] },
													},
												},
												Cover_image: { fields: ['url'] },
												mobilecover: { fields: ['url'] },
												categories: { fields: ['slug', 'Title'] },
											},
										},
									},
								},
								article_with_lang_selection_2: {
									fields: ['id'], // Include the top-level ID field
									populate: {
										all_language: { fields: ['language_name'] },
										article: {
											fields: ['Title', 'strap', 'original_published_date', 'slug', 'location_auto_suggestion'],
											populate: {
												location: { fields: ['name','district','state'] },
												localizations: {
													fields: ['locale', 'title', 'strap', 'slug'],
												},
												Authors: {
													populate: {
														author_role: { fields: ['Name'] },
														author_name: { fields: ['Name'] },
													},
												},
												Cover_image: { fields: ['url'] },
												mobilecover: { fields: ['url'] },
												categories: { fields: ['slug', 'Title'] },
											},
										},
									},
								},
							},
						},
					},
				},
			},
		};

		const response = await axios.get(`${BASE_URL}api/home-page?${qs.stringify(query)}&locale=${locale}`);
		return response?.data?.data?.attributes?.pari_movable_sections[0] || null;
	} catch (error) {
		console.error('Error fetching pariRecommends:', error);
		return null;
	}
};

const fetchPariLibrary = async (locale: string) => {
	try {
		const query = {
			populate: {
				pari_movable_sections: {
					on: {
						'home-page.pari-library': {
							fields: ['title', 'sub_title', 'Button', 'view_project', 'description'],
							populate: {
								pariProjects: {
									fields: ['title', 'link', 'sub_title', 'description'],
									populate: {
										image: { fields: ['url'] },
									},
								},
								libraryArticles: {
									fields: ['Title', 'slug', 'Categories'],
									populate: {
										Thumbnail: { fields: ['url'] },
									},
								},
							},
						},
					},
				},
			},
		};

		const response = await axios.get(`${BASE_URL}api/home-page?${qs.stringify(query)}&locale=${locale}`);
		return response?.data?.data?.attributes?.pari_movable_sections[0] || null;
	} catch (error) {
		console.error('Error fetching pariLibrary:', error);
		return null;
	}
};

const fetchAudioVideoStories = async (locale: string) => {
	try {
		const query = {
			populate: {
				pari_movable_sections: {
					on: {
						'home-page.audio-video-stories': {
							fields: ['title'],
							populate: {
								article_with_lang_selection_1: {
									fields: ['id'], // Include the top-level ID field
									populate: {
										all_language: { fields: ['language_name'] }, // Necessary fields in all_language
										article: {
											fields: ['Title', 'strap', 'original_published_date', 'slug', 'location_auto_suggestion'],
											populate: {
												location: { fields: ['name','district','state'] },
												localizations: {
													fields: ['locale', 'title', 'strap', 'slug'],
												},
												Authors: {
													populate: {
														author_role: { fields: ['Name'] },
														author_name: { fields: ['Name'] },
													},
												},
												Cover_image: { fields: ['url'] },
												mobilecover: { fields: ['url'] },
												categories: { fields: ['slug', 'Title'] },
											},
										},
									},
								},
								article_with_lang_selection_2: {
									fields: ['id'], // Include the top-level ID field
									populate: {
										all_language: { fields: ['language_name'] },
										article: {
											fields: ['Title', 'strap', 'original_published_date', 'slug', 'location_auto_suggestion'],
											populate: {
												location: { fields: ['name','district','state'] },
												localizations: {
													fields: ['locale', 'title', 'strap', 'slug'],
												},
												Authors: {
													populate: {
														author_role: { fields: ['Name'] },
														author_name: { fields: ['Name'] },
													},
												},
												Cover_image: { fields: ['url'] },
												mobilecover: { fields: ['url'] },
												categories: { fields: ['slug', 'Title'] },
											},
										},
									},
								},
							},
						},
					},
				},
			},
		};

		const response = await axios.get(`${BASE_URL}api/home-page?${qs.stringify(query)}&locale=${locale}`);
		return response?.data?.data?.attributes?.pari_movable_sections[0] || null;
	} catch (error) {
		console.error('Error fetching audioVideoStories:', error);
		return null;
	}
};
const fetchMonths = async (locale: string) => {
	try {
		const query = {
			populate: {
				Months: {
					populate: '*',
				},
			},
		};

		const response = await axios.get(`${BASE_URL}api/home-page?${qs.stringify(query)}&locale=${locale}`);
		return response?.data?.data?.attributes?.Months || null;
	} catch (error) {
		console.error('Error fetching Months:', error);
		return null;
	}
};
const fetchWeekDays = async (locale: string) => {
	try {
		const query = {
			populate: {
				week_days: {
					populate: '*',
				},
			},
		};

		const response = await axios.get(`${BASE_URL}api/home-page?${qs.stringify(query)}&locale=${locale}`);
		return response?.data?.data?.attributes?.week_days || null;
	} catch (error) {
		console.error('Error fetching weekDays:', error);
		return null;
	}
};
const fetchLanguageStyles = async (locale: string) => {
	try {
		const query = {
			populate: {
				xs: { populate: '*' },
				sm: { populate: '*' },
				md: { populate: '*' },
				lg: { populate: '*' },
				xl: { populate: '*' },
				xl2: { populate: '*' },
			},
		};

		const response = await axios.get(`${BASE_URL}api/language-style?${qs.stringify(query)}&locale=${locale}`);
		return response?.data?.data?.attributes || null;
	} catch (error) {
		console.error('Error fetching language styles:', error);
		return null;
	}
};

export async function getServerSideProps({ locale }: any) {
	try {
		//  ,
		const [pariInfo, thisWeekOnPari, movableSections, months, weekDays, pariRecommends, pariLibrary, audioVideoStories, lnStyles] =
			await Promise.all([
				fetchPariInformation(locale),
				fetchThisWeekOnPari(locale),
				fetchPariMovableSections(locale),
				fetchMonths(locale),
				fetchWeekDays(locale),
				fetchPariRecommends(locale),
				fetchPariLibrary(locale),
				fetchAudioVideoStories(locale),
				fetchLanguageStyles(locale),
			]);
		const response = await axios.get(`${BASE_URL}api/home-page?&locale=${locale}&populate=pari_movable_sections`);
		const movableSectionOrder = response?.data?.data?.attributes?.pari_movable_sections;
		const presentOrder = [movableSections, pariRecommends, pariLibrary, audioVideoStories];
		const orderedArr2 = movableSectionOrder.map((item1: any) => {
			return presentOrder.find((item2: any) => item2.__component === item1.__component) || null;
		});

		// console.log(orderedArr2);
		// return response?.data?.data?.attributes?.pari_movable_sections[0] || null;
		return {
			props: {
				messages: require(`@/locales/${locale}.json`), // Localization messages
				data: {
					pariInfo,
					thisWeekOnPari,
					pari_movable_sections: orderedArr2,
					months,
					weekDays,
				},
				ln_styles: lnStyles, // Language styles
				headers: {
					'Cache-Control': 'no-store',
				},
			},
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			notFound: true, // Render a 404 page if the data fails to load
		};
	}
}
