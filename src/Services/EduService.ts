import { HEADERS, HttpMethod, apiRoutes } from '@/utils/endpoints';
import API from './api';

class EduService extends API {
  /**
   */
  public constructor() {
    super(process.env.NEXT_PUBLIC_API_URL || '');
  }

  public getEducation = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.edu,
      headers: HEADERS,
      params,
    });

  public contactEducation = (data: any) =>
    this.call({
      method: HttpMethod.Post,
      url: apiRoutes.eduForm,
      headers: HEADERS,
      data,
    });

}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new EduService();
