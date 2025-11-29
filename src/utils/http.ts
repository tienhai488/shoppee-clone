import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";
import { toast } from "react-toastify";
import HttpStatusCode from "src/constants/HttpStatusCode.enum";
import { clearAccessToken, clearLS, getAccessToken, setAccessToken } from "./auth";
import path from "src/constants/path";
import { clearProfile, setProfile } from "./profile";
import config from "src/constants/config";

class Http {
  instance: AxiosInstance
  private accessToken: string

  constructor() {
    this.accessToken = getAccessToken()
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use((config) => {
      if (this.accessToken && config.headers) {
        config.headers.Authorization = this.accessToken;
      }

      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;

        if (url === path.login || url === path.register) {
          this.accessToken = response.data.data?.access_token;
          setAccessToken(this.accessToken);
          setProfile(response.data.data?.user);
        } else if (url === path.logout) {
          this.accessToken = '';
          clearAccessToken();
          clearProfile();
        }

        return response;
      }, function onRejected(error: AxiosError) {
        if (error.status == HttpStatusCode.Unauthorized) {
          clearLS();
          return;
        }

        if (error.status !== HttpStatusCode.UnprocessableEntity) {
          switch (error.status) {
            case HttpStatusCode.NotFound:
              toast.error('Request resource not found');
              break;

            default:
              toast.error(error.message);
              break;
          }
        }

        return Promise.reject(error);
      });
  }
}

const http = new Http().instance

export default http;