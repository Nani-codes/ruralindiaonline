import { get, map } from '@/utils';
import { BASE_URL } from '@/config';
import FilterHeader from '@/common/Articles/components/FilterHeader';
import Head from '@/common/Head';
import Header from '../../common/Header';
import Link from 'next/link';
import SearchHeader from '@/common/Header/SearchHeader';
import axios from 'axios';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import classes from './index.module.css';

const Card = dynamic(() => import('@/common/Articles/components/Card'), { ssr: false });
const Pagination = dynamic(() => import('@/common/Articles/components/Pagination'), { ssr: false });

function sortArticles(list, searchText) {
  const lowerCaseSearchText = searchText.toLowerCase();

  return list.sort((a, b) => {
    const isAuthorMatchA = a.attributes.Authors.some(
      (author) =>
        author.author_role.data.attributes.Name === 'Author' &&
        author.author_name.data.attributes.Name.toLowerCase().includes(lowerCaseSearchText)
    );
    const isAuthorMatchB = b.attributes.Authors.some(
      (author) =>
        author.author_role.data.attributes.Name === 'Author' &&
        author.author_name.data.attributes.Name.toLowerCase().includes(lowerCaseSearchText)
    );

    const isTitleMatchA = a.attributes.Title.toLowerCase().includes(lowerCaseSearchText);
    const isTitleMatchB = b.attributes.Title.toLowerCase().includes(lowerCaseSearchText);

    if (isAuthorMatchA !== isAuthorMatchB) {
      return isAuthorMatchA ? -1 : 1;
    }

    if (isTitleMatchA !== isTitleMatchB) {
      return isTitleMatchA ? -1 : 1;
    }

    return 0;
  });
}

export default function Articles({ data, searchAuthor }) {
  const { query } = useRouter();
  const list = get(data, 'data', []);
  const pagination = get(data, 'meta.pagination', {});
  const { search } = query;

  const sortedList = searchAuthor ? sortArticles(list, searchAuthor) : list;

  return (
    <div>
      <Head
        title="People's Archive of Rural India"
        description="A journalism website reporting the stories of 833 million rural Indians. An archive of the living past, a journal of the present, a textbook of the future."
        keywords="rural india, archive, online archive, pari, p sainath, sainath,"
      />
      {search ? <SearchHeader /> : <Header />}
      <FilterHeader params={{ ...query }} pagination={pagination} size={sortedList.length} />
      <div className="max-width-container min-h-300 container">
        <div className="3xl:px-[104px] 2xl:px-[104px] xl:px-[104px] lg:px-[104px] md:px-[32px] sm:px-[32px] pb-[46px] pt-[56px]">
          <div className="grid grid-rows-none grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-2 gap-4 xs:px-[2rem] sm:px-[2rem] sm2:px-[2rem] sm3:px-[2rem] md:px-[2rem]">
            {map(sortedList, (article) => {
              const href = `/article/${encodeURI(get(article, 'attributes.slug', ''))}`;
              return (
                <Link className="w-full" href={href} key={href}>
                  <Card article={article} />
                </Link>
              );
            })}
          </div>
          <div className="border-b border-gray-5 dark:border-gray-2 my-[55px] w-full" />
          <Pagination params={{ ...query }} pagination={pagination} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ locale, query }) {
  let date;
  const { authorName, tags, type, dateRange, searchText, location, page } = query || {};
  const categoryIdQuery = query?.categoryIds ?? undefined;
  const categoryIds = categoryIdQuery ? categoryIdQuery.split(',') : undefined;

  if (dateRange) {
    date = dayjs().subtract(dateRange, 'day').format('YYYY-MM-DD');
  }

  const types = type
    ?.split(',')
    .map((t) => t.trim().toLowerCase())
    .filter((item) => item);

  const params = {
    populate: 'deep',
    locale,
    'filters[$or][0][Title][$containsi]': searchText || undefined,
    'filters[$or][1][Authors][author_name][Name][$containsi]': searchText || undefined,
    'filters[$or][2][tags][Title][$containsi]': searchText || undefined,
    'filters[categories][id][$in]': categoryIds,
    'filters[type][$in]': types?.length ? types : undefined,
    'filters[publishedAt][$gte]': date || undefined,
    'filters[$or][3][location][name][$contains]': location || undefined,
    'filters[$or][4][location][region][$contains]': location || undefined,
    'filters[$or][5][location][state][$contains]': location || undefined,
    'filters[$or][6][location][district][$contains]': location || undefined,
    'filters[$or][7][location][sub_district_name][$contains]': location || undefined,
    'filters[Authors][author_name][Name][$containsi]': authorName || undefined,
    sort: 'publishedAt:desc',
    'pagination[page]': page || 1,
    'pagination[pageSize]': 16,
  };

  try {
    const res = await axios({
      url: `${BASE_URL}api/articles`,
      method: 'GET',
      params,
    });

    return {
      props: {
        messages: require(`@/locales/${locale}.json`),
        data: res.data,
        searchAuthor: searchText || null,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    };
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}