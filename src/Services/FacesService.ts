import { HEADERS, HttpMethod, apiRoutes } from '@/utils/endpoints';
import API from './api';

class FacesService extends API {
  /**
   */
  public constructor() {
    super(process.env.NEXT_PUBLIC_API_URL || '');
  }

  public getFaceInfo = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.faces.facePage,
      headers: HEADERS,
      params,
    });

  public getFaceDetails = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.faces.face,
      headers: HEADERS,
      params,
    });

}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new FacesService();
