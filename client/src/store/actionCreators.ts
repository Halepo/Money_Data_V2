import { ICachedJWT, JWTAction } from "../interface/authTypes"
import * as actionTypes from "./actionTypes"
import { store } from "./store"

export function saveJWT(JWT: ICachedJWT) {
    const action: JWTAction = {
        type: actionTypes.SAVE_JWT,
        JWT,
    }
    return dispatcher(action)
}

export function removeCachedJWT() {
    const action: JWTAction = {
        type: actionTypes.REMOVE_JWT
    }
    return dispatcher(action)
}

export function checkCachedJwtStatus() {
    const action: JWTAction = {
        type: actionTypes.CHECK_LOGGED_IN
    }
    return dispatcher(action)
}

function dispatcher(action: JWTAction) {
    console.log(`Dispatching ${action.type}...`)
    return store.dispatch(action)
}