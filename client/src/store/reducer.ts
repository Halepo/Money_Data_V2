import { ICachedJWT, ICachedJWTEmpty, IState, JWTAction } from "../interface/authTypes"
import * as actionTypes from "./actionTypes"

import AuthService from "../services/AuthService"

const initialState: IState = {
    loggedIn: false,
    userInfo: {}
}

export const JWTReducer = (
    state: IState = initialState,
    action: JWTAction
): any => {
    switch (action.type) {
        case actionTypes.SAVE_JWT:
            let JwtToSave: any = action.JWT
            AuthService.saveCachedJwt(JwtToSave)
            const userInfo: ICachedJWT | ICachedJWTEmpty = JwtToSave;
            return { loggedIn: true, userInfo: userInfo };

        case actionTypes.CHECK_LOGGED_IN:
            const status = AuthService.checkCachedJwtStatus()
            const cachedJWT = AuthService.getCachedJwt()
            // console.log('cachedJWT', cachedJWT)
            // console.log('JWT Status', status)
            if (status === 'OKAY' || status === 'NEED_REFRESH') {
                return { loggedIn: true, userInfo: cachedJWT }
            }
            else {
                return { loggedIn: false, userInfo: {} };
            }

        case actionTypes.REMOVE_JWT:
            AuthService.handleLogOut()
            return { loggedIn: false, userInfo: {} }

        default: return state;
    }
}