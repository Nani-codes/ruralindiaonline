import { HEADERS, HttpMethod, apiRoutes } from "@/utils/endpoints";
import API from "./api";

class ArchiveService extends API {
  /**
   */
  public constructor() {
    super(process.env.NEXT_PUBLIC_API_URL || "");
  }

  public getArchive = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.library,
      headers: HEADERS,
      params,
    });

  public getLibraryBanner = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.libraryBanner,
      headers: HEADERS,
      params,
    });

  public getRooms = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.rooms,
      headers: HEADERS,
      params,
    });
  public getTypes = (params: any) =>
    this.call({
      method: HttpMethod.Get,
      url: apiRoutes.type,
      headers: HEADERS,
      params,
    });
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new ArchiveService();
