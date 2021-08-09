import {PostType} from "./Store";
import {profileAPI} from "../API/API";
import {Dispatch} from "redux";

export const ADD_POST = "ADD-POST"
export const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
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
                message: state.newPostText,
                like: 6
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: " "
            }
        }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
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

export const addPostAC = () => ({type: ADD_POST} as const)
export const updateNewPostTextAC = (newText: any) => ({type: UPDATE_NEW_POST_TEXT, newText} as const)
export const setUserProfileAC = (profile: any) => ({type: SET_USER_PROFILE, profile} as const)
export const setStatusAC = (status: string) => ({type: SET_STATUS, status} as const)
export const getUserProfileTC = (userId: number) => (dispatch: any) => {

    profileAPI.getProfile(userId).then(response => {
        dispatch(setUserProfileAC(response.data))
    })
}
export const getUserStatusTC = (userId: number | string) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatusAC(response.data))
    })
}
export const updateUserStatusTC = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setStatusAC(status))
        }
    })
}

type addPostActionType = ReturnType<typeof addPostAC>
type updateNewPostTextActionType = ReturnType<typeof updateNewPostTextAC>
type setUserProfileActionType = ReturnType<typeof setUserProfileAC>
type setStatusActionType = ReturnType<typeof setStatusAC>

type ProfileActionTypes =
    addPostActionType
    | updateNewPostTextActionType
    | setUserProfileActionType
    | setStatusActionType
