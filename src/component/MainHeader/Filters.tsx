import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../Button';
import Tabs from '../Tabs';
import FilterForm from './FilterForm';
import styles from './MainHeader.module.css';

export default function Filters({
  options,
  setActive,
  active,
  isFilter,
  setfilter,
}: any) {
  const { push, query } = useRouter();
  const [activeTab, setActiveTab] = useState('Categories');
  const [authorName, setAuthorName] = useState<any>('');
  const [location, setLocation] = useState<any>('');
  const [contentType, setContentType] = useState<any>('');
  const [dateRange, setDateRange] = useState<any>('');
  const onClick = (e: any, item: string) => {
    e.preventDefault();
    setActive(item);
  };

  const onClose = (e: any) => {
    e?.preventDefault?.();
    setfilter(false);
  };

  const navigate = () => {
    push({
      pathname: 'search',
      query: {
        categoryIds: active,
        authorName,
        location,
        dateRange,
        type: contentType,
      },
    });

    setActive(false);
  };

  useEffect(() => {
    setActive(query?.categoryIds ?? '');
    setAuthorName(query?.authorName ?? '');
    setLocation(query?.location ?? '');
    setContentType(query?.type ?? '');
    setDateRange(query?.dateRange ?? '');
  }, [
    query?.authorName,
    query?.categoryIds,
    query?.dateRange,
    query?.location,
    query?.type,
    setActive,
  ]);

  return (
    <>
      <div
        className={styles['filter-wrapper']}
        style={{ right: isFilter ? 0 : -548 }}
      >
        <div className={styles['filter-header']}>
          <Link href="/" onClick={onClose}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 1L1 11M1 1L11 11"
                stroke="#B82929"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <Tabs
            active={activeTab}
            tabs={[
              {
                label: 'Categories',
                id: 'Categories',
                onClick: () => setActiveTab('Categories'),
              },
              {
                label: 'Filters',
                id: 'Filters',
                onClick: () => setActiveTab('Filters'),
              },
            ]}
          />
        </div>

        <div className={styles['filter-contents']}>
          <div
            className={`${styles['filter-content']} ${
              activeTab === 'Categories' ? styles['content-active'] : ''
            }`}
          >
            <h1>Choose a category of interest</h1>
            <div className={styles['filter-items']}>
              {options?.categories?.data?.map((category: any) => (
                <Link
                  key={category?.attributes?.Title}
                  href="/"
                  onClick={(e) => onClick(e, category?.id)}
                  style={{
                    background: `linear-gradient(360deg, ${
                      category?.id === active ? '#B82929' : '#000000'
                    } 10.82%, rgba(0, 0, 0, 0) 92.31%), url(${
                      process.env.NEXT_PUBLIC_API_URL
                    }${
                      category?.attributes?.category_image?.data?.attributes
                        ?.url
                    })`,
                    backgroundColor: 'black',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                  }}
                  className={styles['filter-item']}
                >
                  <h2>{category?.attributes?.Title}</h2>
                </Link>
              ))}
            </div>
          </div>
          <div
            className={`${styles['filter-content']} ${
              activeTab === 'Filters' ? styles['content-active'] : ''
            }`}
          >
            <h1>Choose filters to apply</h1>
            <FilterForm
              data={{
                authorName,
                location,
                setAuthorName,
                setLocation,
                setDateRange,
                dateRange,
                contentType,
                setContentType,
              }}
            />
          </div>
        </div>

        <div className={styles['filter-footer']}>
          <Button label="Confirm Selection" onClick={navigate} />
        </div>
      </div>
      <div
        className={styles['filter-overlay']}
        style={{ display: isFilter ? 'block' : 'none' }}
        onClick={onClose}
      />
    </>
  );
}
