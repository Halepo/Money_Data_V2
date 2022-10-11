export interface ICachedJWT {
    accesstoken: string;
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
export interface ICachedJWTEmpty { }

export type JWTAction = {
    type: string
    JWT?: ICachedJWT
}
export interface IFormError {
    error: Object
}
export type DispatchType = (args: JWTAction) => JWTAction