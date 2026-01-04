import { axiosClient } from "@/features/shared/utils/axiosClient";
import type { UserDto, UserLoginRequest, UserLoginResponse, UserRegisterRequest } from "../types";

export const apiAuthLogin = async (request: UserLoginRequest) => {
    const response = await axiosClient.post<UserLoginResponse>('/api/identity/auth/login', request);
    return response.data as UserLoginResponse;
}
export const apiAuthRegister = async (request: UserRegisterRequest) => {
    const response = await axiosClient.post<boolean>('/api/identity/auth/register', request);
    return response.data as boolean;
}
export const apiAuthGetLoginUser = async () => {
    const response = await axiosClient.post<UserDto>('/api/identity/auth/getLoginUser');
    return response.data as UserDto;
}