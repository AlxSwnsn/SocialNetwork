import {PostType, RootStateType, StoreType} from "./Store";
import {profileAPI} from "../API/API";
import {Dispatch} from "redux";
import {AppStateType} from "./ReduxStore";

export const ADD_POST = "ADD-POST"
export const SET_USER_PROFILE = "SET-USER-PROFILE"
export const SET_STATUS = "SET-STATUS"
export const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS"

export type ProfileInfoType = {
    id?: number
    userId?: number
    fullName?: string
    photos: {
        large: string
        small: string
    }
    lookingForAJob?: boolean
    aboutMe?: string
    lookingForAJobDescription?: string
    contacts?: any | null
}

export type  ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
    profile: ProfileInfoType | null
    status: string
}
let initialState: ProfilePageType = {
    posts: [{id: 1, message: "Hi, how are you?", like: 12},
        {id: 2, message: "It's my first post.", like: 11}],
    newPostText: " ",
    profile: null,
    status: ""
}

export const ProfileReducer = (state: ProfilePageType = initialState, action: ProfileActionTypes): ProfilePageType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost: PostType = {
                id: 5,
                message: action.newPostText,
                like: 6
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: " "
            }
        }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }

        default:
            return state
    }
}

export const addPostAC = (newPostText: string) => ({type: ADD_POST, newPostText} as const)
export const setUserProfileAC = (profile: any) => ({type: SET_USER_PROFILE, profile} as const)
export const setStatusAC = (status: string) => ({type: SET_STATUS, status} as const)
export const savePhotoSuccessAC = (photos: { large: string; small: string }) => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
} as const)

export const getUserProfileTC = (userId: number) => async (dispatch: Dispatch) => {
    const response = await (profileAPI.getProfile(userId))
    dispatch(setUserProfileAC(response.data))

}
export const getUserStatusTC = (userId: number | string) => async (dispatch: Dispatch) => {
    const response = await (profileAPI.getStatus(userId))
    dispatch(setStatusAC(response.data))

}
export const updateUserStatusTC = (status: string) => async (dispatch: Dispatch) => {
    const response = await (profileAPI.updateStatus(status))
    if (response.data.resultCode === 0) {
        dispatch(setStatusAC(status))
    }
}
export const savePhotoTC = (file: File) => async (dispatch: Dispatch) => {
    const response = await (profileAPI.savePhoto(file))
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccessAC(response.data.data.photos))
    }
    else {

    }
}

export const saveProfileTC = (profile: ProfileInfoType) => async (dispatch: Dispatch, getState: ()=> AppStateType) => {
    const userId = getState().Auth.id
    const response = await (profileAPI.saveProfile(profile))
    if (response.data.resultCode === 0) {
        const resp = await (profileAPI.getProfile(userId))
        dispatch(setUserProfileAC(resp.data))

    }
}

type addPostActionType = ReturnType<typeof addPostAC>
type setUserProfileActionType = ReturnType<typeof setUserProfileAC>
type setStatusActionType = ReturnType<typeof setStatusAC>
type savePhotoSuccessActionType = ReturnType<typeof savePhotoSuccessAC>

type ProfileActionTypes =
    addPostActionType
    | setUserProfileActionType
    | setStatusActionType
    | savePhotoSuccessActionType
