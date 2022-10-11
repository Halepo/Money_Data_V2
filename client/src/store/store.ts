import { createStore, applyMiddleware, Store } from "redux"
import thunk from "redux-thunk"

import { JWTReducer } from "./reducer"
import { DispatchType, IState, JWTAction } from "../interface/authTypes"

export const store: Store<IState, JWTAction> & {
    dispatch: DispatchType
} = createStore(JWTReducer, applyMiddleware(thunk))