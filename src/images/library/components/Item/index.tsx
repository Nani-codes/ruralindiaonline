import styles from '../../../../styles/library.module.css';
import Image from 'next/image';
import { HeadingOne, RegularText, Label, LabelDesc } from '@/component/Text';
import Link from 'next/link';
import MapService from '@/Services/MapService';
import { useCallback, useEffect, useState } from 'react';

export default function Item({ item }: any) {
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
    <Link href={`/library/${slug}`} className={styles['card']}>
      <div className={styles.img}>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${url}`}
          width={199}
          height={262}
          alt={Title}
          style={{width: 199, height: 262}}
        />
      </div>
      <div>
        <HeadingOne>{Title}</HeadingOne>
        <RegularText className={styles.desc}>{city}</RegularText>
        {/* strap */}
        <Label className={styles['date']}>
          {`Focus and Highlights`}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 8H15M15 8L8 1M15 8L8 15"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Label>
      </div>
    </Link>
  );
}
