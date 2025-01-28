import { locale } from 'moment';

export const HEADERS = {};

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

export enum Versions {
  v1 = 'v1',
  v2 = 'v2',
  v3 = 'v3',
  v4 = 'v4',
}

export const apiRoutes = {
  article: {
    list: 'api/articles',
    get: (slug: string) =>
      `api/articles?locale=all&filters[slug][$eq]=${slug}&populate=deep,5`,
    related: (catId: number, articleId: number) =>
      `api/articles?filters[categories][id][$eq]=${catId}&filters[id][$ne]=${articleId}&populate=deep,5`,
    latest: (locale: string) =>
      `api/articles?&populate=deep,5&locale=${locale}&pagination[pageSize]=5&sort[0]=id:desc`,
  },
  search: 'api/fuzzy-search/search',
  articles: 'api/articles',
  children: `api/childrens-paintings`,
  childrenSlug: (slug: string) =>
    `api/childrens-paintings?locale=all&filters[slug][$eq]=${slug}&populate=deep,5`,
  library: `api/libraries`,
  libraryBanner: `api/library-banner`,
  languages: `api/i18n/locales`,
  categories: `api/categories`,
  rooms: `api/rooms`,
  homePageEditorsChoice: (locale: string) =>
    `api/home-page?populate=deep,5&locale=${locale}`,
  type: 'api/pari-content-types',
  edu: 'api/education',
  eduForm: 'api/reach-us-educations',
  grievance: 'api/grievance',
  storyOfPari: 'api/story-of-pari',
  termsOfService: 'api/terms-of-service',
  pSaninath: 'api/p-sainath',
  getInTouch: 'api/contact-us',
  copyRight: 'api/copyright',
  acknowledgment: 'api/acknowledgment',
  contribute: 'api/contribute',
  guidelines: 'api/guideline',
  faces: {
    facePage: 'api/face-page',
    face: 'api/faces',
  },
  freedom: {
    home: 'api/freedom-fighters-gallery',
    details: 'api/freedom-fighters'
  },
  testimonialContent: 'api/testimonial',
};

export const mapRoutes = {
  GetGeoAddress: (keyword: string) =>
    `geocode/json?result_type=street_address&location_type=ROOFTOP&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&latlng=${keyword}`,
};
