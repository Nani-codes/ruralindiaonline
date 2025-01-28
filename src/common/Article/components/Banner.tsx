import { IMAGE_URL } from '@/config';
import { get } from '@/utils';
import { Container, Image } from '@mantine/core';

export default function Banner({ article }: any) {
	const videoUrl = get(article, 'attributes.youtube_url');

	return (
		<Container fluid px={0}>
			{videoUrl ? (
				<iframe
					style={{ width: '100vw', height: '90vh' }}
					src={videoUrl}
					title='Visible Work'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					allowFullScreen></iframe>
			) : (
				<Image
					w='100vw'
					h='auto'
					src={`${IMAGE_URL}${get(article, 'attributes.Cover_image.data.attributes.url', '')}`}
					alt={get(article, 'attributes.slug', '')}
				/>
			)}
		</Container>
	);
}
