import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";
import { toast } from "react-toastify";
import HttpStatusCode from "src/constants/HttpStatusCode.enum";

class Http {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.response.use(function onFulfilled(response) {
      return response;
    }, function onRejected(error: AxiosError) {
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