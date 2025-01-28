import { HEADERS, HttpMethod, apiRoutes } from '@/utils/endpoints';
import API from './api';

class Common extends API {
  /**
   */
  public constructor() {
    super(process.env.NEXT_PUBLIC_API_URL || '');
  }

  public getAllCategories = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.categories,
      headers: HEADERS,
      params
    });

  public getHomePageAdminAccess = (locale: string) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.homePageEditorsChoice(locale),
      headers: HEADERS,
    });
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new Common();
