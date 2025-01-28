import Link from 'next/link';
import Item from './Item';
import BannerItem from '@/pages/library/bannerItem';

export default function Focus(props: any) {
	// console.log('sdfsdfsd',props)
	return (
		<>
			{props?.item?.map((pariProject: any, index: number) => (
				<Link href={pariProject?.link ?? pariProject?.page_url ?? '/'} key={pariProject?.title}>
					<BannerItem item={pariProject} isLibrary={props.isLibrary} index={index} />

					{/* <Item item={pariProject} isLibrary={props.isLibrary} index={index} /> */}
				</Link>
			))}
		</>
	);
}
