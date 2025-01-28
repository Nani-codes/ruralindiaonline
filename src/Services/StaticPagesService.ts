import { HEADERS, HttpMethod, apiRoutes } from '@/utils/endpoints';
import API from './api';

class StaticPages extends API {
  /**
   */
  public constructor() {
    super(process.env.NEXT_PUBLIC_API_URL || '');
  }

  public getGrienance = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.grievance,
      headers: HEADERS,
      params,
    });
  public getStoryOfPari = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.storyOfPari,
      headers: HEADERS,
      params,
    });
  public getTermsOfService = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.termsOfService,
      headers: HEADERS,
      params,
    });
  public getPsainath = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.pSaninath,
      headers: HEADERS,
      params,
    });
  public getInTouch = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.getInTouch,
      headers: HEADERS,
      params,
    });
  public getCopyright = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.copyRight,
      headers: HEADERS,
      params,
    });
  public getAcknowledgment = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.acknowledgment,
      headers: HEADERS,
      params,
    });
  public getContribute = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.contribute,
      headers: HEADERS,
      params,
    });
  public getGuidelines = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.guidelines,
      headers: HEADERS,
      params,
    });
  public getTestimonials = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.testimonialContent,
      headers: HEADERS,
      params,
    });
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new StaticPages();
