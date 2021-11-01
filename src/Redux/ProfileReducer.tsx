import {PostType} from "./Store";
import {profileAPI} from "../API/API";
import {Dispatch} from "redux";

export const ADD_POST = "ADD-POST"
export const SET_USER_PROFILE = "SET-USER-PROFILE"
export const SET_STATUS = "SET-STATUS"

export type ProfileInfoType = {
    id?: number
    userId: number
    photos: {
        large: string
        small: string
    }
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
    profile: null | ProfileInfoType
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


        default:
            return state
    }
}

export const addPostAC = (newPostText: string) => ({type: ADD_POST, newPostText} as const)
export const setUserProfileAC = (profile: any) => ({type: SET_USER_PROFILE, profile} as const)
export const setStatusAC = (status: string) => ({type: SET_STATUS, status} as const)

export const getUserProfileTC = (userId: number) => async (dispatch: any) => {
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

type addPostActionType = ReturnType<typeof addPostAC>
type setUserProfileActionType = ReturnType<typeof setUserProfileAC>
type setStatusActionType = ReturnType<typeof setStatusAC>

type ProfileActionTypes =
    addPostActionType
    | setUserProfileActionType
    | setStatusActionType
