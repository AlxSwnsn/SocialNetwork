import {type} from "os";
import {authAPI} from "../API/API";

export const SET_USER_DATA = "SET_USER_DATA"

export type DataType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}


let initialState: DataType = {
    id: null,
    login: null,
    email: null,
    isAuth: false

}

export const AuthReducer = (state = initialState, action: usersActionTypes): DataType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }


        default:
            return state
    }
}

export const setAuthUserDataAC = (id: number|null, login: string|null, email: string|null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {id, login, email, isAuth}
} as const)

export const getAuthUserDataTC = () => (dispatch: any) => {
    authAPI.me().then(response => {
        if (response.data.resultCode === 0) {
            let {id, login, email, isAuth} = response.data.data
            dispatch(setAuthUserDataAC(id, login, email, true))
        }
    })
}
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: any) => {
    authAPI.login(email, password, rememberMe).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserDataTC())
        }
    })
}
export const logoutTC = (id: number, login: string, email: string, isAuth: boolean) => (dispatch: any) => {
    authAPI.logout().then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserDataAC(null, null, null, false))
        }
    })
}


type  setAuthUserDataActionType = ReturnType<typeof setAuthUserDataAC>


type usersActionTypes =
    setAuthUserDataActionType