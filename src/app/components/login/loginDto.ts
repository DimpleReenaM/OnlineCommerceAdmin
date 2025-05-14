export interface LoginResponse {
    message: string;
    isSuccessed: boolean;
    data: {
      accessToken: string;
      refreshToken: string;
      userData: {
        userId: number;
        userName: string;
        email: string;
        role: string;
        address: string;
      };
    };
  }

  export interface LoginReq{
    email:string,
    password:string
}
export interface ResponseDto<T> {
    message: string;
    isSuccessed: boolean;
    data: T| null;
}

export interface UserDto {
    userId: number;
    userName: string;
    email: string;
    role: string;
    address: string;
}

export interface LoginResData{
    accessToken:string
    refreshToken:string
    userData:UserDto
}
  