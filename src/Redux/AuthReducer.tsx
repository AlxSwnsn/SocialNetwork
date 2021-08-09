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
                ...action.data,
                isAuth: true
            }


        default:
            return state
    }
}

export const setAuthUserDataAC = (id: number, login: string, email: string) => ({
    type: SET_USER_DATA,
    data: {id, login, email}
} as const)
export const getAuthUserDataTC = () => (dispatch:any) => {
    authAPI.me().then(response => {
        if (response.data.resultCode === 0) {
            let {id,login, email} = response.data.data
            dispatch (setAuthUserDataAC(id, login, email))
        }
    })
}


type  setAuthUserDataActionType = ReturnType<typeof setAuthUserDataAC>


type usersActionTypes =
    setAuthUserDataActionType