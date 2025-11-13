import axios, { AxiosError } from "axios";
import HttpStatusCode from "src/constants/HttpStatusCode.enum";

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError<T>(error)
}

export function isAxiosUnprocessableEntityError<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError<T>(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}