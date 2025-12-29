export type UserLoginRequest = {
    userAccount: string;
    userPassword: string;
}
export type UserLoginResponse = {
    user: UserDto;
    token: string;
}
export type UserRegisterRequest = {
    userAccount: string;
    userPassword: string;
    confirmPassword: string;
}
export type UserDto = {
    userId: number;
    userAccount: string;
    userName: string;
    userEmail: string;
    userAvatar: string;
    userProfile: string;
    userRole: string;
}