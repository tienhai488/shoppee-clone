import axios, { AxiosError } from "axios";
import HttpStatusCode from "src/constants/HttpStatusCode.enum";

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError<T>(error)
}

export function isAxiosUnprocessableEntityError<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError<T>(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(currency: number) {
  return Intl.NumberFormat('de-DE').format(currency);
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value).replace('.', ',').toLocaleLowerCase();
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<T[P]>;
}

export const rateSale = (originalPrice: number, salePrice: number): string => {
  return Math.round((1 - salePrice / originalPrice) * 100) + '%';
}