import { HEADERS, HttpMethod, apiRoutes } from '@/utils/endpoints';
import API from './api';
import { BASE_URL } from '@/config';

class ChildrenService extends API {
  /**
   */
  public constructor() {
    super(BASE_URL || '');
  }

  public getAllChildrenPosts = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.children,
      headers: HEADERS,
      params,      
    });

  public getChildrenBySlug = (slug: string) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.childrenSlug(slug),
      headers: HEADERS,
      
    });
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new ChildrenService();
