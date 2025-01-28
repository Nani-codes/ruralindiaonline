import DOMPurify from 'isomorphic-dompurify';
import { useRouter } from 'next/router';
import { Box, Button, Card, Divider, Flex, Group, SimpleGrid, Space, Text } from '@mantine/core';
import { FaceBook, Instagram } from '@/component/Icon';

import Link from 'next/link';
import { RiArrowRightSLine } from 'react-icons/ri';
import XFrameIcon from '@/common/Icons/XFrame';
import { useViewportSize } from '@mantine/hooks';
import TwitterIcon from '@/common/Icons/TwitterIcon';
import FacebookIcon from '@/common/Icons/Facebook';
import WebsiteIcon from '@/common/Icons/WebsiteIcon';
import { forwardRef } from 'react';

interface AuthorProps {
	data: any;
}

interface Author {
	id: string;
	author_name: {
		data: {
			attributes: {
				Name: string;
				Bio: string;
				Website: string;
				Twitter_username: string;
				Instagram_username: string;
				Facebook_username: string;
			};
		};
	};
	author_role: {
		data: {
			attributes: {
				Name: string;
				Bio: string;
			};
		};
	};
}
const getLocalizedBio = (author: any, locale: string) => {
	const localizedBio = author?.author_name?.data?.attributes[`Bio_${locale}`]; // Access specific locale bio
	const defaultBio = author?.author_name?.data?.attributes?.Bio; // Default bio in case localized bio is not available
	return localizedBio || defaultBio || ''; // Return localized bio or fallback to default bio
};

const Author = forwardRef(({ data }: AuthorProps, ref) => {
	const { width } = useViewportSize();
	const router = useRouter();
	const authors = data?.data?.attributes?.Authors;
	const currentLocale = data?.data?.attributes?.locale || 'en';
	// const twitterUsername = author?.author_name?.data?.attributes?.Twitter_username;
	// const facebookUsername = author?.author_name?.data?.attributes?.Facebook_username;
	const handleSeeMoreStories = (authorName: string) => {
		// Navigate to the search page with the author's name as a query parameter
		router.push(`/articles?authorName=${encodeURIComponent(authorName)}`);
	};

	return (
		<Box m='auto' ref={ref as React.RefObject<HTMLDivElement>}>
			{authors?.map((author: Author, index: number) => (
				<Card key={index}>
					<Divider />
					<Space h='40' />
					<SimpleGrid
						cols={{ base: 1, md: 2, lg: 2, xl: 2, xl2: 2 }}
						spacing={width >= 1024 ? '6.5rem' : '5rem'}
						verticalSpacing={'2rem'}>
						<Flex gap={5} justify='flex-start' align='flex-start' direction='column' wrap='wrap'>
							<Text
								c={'#828282'}
								style={{
									fontWeight: 600,
									lineHeight: 'normal',
									fontFamily: 'Noto Sans',
									letterSpacing: width >= 1024 ? '0.3px' : '-0.26px',
								}}
								size={width >= 1024 ? '15px' : '13px'}>
								{author?.author_role?.data?.attributes?.Name}
							</Text>
							<Text
								c={'#B82929'}
								style={{
									fontWeight: 700,
									lineHeight: width >= 1024 ? '1.95rem' : '1.7875rem',
									letterSpacing: width >= 1024 ? '-0.06rem' : '-0.06875rem',
									fontFamily: 'Noto Sans',
								}}
								size={width >= 1024 ? '24px' : '22px'}>
								{author?.author_name?.data?.attributes?.Name}
							</Text>
						</Flex>
						<Flex gap={'24px'} justify='flex-start' align='flex-start' direction='column' wrap='wrap'>
							<Text
								c={'#333'}
								style={{
									fontWeight: 400,
									fontFamily: 'Noto Sans',
									lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
									letterSpacing: width >= 1024 ? '-0.01rem' : '-0.02813rem',
								}}
								size={width >= 1024 ? '16px' : '15px'}>
								<div
									dangerouslySetInnerHTML={{
										__html: DOMPurify.sanitize(getLocalizedBio(author, currentLocale)),
									}}></div>
							</Text>
							<Group justify='flex-start' gap={8}>
								{/* <Link
						href='/articles?type=articles' */}
								<Button
									variant='outline-hover-filled'
									color='#B82929'
									radius={'3rem'}
									style={{ border: '2px solid' }}
									onClick={() => handleSeeMoreStories(author?.author_name?.data?.attributes?.Name)}
									styles={{
										label: {
											paddingTop: '0.5rem',
											paddingBottom: '0.5rem',
											paddingLeft: '1rem',
											paddingRight: '0px',
										},
										root: { padding: '0' },
									}}
									pr={'1rem'}
									rightSection={<RiArrowRightSLine size={20} />}>
									See more stories
								</Button>
								{/* <Link href={`https://instagram.com/${author?.author_name?.data?.attributes?.Instagram_username}`}>
									<Instagram />
								</Link> */}
								{/* <Link href={`https://twitter.com/${author?.author_name?.data?.attributes?.Twitter_username}`}>
									<XFrameIcon />
								</Link>
								<Link href={`https://facebook.com/${author?.author_name?.data?.attributes?.Facebook_username}`}>
									<FaceBook />
								</Link> */}
								<Group justify='flex-start'>
									{author?.author_name?.data?.attributes?.Twitter_username && (
										<Link href={`https://twitter.com/${author?.author_name?.data?.attributes?.Twitter_username}`}>
											<TwitterIcon />
										</Link>
									)}
									{author?.author_name?.data?.attributes?.Facebook_username && (
										<Link
											href={`https://facebook.com/${author?.author_name?.data?.attributes?.Facebook_username}`}>
											<FacebookIcon />
										</Link>
									)}
									{author?.author_name?.data?.attributes?.Website && (
										<Link
											href={
												author?.author_name?.data?.attributes?.Website.startsWith('http')
													? author?.author_name?.data?.attributes?.Website
													: `${author?.author_name?.data?.attributes?.Website}`
											}>
											<WebsiteIcon />
										</Link>
									)}
								</Group>
							</Group>
						</Flex>
					</SimpleGrid>
				</Card>
			))}
		</Box>
	);
});

export default Author;
