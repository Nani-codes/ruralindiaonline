import { HEADERS, HttpMethod, apiRoutes } from '@/utils/endpoints';
import API from './api';

class FreedomService extends API {
  /**
   */
  public constructor() {
    super(process.env.NEXT_PUBLIC_API_URL || '');
  }

  public getHomeInfo = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.freedom.home,
      headers: HEADERS,
      params,
    });

  public getFreedomDetails = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.freedom.details,
      headers: HEADERS,
      params,
    });

}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new FreedomService();
