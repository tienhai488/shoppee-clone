import type { User } from "src/types/user.type"

export const setProfile = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile));
}

export const getProfile = (): User | null => {
  const profile = localStorage.getItem('profile');
  return profile ? JSON.parse(profile) as User : null;
}

export const clearProfile = () => {
  localStorage.removeItem('profile');
}