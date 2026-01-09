import { axiosClient } from "@/features/shared/utils/axiosClient";
import type { UserDto, UserLoginRequest, UserLoginResponse, UserRegisterRequest } from "../types";


export const authApi = {
    login: async (request: UserLoginRequest) => {
        const response = await axiosClient.post<UserLoginResponse>('/api/identity/auth/login', request);
        return response.data as UserLoginResponse;
    },
    register: async (request: UserRegisterRequest) => {
        const response = await axiosClient.post<boolean>('/api/identity/auth/register', request);
        return response.data as boolean;
    },

    getLoginUser: async () => {
        const response = await axiosClient.post<UserDto>('/api/identity/auth/getLoginUser');
        return response.data as UserDto;
    }
}