import { ActionIcon, Button, Group, Image, Modal, Paper, Popover, Text } from '@mantine/core';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import { MdClear, MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useClipboard, useDisclosure, useViewportSize } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';

import { BASE_URL } from '@/config';
import BaseCredits from '@/mantine_components/Base/BaseCredits';
import BaseLabel from '@/mantine_components/Base/BaseLabel';
import IncreaseIcon from '@/common/Icons/IncreaseIcon';
import PhotoIcon from '@/common/Icons/Photoicon';
import PrinterIcon from '@/common/Icons/PrinterIcon';
import ShareIcon from '@/common/Icons/ShareIcon';
import ShareIconWhite from '@/common/Icons/ShareIconWhite';
import SubstractIcon from '@/common/Icons/SubstractIcon';
import TextIcon from '@/common/Icons/TextIcon';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { useSizeModifier } from '@/store/language_styles_store';

const FloatingIcons = ({ articleId }: { articleId: any }) => {
	const clipboard = useClipboard({ timeout: 500 });
	const handleShare = (url: string, title: string) => {
		clipboard.copy(url);
		notifications.show({
			title: title,
			message: 'Link has been copied successfully',
			color: 'green',
		});
	};

	const { width } = useViewportSize();
	const [opened, { open, close }] = useDisclosure(false);
	const [images, setImages] = useState<{ url: string; caption: string /*credits: string*/ }[]>([]);

	const [modularContent, setModularContent] = useState(null);
	useEffect(() => {
		axios({
			url: `${BASE_URL}api/article/${articleId}?populate[Modular_Content][populate][0]=Content&populate[Modular_Content][populate][1]=Image.image&populate[Modular_Content][populate][2]=full_width_image&populate[Modular_Content][populate][3]=images.image&populate[Modular_Content][populate][4]=credits&populate[Modular_Content][populate][5]=images.credits&populate[Modular_Content][populate][6]=Image.credits&populate[Modular_Content][populate][7]=content`,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				setModularContent(response.data.data);
				setImages([]);
			})
			.catch((error) => {
				console.error(`Failed to fetch modular content data: ${error.message}`);
			});
	}, [articleId]);

	const [modularContentArray, setModularContentArray] = useState([]);

	useEffect(() => {
		const modularContentString = JSON.stringify(modularContent, null, 2);
		const modularContentObject = JSON.parse(modularContentString);
		const modularContentAttributes = modularContentObject?.attributes;
		setModularContentArray(modularContentAttributes?.Modular_Content || []);
	}, [modularContent]);

	useEffect(() => {
		let isRefresh = true;

		if (isRefresh) {
			modularContentArray.forEach((content: any) => {
				if (content.__component === 'modular-content.columnar-images-with-text') {
					// console.log('modular-content.columnar-images-with-text', content);

					content?.Image.forEach((image: any) => {
						const data = {
							url: `${process.env.NEXT_PUBLIC_API_URL}${image?.image?.data?.attributes?.url}`,
							caption: `${image?.Caption}`,
							credits: image?.credits?.data?.attributes?.Name,
						};
						setImages((prev) => [...prev, data]);
					});
				} else if (content.__component === 'modular-content.text-quote-image') {
					// console.log('modular-content.text-quote-image', content);

					const image = content.Image; // Access the Image object

					const data = {
						url: `${process.env.NEXT_PUBLIC_API_URL}${image?.data?.attributes?.url}`,
						caption: `${content?.Image_caption}`, // Use Image_caption instead of Caption
						credits: image?.credits?.data?.attributes?.Name,
					};

					setImages((prev) => [...prev, data]);
				} else if (content.__component === 'modular-content.full-width-image') {
					// console.log('modular-content.full-width-image', content);
					const fullWidthImageData = content.full_width_image.data.attributes;

					const data = {
						url: `${process.env.NEXT_PUBLIC_API_URL}${fullWidthImageData.url}`,
						caption: `${content.caption}`,
						credits: content?.credits?.data?.attributes?.Name,
					};

					setImages((prev) => [...prev, data]);
				} else if (content.__component === 'modular-content.image-with-quote-and-text') {
					// console.log('modular-content.image-with-quote-and-text', content);

					const imageData = content.Image.data.attributes; // Access the attributes of the Image object

					const data = {
						url: `${process.env.NEXT_PUBLIC_API_URL}${imageData.url}`,
						caption: `${content.Image_caption}`,
						credits: content?.credits?.data?.attributes?.Name,
					};

					setImages((prev) => [...prev, data]);
				} // Assume that 'imageurl' is an array where you store image data
				else if (content.__component === 'modular-content.single-caption-mul-img') {
					// console.log('modular-content.single-caption-mul-img', content);

					// Extract the main content caption
					const mainContentCaption: string = content.caption;

					// Use the first image's data to generate URLs and captions
					const firstImageData = content.images[0]?.image?.data?.attributes;
					if (firstImageData) {
						const firstImageUrl = `${process.env.NEXT_PUBLIC_API_URL}${firstImageData.url}`;

						// Combine main content caption and the first image's caption
						const combinedCaption: string = [mainContentCaption, firstImageData.caption].join(' ');

						// Push the data into the imageurl array

						setImages((prev) => [
							...prev,
							{ url: firstImageUrl, caption: combinedCaption, credits: content?.credits?.data?.attributes?.Name },
						]);
						// If you want to display all images with the same caption, you can loop through all images
						for (let i = 1; i < content.images.length; i++) {
							const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${content.images[i]?.image?.data?.attributes?.url}`;
							setImages((prev) => [
								...prev,
								{ url: imageUrl, caption: combinedCaption, credits: content?.credits?.data?.attributes?.Name },
							]);
						}
					}
				}
			});
		}

		return () => {
			isRefresh = false;
		};
	}, [modularContentArray]);
	// console.log('images', images);

	const handlePrint = () => {
		const style = document.createElement('style');
		style.innerHTML = `
      @media print {
        body {
          margin: 0;
          top: 100;
          padding: 0;
        }
        .page-break {
          page-break-before: always;
        }
        * {
          box-sizing: border-box;
        }
      }
    `;
		document.head.appendChild(style);

		window.print();

		style.remove();
	};

	const [, setSizeModifier] = useSizeModifier();
	const [emblaApi, setEmblaApi] = useState<any>();
	return (
		<>
			<Modal
				// bg='#F4F4F4'
				styles={{ inner: { backgroundColor: '#F4F4F4' } }}
				opened={opened}
				onClose={close}
				closeButtonProps={{
					icon: (
						<ActionIcon variant='white' radius={'xl'}>
							<MdClear size={20} color='#B82929' />
						</ActionIcon>
					),
				}}
				fullScreen>
				<Carousel h={'85vh'} getEmblaApi={(e) => setEmblaApi(e)} style={{ position: 'relative' }}>
					{images?.map((item: any, index: number) => (
						<CarouselSlide
							key={index}
							style={{
								position: 'relative',
								height: '85vh',
								overflow: 'hidden',
							}}>
							<Image
								mah='70vh'
								w='85vw'
								h='auto'
								mx='auto'
								src={item.url}
								alt={item.caption}
								style={{
									width: '100%',
									// height: '100%',
									objectFit: 'contain', // Maintain aspect ratio and prevent distortion
								}}
							/>
							<Paper
								px={{ base: '0rem', sm: '1rem', md: '3rem', lg: '3.8rem', xl: '5.6rem', xl2: '9rem' }}
								bg={'transparent'}>
								{item.caption ? <BaseLabel description={item.caption} /> : ''}
							</Paper>
							<Paper
								pt={'1rem'}
								px={{ base: '0rem', sm: '1rem', md: '3rem', lg: '3.8rem', xl: '5.6rem', xl2: '9rem' }}
								bg={'transparent'}>
								<BaseCredits credits={item.credits} />
							</Paper>
						</CarouselSlide>
					))}
				</Carousel>

				<Group justify='center' gap={'lg'} pt={width >= 768 ? '0' : width >= 424 ? '2rem' : '3rem'}>
					<Button
						variant='outline'
						color='#B82929'
						radius={'3rem'}
						style={{ border: '2px solid ' }}
						onClick={() => emblaApi?.scrollPrev()}
						leftSection={<MdKeyboardArrowLeft size={20} color='#B82929' />}>
						Prev
					</Button>
					<Button
						radius={'3rem'}
						color='#B82929'
						onClick={() => {
							handleShare(images[emblaApi?.selectedScrollSnap() || 1].url, 'Image Link');
						}}>
						<Group gap={'4px'}>
							<ShareIconWhite />
							<Text
								style={{
									fontSize: '0.75rem',
									fontFamily: 'Noto Sans',
									fontWeight: 500,
									lineHeight: '1.2rem',
									letterSpacing: '-0.0225rem',
								}}>
								Share
							</Text>
						</Group>
					</Button>
					<Button
						variant='outline'
						color='#B82929'
						radius={'3rem'}
						style={{ border: '2px solid ' }}
						onClick={() => emblaApi?.scrollNext()}
						rightSection={<MdOutlineKeyboardArrowRight size={20} color='#B82929' />}>
						Next
					</Button>
				</Group>
			</Modal>
			<Button
				px={width >= 374 ? '1rem' : '12px'}
				mx={width >= 1024 ? '12px' : '8px'}
				variant='outline'
				color='#B82929'
				radius={'3rem'}
				style={{ border: '2px solid ' }}
				onClick={open}>
				<Group gap={'4px'}>
					<PhotoIcon />
					<Text
						style={{
							fontSize: '0.75rem',
							fontFamily: 'Noto Sans',
							fontWeight: 500,
							lineHeight: '1.2rem',
							letterSpacing: '-0.0225rem',
						}}
						visibleFrom='lg'>
						Photo Story
					</Text>
				</Group>
			</Button>
			<Button
				px={width >= 374 ? '1rem' : '12px'}
				mx={width >= 1024 ? '12px' : '8px'}
				variant='outline'
				color='#B82929'
				radius={'3rem'}
				style={{ border: '2px solid ' }}
				onClick={() => handleShare(window.location.href, 'Article Link')}>
				<Group gap={'4px'}>
					<ShareIcon />
					<Text
						style={{
							fontSize: '0.75rem',
							fontFamily: 'Noto Sans',
							fontWeight: 500,
							lineHeight: '1.2rem',
							letterSpacing: '-0.0225rem',
						}}
						visibleFrom='lg'>
						Share
					</Text>
				</Group>
			</Button>
			<Button
				px={width >= 374 ? '1rem' : '12px'}
				mx={width >= 1024 ? '12px' : '8px'}
				variant='outline'
				color='#B82929'
				radius={'3rem'}
				style={{ border: '2px solid ' }}
				onClick={handlePrint}>
				<Group gap={'4px'}>
					<PrinterIcon />
					<Text
						style={{
							fontSize: '0.75rem',
							fontFamily: 'Noto Sans',
							fontWeight: 500,
							lineHeight: '1.2rem',
							letterSpacing: '-0.0225rem',
						}}
						visibleFrom='lg'>
						Print
					</Text>
				</Group>
			</Button>

			<Button
				px={width >= 374 ? '1rem' : '12px'}
				mx={width >= 1024 ? '12px' : '8px'}
				variant='outline'
				radius={'3rem'}
				color='#B82929'
				style={{ border: '2px solid ' }}>
				<Group justify='center' gap={width >= 390 ? '12px' : '2px'}>
					<ActionIcon
						variant='transparent'
						style={{ border: '0px' }}
						onClick={() => {
							setSizeModifier((prev) => prev - 0.1);
						}}>
						<SubstractIcon />
					</ActionIcon>
					<TextIcon />
					<ActionIcon
						variant='transparent'
						style={{ border: '0px' }}
						onClick={() => {
							setSizeModifier((prev) => prev + 0.1);
						}}>
						<IncreaseIcon />
					</ActionIcon>
				</Group>
			</Button>
		</>
	);
};

export default FloatingIcons;
