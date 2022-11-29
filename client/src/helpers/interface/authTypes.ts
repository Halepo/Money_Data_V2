export interface ICachedJWT {
  accessToken: string;
  fullName: string;
  userId: string;
  refreshToken: string;
  expiresAt: string;
  refreshAt: string;
}
export interface IState {
  loggedIn: boolean;
  userInfo?: ICachedJWT | Object;
}
export interface ICachedJWTEmpty {
  accessToken?: string;
  fullName?: string;
  userId?: string;
  refreshToken?: string;
  expiresAt?: string;
  refreshAt?: string;
}

export interface IDecodedJWT {
  email: string;
  exp: Date;
  iat: Date;
  userName: string;
  user_id: string;
}

export type JWTAction = {
  type: string;
  JWT?: ICachedJWT;
};
export interface IFormError {
  error: Object;
}
export type DispatchType = (args: JWTAction) => JWTAction;
