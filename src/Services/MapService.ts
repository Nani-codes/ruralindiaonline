import { HEADERS, HttpMethod, mapRoutes } from '@/utils/endpoints';
import API from './api';

class Map extends API {
  /**
   */
  public constructor() {
    super(process.env.NEXT_PUBLIC_GOOGLE_API || '');
  }

  public getAddress = (keyword: string) =>
    this.call({
      method: HttpMethod.Get,
      url: mapRoutes.GetGeoAddress(keyword),
      headers: HEADERS,
    });

}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new Map();
