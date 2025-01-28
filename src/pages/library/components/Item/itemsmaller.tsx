import styles from '../../../../styles/library.module.css';
import Image from 'next/image';
import { HeadingOne, RegularText, Label, LabelDesc } from '@/component/Text';
import Link from 'next/link';
import MapService from '@/Services/MapService';
import { useCallback, useEffect, useState } from 'react';

export default function ItemSmaller({ item }: any) {
  const [city, setCity] = useState('');
  const {
    attributes: {
      Title,
      Location,
      slug,
      tags: { data },
      Thumbnail: {
        data: {
          attributes: { url },
        },
      },
    },
  } = {
    attributes: {
      Title: item?.attributes?.Title,
      Location: item?.attributes?.Location,
      slug: item?.attributes?.slug,
      tags: {
        data: item?.tags?.data,
      },
      Thumbnail: {
        data: {
          attributes: {
            url: item?.attributes?.Thumbnail?.data?.attributes?.url,
          },
        },
      },
    },
  };

  const getCity = useCallback(async () => {
    if (Location) {
      const loc = JSON.parse(Location);
      if (loc) {
        const result = await MapService.getAddress(`${loc.lat},${loc.lng}`);
        if (result.isOk()) {
          const { value } = result;
          setCity(value?.plus_code?.compound_code);
        }
      }
    }
  }, [Location]);

  useEffect(() => {
    getCity();
  }, [getCity]);

  return (
    <Link href={`/library/${slug}`} className={`card ${styles['card']}`}  style={{marginTop:48}}>
      <div >
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${url}`}
          width={201}
          height={262}
          alt={Title}
          style={{ width: 201, height: 262 }}
        />
      </div>
      <div className={`description  ${styles['description']}`} style={{  width:201 ,minHeight:75}}>
      <div className=" overflow-hidden" style={{ display: '-webkit-box',textOverflow: 'ellipsis',
 WebkitBoxOrient: 'vertical', overflow: 'hidden', WebkitLineClamp: 3 ,minHeight:75}}>
  <HeadingOne className="mb-2 font-bold text-lg leading-[25.2px] font-noto-sans" >
    {Title}
  </HeadingOne>
</div>
<h2 className={`desc  text-[0.75rem] text-[#828282] not-italic	 font-medium font-sans line-clamp-1 leading-[160%] tracking-[-0.0225rem] mt-[1rem] mb-[0.75rem]	`} ><div className=' break-words' dangerouslySetInnerHTML={{ __html: item?.attributes?.content[0]?.Authors }}></div> </h2>

{/* <RegularText className={`desc  ${styles['desc']}`}>Testing city</RegularText> */}
  {/* strap */}
  <Label className={`date ${styles['date']}`} >
    {`Focus and Highlights`}

    
  </Label>
</div>






    </Link>
  );
}