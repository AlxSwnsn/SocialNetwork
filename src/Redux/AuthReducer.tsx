import {authAPI, securityAPI} from "../API/API";
import {stopSubmit} from "redux-form";
import {Dispatch} from "redux";

export const SET_USER_DATA = "SET_USER_DATA"
export const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS"

export type DataType = {
    id: any
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string|null
}


let initialState: DataType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null

}

export const AuthReducer = (state = initialState, action: usersActionTypes): DataType => {

    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
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
export const getCaptchaUrlSuccessAC = (captchaUrl: string|null) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
} as const)

export const getAuthUserDataTC = () => async (dispatch: Dispatch) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setAuthUserDataAC(id, login, email, true))
    }
}
export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string|null) => async (dispatch: any) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataTC())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrlTC())
        }
        dispatch(stopSubmit("Login", {_error: "Email or password is incorrect"}))
    }
}
export const logoutTC = () => async (dispatch: Dispatch) => {
    const response = await (authAPI.logout())
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false))

    }
}
export const getCaptchaUrlTC = () => async (dispatch: Dispatch) => {
    const response = await (securityAPI.getCaptchaUrl())
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccessAC(captchaUrl))


}


type  setAuthUserDataActionType = ReturnType<typeof setAuthUserDataAC>
type getCaptchaUrlSuccessActinType = ReturnType<typeof getCaptchaUrlSuccessAC>


type usersActionTypes =
    setAuthUserDataActionType|getCaptchaUrlSuccessActinType