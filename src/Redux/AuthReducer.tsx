import {authAPI} from "../API/API";
import {stopSubmit} from "redux-form";

export const SET_USER_DATA = "SET_USER_DATA"

export type DataType = {
    id: any
    email: string | null
    login: string | null
    isAuth: boolean
}


let initialState: DataType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,

}

export const AuthReducer = (state = initialState, action: usersActionTypes): DataType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }


        default:
            return state
    }
}

export const setAuthUserDataAC = (id: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {id, login, email, isAuth}
} as const)

export const getAuthUserDataTC = () => async (dispatch: any) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setAuthUserDataAC(id, login, email, true))
    }
}
export const loginTC = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    const response = await authAPI.login(email, password, rememberMe)

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataTC())
    } else {
        dispatch(stopSubmit("Login", {_error: "Email or password is incorrect"}))
    }
}
export const logoutTC = () => async (dispatch: any) => {
    const response = await (authAPI.logout())
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false))

    }
}


type  setAuthUserDataActionType = ReturnType<typeof setAuthUserDataAC>


type usersActionTypes =
    setAuthUserDataActionType