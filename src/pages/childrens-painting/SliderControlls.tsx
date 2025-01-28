import { LeftIcon, RightIcon } from '../../component/Icon';

import Image from 'next/image';
import { Play } from '@/component/Card';
import styles from './Children.module.css';

export default function SliderControlls({ refSlider, setChanged, changed, src, src2, noimages }: any) {
	const state = refSlider?.current?.state;

	return (
		<div className={`${styles.controls} ${noimages ? styles.noimages : ''}`}>
			<button
				disabled={state?.activeIndex === 0}
				className={`${styles.left} ${state?.activeIndex === 0 ? styles.disable : ''}`}
				onClick={() => {
					refSlider?.current?.slidePrev();
					setTimeout(() => {
						setChanged?.(!changed);
					}, 300);
				}}>
				<LeftIcon />
			</button>
			{noimages ? null : (
				<div style={{ display: 'flex', gap: 10 }}>
					{refSlider?.current?.props?.children?.map((item: any, index: number) => {
						const props = item?.props?.children?.props;
						const type = item?.props?.children?.type === 'iframe';
						const t = Array.isArray(item);

						return (
							<>
								{t ? (
									<>
										{item.map((_item, i: number) => (
											<button
												key={index + 1}
												className={`${styles.thumnail} ${
													state?.activeIndex === index + i ? styles['thumnail-active'] : ''
												}`}
												onClick={() => {
													refSlider?.current?.goTo(index + i);
													setTimeout(() => {
														setChanged?.(!changed);
													}, 300);
												}}>
												<div className={`${styles.thumb}`} key={_item}>
													<Image src={src2} alt={props?.alt} width='60' height='60' loading='lazy' />
													<Play />
												</div>
											</button>
										))}
									</>
								) : (
									<button
										key={index}
										className={`${styles.thumnail} ${
											state?.activeIndex === index ? styles['thumnail-active'] : ''
										}`}
										onClick={() => {
											refSlider?.current?.goTo(index);
											setTimeout(() => {
												setChanged?.(!changed);
											}, 300);
										}}>
										<Image src={src} alt={props?.alt} width='60' height='60' loading='lazy' />
									</button>
								)}
							</>
						);
					})}
				</div>
			)}

			<button
				disabled={state?.activeIndex === (state?.pages?.length ?? 0) - 1}
				className={`${styles.right} ${state?.activeIndex === (state?.pages?.length ?? 0) - 1 ? styles.disable : ''}`}
				onClick={() => {
					refSlider?.current?.slideNext();
					setTimeout(() => {
						setChanged?.(!changed);
					}, 300);
				}}>
				<RightIcon />
			</button>
		</div>
	);
}
