import { Fragment } from 'react';

import styles from './LibraryDetails.module.css';
import styles1 from '@/styles/libraryDetails.module.css';

import moment from 'moment';
import Image from 'next/image';
import { Label, LabelDesc } from '@/component/Text';
import Button from '@/component/Button';
import Tabs from '@/component/Tabs';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import copy from 'clipboard-copy';
import { json } from 'stream/consumers';
import SliderItems from '../Item/sliderItems';

export default function LibraryDetails({ data, libraries }: any) {
	const attributes = data?.attributes;
	const [activeTab, setActiveTab] = useState('Focus');

	useEffect(() => {
		// console.log('Data', data);
	}, []);

	const copyRight = attributes?.content?.filter((item: any) => item?.__component === 'library.copy-right')[0];
	const focus = attributes?.content?.filter((item: any) => item?.__component === 'library.focus')[0];
	// const author = attributes?.authors?.data
	//   ?.map((item: any) => item?.attributes?.Name)
	//   ?.join(' and ');
	const tags = attributes?.tags?.data?.map((item: any) => `#${item?.attributes?.Title}`.replace(' ', '-'))?.join(', ');

	const factiods = attributes?.content?.filter((factiod: any) => factiod?.__component === 'library.highlights');
	const author = attributes?.content?.filter((author: any) => author?.__component === 'library.authors')[0];

	// console.log(data, 'attributes');

	const createdDate = attributes?.createdAt;

	const handleButtonClick = () => {
		const pageUrl = window.location.href;
		copy(pageUrl);
		// You can also provide feedback to the user, e.g., show a tooltip or toast
		alert('URL copied to clipboard!');
	};
	// console.log(`${process.env.NEXT_PUBLIC_API_URL}${attributes?.Thumbnail?.data?.attributes?.url}`);
	return (
		<div className={''}>
			<div
				className=' overflow-hidden content-sec flex justify-center xs:flex-col sm:flex-col sm2:flex-col sm3:flex-col md:flex-col flex-row 

          xs:px-[40px]  sm:px-[40px] sm2:px-[40px] sm3:px-[56px] md:px-[74px] lg:px-[56px] xl:px-[56px] 2xl:px-[156px] 3xl:px-[348px] pt-[16px] 

          xs:space-y-[16px] sm:space-y-[16px] sm2:space-y-[16px] sm3:space-y-[16px] md:space-y-[16px] 

          lg:space-x-[93px] xl:space-x-[93px] 2xl:space-x-[93px] 3xl:space-x-[93px] 

          xs:mt-[2.5rem] sm:mt-[2.5rem] sm2:mt-[2.5rem] sm3:mt-[2.5rem]  mt-[3rem] w-full'>
				<div className='rtl:ml-[3rem] xs:min-w-full sm:min-w-[40%] sm2:min-w-[40%] sm3:min-w-[40%] md:min-w-[40%] lg:min-w-[216px] xl:min-w-[274px] 2xl:min-w-[288px] 3xl:min-w-[288px] xs:max-w-full lg:max-w-[288px] xl:max-w-[288px] 2xl:max-w-[288px] 3xl:max-w-[288px] '>
					<div
						className='xs:block sm:block sm2:block sm3:block lg:hidden xl:hidden 2xl:hidden 3xl:hidden
        
                      lg:mt-[40px] xl:mt-[40px] 2xl:mt-[40px] 3xl:mt-[40px]
        '>
						<h2
							className='flex font-sans font-semibold  not-italic antialiased uppercase
            xs:text-[0.8125rem] sm:text-[0.8125rem] sm2:text-[0.8125rem ] sm3:text-[0.8125rem] md:text-[0.9375rem] text-[0.9375rem]
						 
						text-[#828282] dark:text-white leading-normal 
						
						xs:tracking-[-0.01625rem] sm:tracking-[-0.01625rem] sm2:tracking-[-0.01625rem] sm3:tracking-[-0.01625rem] md:tracking-[-0.01625rem] tracking-[- 0.01875rem]     
						
						break-words text-ellipsis   '>
							<svg
								className='rtl:ml-[1rem] mr-[8px]'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M12 21L11.8999 20.8499C11.2053 19.808 10.858 19.287 10.3991 18.9098C9.99286 18.5759 9.52476 18.3254 9.02161 18.1726C8.45325 18 7.82711 18 6.57482 18H5.2C4.07989 18 3.51984 18 3.09202 17.782C2.71569 17.5903 2.40973 17.2843 2.21799 16.908C2 16.4802 2 15.9201 2 14.8V6.2C2 5.07989 2 4.51984 2.21799 4.09202C2.40973 3.71569 2.71569 3.40973 3.09202 3.21799C3.51984 3 4.07989 3 5.2 3H5.6C7.84021 3 8.96031 3 9.81596 3.43597C10.5686 3.81947 11.1805 4.43139 11.564 5.18404C12 6.03968 12 7.15979 12 9.4M12 21V9.4M12 21L12.1001 20.8499C12.7947 19.808 13.142 19.287 13.6009 18.9098C14.0071 18.5759 14.4752 18.3254 14.9784 18.1726C15.5467 18 16.1729 18 17.4252 18H18.8C19.9201 18 20.4802 18 20.908 17.782C21.2843 17.5903 21.5903 17.2843 21.782 16.908C22 16.4802 22 15.9201 22 14.8V6.2C22 5.07989 22 4.51984 21.782 4.09202C21.5903 3.71569 21.2843 3.40973 20.908 3.21799C20.4802 3 19.9201 3 18.8 3H18.4C16.1598 3 15.0397 3 14.184 3.43597C13.4314 3.81947 12.8195 4.43139 12.436 5.18404C12 6.03968 12 7.15979 12 9.4'
									stroke='#B82929'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
							Library/ Gender
						</h2>

						<h1
							className='font-serif font-semibold  not-italic antialiased uppercase
            xs:text-[2.5rem] sm:text-[2.5rem] sm2:text-[2.5rem] sm3:text-[2.5rem] md:text-[2.5rem] text-[0.9375rem]
						 
						text-[#202020] dark:text-white leading-[3.05rem] 
						
						xs:tracking-[-0.075rem] sm:tracking-[-0.075rem] sm2:tracking-[-0.075rem] sm3:tracking-[-0.075rem] md:tracking-[-0.075rem] tracking-[- 0.01875rem]     
						
						break-words text-ellipsis mt-[0.5rem]'>
							{attributes?.Title}
						</h1>
					</div>
					<div
						className='testing bg-red xs:tracking-[-0.075rem] sm:tracking-[-0.075rem]  sm2:tracking-[-0.075rem] sm3:tracking-[-0.075rem] md:tracking-[-0.075rem] tracking-[- 0.01875rem] 

 w-full 
'>
						<Image
							className='rounded-[16px] xs:w-[16.875rem] sm:w-[16.875rem] sm2:w-[16.875rem] sm3:w-[16.875rem] md:w-[16.875rem] w-full  xs:mt-[2rem] sm:mt-[2rem] sm2:mt-[2rem] sm3:mt-[2rem] md:mt-[2rem] mt-[- 0.01875rem]'
							src={`${process.env.NEXT_PUBLIC_API_URL}${attributes?.Thumbnail?.data?.attributes?.url}`}
							alt={attributes?.slug}
							width='1000'
							height='386'
							loading='lazy'
						/>
						<div className='h-[0.0625rem] w-full bg-[#E0E0E0] xs:my-[3rem] sm:my-[3rem] sm2:my-[3rem] sm3:my-[3rem]  md:my-[3rem]  lg:my-[3rem] xl:my-[3rem] 2xl:my-[3rem] 3xl:my-[3rem]' />
						<p
							className='font-sans font-semibold  not-italic antialiased uppercase 
						 
						 xs:text-[0.8125rem] sm:text-[0.8125rem] sm2:text-[0.8125rem ] sm3:text-[0.8125rem] md:text-[0.8125rem] text-[0.9375rem]
						 
						text-[#828282] dark:text-white leading-normal 

            xs:tracking-[-0.01625rem] sm:tracking-[-0.01625rem] sm2:tracking-[-0.01625rem] sm3:tracking-[-0.01625rem] md:tracking-[-0.01625rem] tracking-[-0.01875rem] 
						
						xs:w-[18.5rem] sm:w-[18.5rem] sm2:w-[18.5rem] sm3:w-[18.5rem] md:w-[18.5rem] w-full     
						
						break-words text-ellipsis overflow-hidden '>
							Published On
						</p>

						<p
							className='font-sans font-semibold  not-italic antialiased uppercase 
						 
						 xs:text-[0.8125rem] sm:text-[0.8125rem] sm2:text-[0.8125rem ] sm3:text-[0.8125rem] md:text-[0.9375rem] text-[0.9375rem]
						 
						text-[#B82929] dark:text-white leading-normal 
						
						xs:tracking-[-0.01625rem] sm:tracking-[-0.01625rem] sm2:tracking-[-0.01625rem] sm3:tracking-[-0.01625rem] md:tracking-[-0.01625rem] tracking-[- 0.01875rem]     
						
						break-words text-ellipsis overflow-hidden
            
            xs:mt-[0.9375rem] sm:mt-[0.9375rem] sm2:mt-[0.9375rem] sm3:mt-[0.9375rem] md:mt-[0.9375rem] lg:mt-[0.9375rem] xl:mt-[0.9375rem] 2xl:mt-[0.9375rem] 3xl:mt-[0.9375rem]  '>
							{moment(createdDate).format('MMM DD, YYYY')}
						</p>

						{/* <LabelDesc className={styles.tags}>
         {moment(createdDate).format('MMM DD, YYYY')}
</LabelDesc> */}
						<div className='xs:my-[2.5rem] sm:my-[2.5rem] sm2:my-[2.5rem] sm3:my-[2.5rem] md:my-[2.5rem] my-[2.5rem] '>
							<p
								className='font-sans font-semibold  not-italic antialiased uppercase 
						 
						 xs:text-[0.8125rem] sm:text-[0.8125rem] sm2:text-[0.8125rem ] sm3:text-[0.8125rem] md:text-[0.8125rem] text-[0.9375rem]
						 
						text-[#828282] dark:text-white leading-normal 
						
						xs:tracking-[-0.01625rem] sm:tracking-[-0.01625rem] sm2:tracking-[-0.01625rem] sm3:tracking-[-0.01625rem] md:tracking-[-0.01625rem] tracking-[-0.01875rem]     
						
						break-words text-ellipsis overflow-hidden '>
								Tags
							</p>
							{/* <Label>Tags</Label> */}

							<LabelDesc className='mt-[1rem]'>
								{attributes?.tags?.data?.map((i: any) => {
									return (
										<span
											key={i.id}
											className='font-sans font-medium  not-italic antialiased uppercase underline
						 
						 xs:text-[0.8125rem] sm:text-[0.8125rem] sm2:text-[0.8125rem ] sm3:text-[0.8125rem] md:text-[0.9375rem] text-[0.9375rem]
						 
						text-[#B82929] dark:text-white leading-[180%] 
						
						xs:tracking-[-0.01875rem] sm:tracking-[-0.01875rem] sm2:tracking-[-0.01875rem] sm3:tracking-[-0.01875rem] md:tracking-[-0.01875rem] tracking-[- 0.01875rem]     
						
						break-words text-ellipsis overflow-hidden '>
											#{i.attributes.Title}
										</span>

										// <span key={i.id} className={styles.tag}>
										//   {i.attributes.Title}
										// </span>
									);
								})}
							</LabelDesc>
						</div>
						<div className='flex space-x-[1.5rem]'>
							<Link
								href={`${process.env.NEXT_PUBLIC_API_URL}${attributes?.Document?.data?.attributes?.url}`}
								passHref={true}
								target='_blank'
								className='min-w-max'>
								<button
									type='button'
									className='
             
             rounded-[3rem] bg-transparent min-w-max flex space-x-[0.5rem] text-[#B82929] text-[1rem] font-medium not-italic	 font-sans leading-normal

              xs:px-[1.75rem] sm:px-[1.75rem] sm2:px-[1.75rem] sm3:px-[1.75rem] md:px-[1.75rem] px-[1.75rem]
              xs:py-[0.875rem] sm:py-[0.875rem] sm2:py-[0.875rem] sm3:py-[0.875rem] md:py-[0.875rem] py-[0.875rem]  
              
              xs:border-2 sm:border-2 sm2:border-2 sm3:border-2 md:border-2 border-2  
              xs:border-solid sm:border-solid sm2:border-solid sm3:border-solid md:border-solid border-solid
              xs:border-[#B82929] sm:border-[#B82929] sm2:border-[#B82929] sm3:border-[#B82929] md:border-[#B82929]  border-[#B82929] 
              
             
              
              '>
									<svg
										className='w-[1.25rem] h-[1.25rem]'
										viewBox='0 0 18 18'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M16.5 16.5H1.5M14 8.16667L9 13.1667M9 13.1667L4 8.16667M9 13.1667V1.5'
											stroke='#B82929'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
									<span>View PDF</span>
								</button>
							</Link>
							<button
								type='button'
								className='
            
            rounded-[3rem] bg-transparent min-w-max flex space-x-[0.5rem] text-[#B82929] text-[1rem] font-medium not-italic	 font-sans leading-normal

              xs:px-[1.75rem] sm:px-[1.75rem] sm2:px-[1.75rem] sm3:px-[1.75rem] md:px-[1.75rem] px-[1.75rem]
              xs:py-[0.875rem] sm:py-[0.875rem] sm2:py-[0.875rem] sm3:py-[0.875rem] md:py-[0.875rem] py-[0.875rem]  
              
              xs:border-2 sm:border-2 sm2:border-2 sm3:border-2 md:border-2 border-2  
              xs:border-solid sm:border-solid sm2:border-solid sm3:border-solid md:border-solid border-solid
              xs:border-[#B82929] sm:border-[#B82929] sm2:border-[#B82929] sm3:border-[#B82929] md:border-[#B82929]  border-[#B82929]

              
              '
								onClick={handleButtonClick}>
								<svg
									className='w-[1.25rem] h-[1.25rem]'
									viewBox='0 0 18 16'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M16.3261 8.50617C16.5296 8.3318 16.6313 8.24461 16.6686 8.14086C16.7013 8.0498 16.7013 7.9502 16.6686 7.85914C16.6313 7.75539 16.5296 7.6682 16.3261 7.49383L9.26719 1.44331C8.917 1.14315 8.74191 0.993063 8.59367 0.989386C8.46483 0.986191 8.34177 1.04279 8.26035 1.14269C8.16667 1.25764 8.16667 1.48825 8.16667 1.94948V5.52886C6.38777 5.84007 4.75966 6.74146 3.54976 8.09489C2.23069 9.57043 1.50103 11.48 1.5 13.4591V13.9691C2.37445 12.9157 3.46626 12.0638 4.70063 11.4716C5.78891 10.9495 6.96535 10.6403 8.16667 10.5588V14.0505C8.16667 14.5117 8.16667 14.7424 8.26035 14.8573C8.34177 14.9572 8.46483 15.0138 8.59367 15.0106C8.74191 15.0069 8.917 14.8569 9.26719 14.5567L16.3261 8.50617Z'
										stroke='#B82929'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>

				<div className='xs:min-w-full sm:min-w-[60%] sm2:min-w-[60%] sm3:min-w-[60%] md:min-w-[60%] lg:min-w-[603px] xl:min-w-[771px] 2xl:min-w-[807px] 3xl:min-w-[808px] xs:max-w-full lg:max-w-[808px] xl:max-w-[808px] 2xl:max-w-[808px] 3xl:max-w-[808px] '>
					<div className='xs:hidden sm:hidden sm2:hidden sm3:hidden md:hidden lg:block xl:block 2xl:block 3xl:block'>
						<h2
							className='flex font-sans font-semibold  not-italic antialiased uppercase
            xs:text-[0.8125rem] sm:text-[0.8125rem] sm2:text-[0.8125rem ] sm3:text-[0.8125rem] md:text-[0.9375rem]  text-[0.9375rem]
						 
						text-[#828282] dark:text-white leading-normal 
						
						xs:tracking-[-0.01625rem] sm:tracking-[-0.01625rem] sm2:tracking-[-0.01625rem] sm3:tracking-[-0.01625rem] md:tracking-[-0.01625rem] tracking-[- 0.01875rem]     
						
						break-words text-ellipsis   '>
							<svg
								className='mr-[8px] rtl:ml-[1rem]'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M12 21L11.8999 20.8499C11.2053 19.808 10.858 19.287 10.3991 18.9098C9.99286 18.5759 9.52476 18.3254 9.02161 18.1726C8.45325 18 7.82711 18 6.57482 18H5.2C4.07989 18 3.51984 18 3.09202 17.782C2.71569 17.5903 2.40973 17.2843 2.21799 16.908C2 16.4802 2 15.9201 2 14.8V6.2C2 5.07989 2 4.51984 2.21799 4.09202C2.40973 3.71569 2.71569 3.40973 3.09202 3.21799C3.51984 3 4.07989 3 5.2 3H5.6C7.84021 3 8.96031 3 9.81596 3.43597C10.5686 3.81947 11.1805 4.43139 11.564 5.18404C12 6.03968 12 7.15979 12 9.4M12 21V9.4M12 21L12.1001 20.8499C12.7947 19.808 13.142 19.287 13.6009 18.9098C14.0071 18.5759 14.4752 18.3254 14.9784 18.1726C15.5467 18 16.1729 18 17.4252 18H18.8C19.9201 18 20.4802 18 20.908 17.782C21.2843 17.5903 21.5903 17.2843 21.782 16.908C22 16.4802 22 15.9201 22 14.8V6.2C22 5.07989 22 4.51984 21.782 4.09202C21.5903 3.71569 21.2843 3.40973 20.908 3.21799C20.4802 3 19.9201 3 18.8 3H18.4C16.1598 3 15.0397 3 14.184 3.43597C13.4314 3.81947 12.8195 4.43139 12.436 5.18404C12 6.03968 12 7.15979 12 9.4'
									stroke='#B82929'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
							Library / Gender
						</h2>

						<h1
							className='font-serif font-semibold  not-italic antialiased uppercase
            xs:text-[2.5rem] sm:text-[2.5rem] sm2:text-[2.5rem] sm3:text-[2.5rem] md:text-[2.5rem] lg:text-[3rem] text-[3.5rem]
						 
						text-[#202020] dark:text-white  leading-[122%] 
						
						xs:tracking-[-0.075rem] sm:tracking-[-0.075rem] sm2:tracking-[-0.075rem] sm3:tracking-[-0.075rem] md:tracking-[-0.075rem] lg:tracking-[-0.09rem] tracking-[-0.105rem ]     
						
						break-words text-ellipsis mt-[0.5rem]'>
							{attributes?.Title}
						</h1>
					</div>
					<div
						className={`border-t-solid border-[1px] border-[#E0E0E0] xs:mb-[16px] sm:mb-[16px] sm2:mb-[16px] sm3:mb-[16px] md:mb-[16px] lg:my-[16px] xl:my-[16px] 2xl:my-[16px] 3xl:my-[16px]`}
					/>
					<Tabs
						active={activeTab}
						tabs={[
							{
								label: 'Focus & Highlights',
								id: 'Focus',
								onClick: () => setActiveTab('Focus'),
							},
							{
								label: 'Credits',
								id: 'Credits',
								onClick: () => setActiveTab('Credits'),
							},
						]}
					/>
					<div className={styles.contents}>
						<div className={` ${activeTab === 'Focus' ? styles['content-active'] : ''}`}>
							{activeTab === 'Focus' && (
								<>
									<h1
										className='font-sans font-semibold  not-italic antialiased 
						 
						 xs:text-[1.125rem] sm:text-[1.125rem] sm2:text-[1.125rem ] sm3:text-[1.125rem] md:text-[1.125rem] text-[1.25rem]
						 
						xs:leading-[140%] sm:leading-[140%] sm2:leading-[140%] sm3:leading-[140%] md:leading-[140%]      
						 leading-[135%] 
						
						xs:tracking-[-0.045rem] sm:tracking-[-0.045rem] sm2:tracking-[-0.045rem] sm3:tracking-[-0.045rem] md:tracking-[-0.045rem] tracking-[-0.0625rem]     
						
						break-words text-ellipsis overflow-hidden
            
            xs:mt-[2rem] sm:mt-[2rem] sm2:mt-[2rem] sm3:mt-[2rem] md:mt-[2rem] lg:mt-[2rem] xl:mt-[2rem] 2xl:mt-[2rem] 3xl:mt-[2rem]'>
										Focus
									</h1>
									{/* {JSON.stringify(focus)} */}
									<div
										className='font-serif font-normal  not-italic antialiased
						 
                xs:text-[0.9375rem] sm:text-[0.9375rem] sm2:text-[0.9375rem ] sm3:text-[0.9375rem] md:text-[0.9375rem] text-[1rem]
                
               text-[#202020] dark:text-white leading-[1.59375rem] 
               
               xs:tracking-[-0.0375rem] sm:tracking-[-0.0375rem] sm2:tracking-[-0.0375rem] sm3:tracking-[-0.0375rem] md:tracking-[-0.0375rem] tracking-[-0.01rem]     
               
               break-words text-ellipsis overflow-hidden
               
               xs:mt-[0.5rem] sm:mt-[0.5rem] sm2:mt-[0.5rem] sm3:mt-[0.5rem] md:mt-[0.5rem] lg:mt-[0.5rem] xl:mt-[0.5rem] 2xl:mt-[0.5rem] 3xl:mt-[0.5rem]'
										dangerouslySetInnerHTML={{
											__html: focus?.Focus,
										}}
									/>

									<h1
										className='font-sans font-semibold  not-italic antialiased 
						 
						 xs:text-[1.125rem] sm:text-[1.125rem] sm2:text-[1.125rem ] sm3:text-[1.125rem] md:text-[1.125rem] text-[1.25rem]
						 
						xs:leading-[140%] sm:leading-[140%] sm2:leading-[140%] sm3:leading-[140%] md:leading-[140%]      
						 leading-[135%] 
						
						xs:tracking-[-0.045rem] sm:tracking-[-0.045rem] sm2:tracking-[-0.045rem] sm3:tracking-[-0.045rem] md:tracking-[-0.045rem] tracking-[-0.0625rem]     
						
						break-words text-ellipsis overflow-hidden
            
            xs:mt-[2rem] sm:mt-[2rem] sm2:mt-[2rem] sm3:mt-[2rem] md:mt-[2rem] lg:mt-[2rem] xl:mt-[2rem] 2xl:mt-[2rem] 3xl:mt-[2rem]'>
										Highlights
									</h1>

									<ol className={styles.sub_title}>
										{factiods?.map((factiod: any, index: any) => (
											<li
												className='!mx-0 flex font-serif font-normal  not-italic antialiased
						 
                  xs:text-[0.9375rem] sm:text-[0.9375rem] sm2:text-[0.9375rem ] sm3:text-[0.9375rem] md:text-[0.9375rem] text-[1rem]
                  
                 text-[#202020] dark:text-white leading-[1.59375rem] 
                 
                 xs:tracking-[-0.0375rem] sm:tracking-[-0.0375rem] sm2:tracking-[-0.0375rem] sm3:tracking-[-0.0375rem] md:tracking-[-0.0375rem] tracking-[-0.01rem]     
                 
                 break-words text-ellipsis overflow-hidden
                 
                 xs:mt-[0.5rem] sm:mt-[0.5rem] sm2:mt-[0.5rem] sm3:mt-[0.5rem] md:mt-[0.5rem] lg:mt-[0.5rem] xl:mt-[0.5rem] 2xl:mt-[0.5rem] 3xl:mt-[0.5rem]'>
												<span className='mr-2'>{index + 1}. </span>

												<span
													dangerouslySetInnerHTML={{
														__html: factiod?.highlights
															?.replaceAll('<li>', '<li><span>')
															.replaceAll('</li>', '</span></li>'), // .replaceAll('<p>','<span>' ).replaceAll('</p>', '</span>'),
													}}
													key={factiod?.highlights}
												/>
											</li>
										))}
									</ol>
								</>
							)}
						</div>

						<div className={`${styles['content-item']} ${activeTab === 'Credits' ? styles['content-active'] : ''}`}>
							{activeTab === 'Credits' && (
								<>
									<h1>Author</h1>
									<div
										className={styles.sub_title}
										dangerouslySetInnerHTML={{
											__html: author?.Authors,
										}}
									/>

									<h1>Copyright</h1>
									<div
										className={styles.sub_title}
										dangerouslySetInnerHTML={{
											__html: copyRight?.Copyright,
										}}
									/>
								</>
							)}
						</div>
					</div>
					<div className={`${styles1.relatedArticles}`}>
						<h3 className={`${styles1.sectionTitle}`}>
							<svg
								className='rtl:ml-[1rem]'
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'>
								<path
									d='M12 21L11.8999 20.8499C11.2053 19.808 10.858 19.287 10.3991 18.9098C9.99286 18.5759 9.52476 18.3254 9.02161 18.1726C8.45325 18 7.82711 18 6.57482 18H5.2C4.07989 18 3.51984 18 3.09202 17.782C2.71569 17.5903 2.40973 17.2843 2.21799 16.908C2 16.4802 2 15.9201 2 14.8V6.2C2 5.07989 2 4.51984 2.21799 4.09202C2.40973 3.71569 2.71569 3.40973 3.09202 3.21799C3.51984 3 4.07989 3 5.2 3H5.6C7.84021 3 8.96031 3 9.81596 3.43597C10.5686 3.81947 11.1805 4.43139 11.564 5.18404C12 6.03968 12 7.15979 12 9.4M12 21V9.4M12 21L12.1001 20.8499C12.7947 19.808 13.142 19.287 13.6009 18.9098C14.0071 18.5759 14.4752 18.3254 14.9784 18.1726C15.5467 18 16.1729 18 17.4252 18H18.8C19.9201 18 20.4802 18 20.908 17.782C21.2843 17.5903 21.5903 17.2843 21.782 16.908C22 16.4802 22 15.9201 22 14.8V6.2C22 5.07989 22 4.51984 21.782 4.09202C21.5903 3.71569 21.2843 3.40973 20.908 3.21799C20.4802 3 19.9201 3 18.8 3H18.4C16.1598 3 15.0397 3 14.184 3.43597C13.4314 3.81947 12.8195 4.43139 12.436 5.18404C12 6.03968 12 7.15979 12 9.4'
									stroke='#B82929'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
							More Reading
						</h3>
						<h1 className='dark:text-white'>Related reports you may find useful</h1>
					</div>

					<div className={styles1.row}>
						{libraries?.map((item: any, i: number) => (
							<Fragment key={`/library/${item?.attributes?.slug}`}>
								<SliderItems item={item} createdDate={item?.attributes?.createdAt} />

								{/* <Item item={item} /> */}
							</Fragment>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
