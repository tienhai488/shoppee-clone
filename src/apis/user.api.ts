import type { User } from 'src/types/user.type';
import type { SuccessResponse } from "src/types/utils.type";
import http from "src/utils/http";

interface UpdateProfileBody extends Pick<User, 'name' | 'phone' | 'address' | 'date_of_birth' | 'avatar'> {
  password?: string;
  new_password?: string;
}

const userApi = {
  profile: () => {
    return http.get<SuccessResponse<User>>('/me');
  },
  updateProfile: (body: UpdateProfileBody) => {
    return http.put<SuccessResponse<User>>('/user', body);
  },
  updateAvatar: (body: FormData) => {
    return http.post<SuccessResponse<string>>('/user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}

export default userApi;