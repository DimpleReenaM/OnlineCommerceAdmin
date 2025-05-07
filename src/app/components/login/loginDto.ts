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
  