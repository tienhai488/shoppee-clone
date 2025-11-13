export const setAccessToken = (token: string) => {
  localStorage.setItem('access_token', token);
}

export const clearAccessToken = () => {
  localStorage.removeItem('access_token');
}

export const getAccessToken = (): string => {
  return localStorage.getItem('access_token') || '';
}