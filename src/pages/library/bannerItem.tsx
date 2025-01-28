import React from 'react';
import { BASE_URL } from '@/config';
import { get } from '@/utils';
import { useMediaQuery } from 'react-responsive';

export default function BannerItem(props: any) {
  const desktopurl = get(props.item, 'image.data.attributes.url', '');
  const mobileurl = get(props.item, 'mobilecover.data.attributes.url', '');

  const isMobile = useMediaQuery({ maxWidth: 1023 }); // Adjust the maxWidth as per your md breakpoint

  const getBackgroundImage = () => {
    const url = isMobile ? BASE_URL + mobileurl : BASE_URL + desktopurl;
    return `url(${url})`;
  };

  return (
    <div
      className="bg-[#363636] xs:w-[19.4375rem] sm:w-[19.4375rem] sm2:w-[19.4375rem] sm3:w-[19.4375rem] md:w-[19.4375rem] lg:w-[37.6875rem] xl:w-[37.6875rem] 2xl:w-[41.6875rem] 3xl:w-[41.6875rem] 
      xs:h-[25.125rem] sm:h-[25.125rem] sm2:h-[25.125rem] sm3:h-[25.125rem] md:h-[25.125rem] lg:h-[25.25rem] xl:h-[25.25rem] 2xl:h-[25.25rem] 3xl:h-[25.25rem] 
      
      
      rounded-[0.75rem] overflow-hidden 
     "
      style={{
        backgroundImage: getBackgroundImage(),
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
    
    </div>
  );
}
