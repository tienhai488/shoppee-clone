export const setAccessToken = (token: string) => {
  localStorage.setItem('access_token', token);
}

export const clearAccessToken = () => {
  localStorage.removeItem('access_token');
}

export const getAccessToken = (): string => {
  return localStorage.getItem('access_token') || '';
}

export const LocalStorageEventTarget = new EventTarget();

export const clearLS = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('profile');

  const clearLSEvent = new Event('clearLS');
  LocalStorageEventTarget.dispatchEvent(clearLSEvent);
}