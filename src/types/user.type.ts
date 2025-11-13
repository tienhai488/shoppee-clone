type Role = "User" | "Admin";

export interface User {
  _id: string
  roles: Role[],
  email: string,
  createdAt: string,
  updatedAt: string,
  __v: number,
  avatar?: string,
  name: string,
  date_of_birth?: string,
  address?: string,
  phone?: string
}