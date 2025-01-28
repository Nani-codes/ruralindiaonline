import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
import { err, ok, Result } from "neverthrow";

abstract class API {
  protected readonly instance: AxiosInstance;
  private token: string | undefined | null;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this.initializeResponseInterceptor();
    this.initializeRequestInterceptor();
  }

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  };

  private getUserToken = async () => null;

  protected initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this.handleRequest as any);
  };

  protected handleRequest = async (config: AxiosRequestConfig) => {
    this.token = await this.getUserToken();
    if (!config.headers) {
      config.headers = {} as AxiosRequestHeaders;
    }
    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    return config;
  };

  private handleResponse = (response: AxiosResponse) => {
    const { data } = response;

    if (
      data.status === 200 ||
      data.status === undefined ||
      data?.status === "OK" ||
      data?.status === "ZERO_RESULTS"
    ) {
      return data;
    } else {
      throw new ApiError(
        data?.message ?? "Something went wrong!",
        data?.status || response.status
      );
    }
  };

  protected handleError = ({ response }: AxiosError<any, any>) => {
    throw new ApiError(
      response?.data?.message ?? "Something went wrong!",
      response?.status
    );
  };

  protected call = async <T = any>(options: {
    url: string;
    method: "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
    headers?: any;
    data?: any;
    params?: any;
  }): Promise<Result<T, ApiError>> => {
    try {
      const data = await this.instance(options);
      return ok(data as any);
    } catch (e) {
      return err(e as ApiError);
    }
  };
}

export default API;

export class ApiError {
  message: string;

  status?: number;

  constructor(message: string, status?: number) {
    this.message = message;
    this.status = status;
  }
}
