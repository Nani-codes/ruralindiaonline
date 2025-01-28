import { HEADERS, HttpMethod, apiRoutes } from "@/utils/endpoints";
import API from "./api";

class ArticleService extends API {
  /**
   */
  public constructor() {
    super(process.env.NEXT_PUBLIC_API_URL || "");
  }

  public getArticleBySlug = (slug: string) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.article.get(slug),
      headers: HEADERS,
    });

  public getRelatedArticles = (catId: number, postId: number) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.article.related(catId, postId),
      headers: HEADERS,
    });

  public getLastestPosts = (locale: string) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.article.latest(locale),
      headers: HEADERS,
    });

  public getAllArticles = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.article.list,
      headers: HEADERS,
      params,
    });

  public getSearch = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.search,
      headers: HEADERS,
      params,
    });
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new ArticleService();
