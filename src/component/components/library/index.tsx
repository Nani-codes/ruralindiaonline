import Image from 'next/image';
import styles from './Library.module.css';
import Link from 'next/link';
import { HeadingOne, Label, LabelDesc } from '@/component/Text';

export default function Library(props: any) {
  return (
    <>
      {props.item?.map((libraryArticle: any) => {
        const {
          attributes: {
            Title,
            slug,
            tags: { data },
            Thumbnail: {
              data: {
                attributes: { url },
              },
            },
          },
        } = libraryArticle;
        return (
          <Link
            href={`/library/${slug}`}
            key={Title}
            className={styles['card']}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${url}`}
              width={256}
              height={336}
              alt={Title}
            />
            <div className={styles['content']}>
              {/* <div className={styles['tags']}>
                {data?.map((categorie: any) => (
                  <button key={categorie?.attributes?.Title}>
                    <LabelDesc>{categorie?.attributes?.Title}</LabelDesc>
                  </button>
                ))}
              </div> */}
              <div className={styles['tags']}>
                {data?.slice(0, 1)?.map((categorie: any) => (
                  <button key={categorie?.attributes?.Title}>
                    <LabelDesc>{categorie?.attributes?.Title}</LabelDesc>
                  </button>
                ))}
                {data?.length ? (
                  <button>
                    <LabelDesc>{`+${data?.length - 1}`}</LabelDesc>
                  </button>
                ) : null}
              </div>

              <HeadingOne>{Title}</HeadingOne>
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
      })}
    </>
  );
}
