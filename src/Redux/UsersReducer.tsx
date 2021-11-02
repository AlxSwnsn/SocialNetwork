import {usersAPI} from "../API/API";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./ReduxStore";

export const FOLLOW = "FOLLOW"
export const UNFOLLOW = "UNFOLLOW"
export const SET_USERS = "SET_USERS"
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
export const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
export const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
export const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"

export type UserType = {
    name: string
    id: number
    uniqueUrlName: null | string
    photos: {
        small: null | string
        large: null | string
    },
    status: null | string
    followed: boolean
}

type InitialType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingProgress: Array<number>
}

let initialState: InitialType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 4,
    isFetching: true,
    followingProgress: []
}

export const UsersReducer = (state = initialState, action: usersActionTypes): InitialType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    } else {
                        return u
                    }
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    } else {
                        return u
                    }
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }

        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingProgress: action.value
                    ? [...state.followingProgress, action.userID]
                    : state.followingProgress.filter(id => id != action.userID)
            }

        default:
            return state
    }
}

export const followSuccess = (userID: number) => ({type: FOLLOW, userID} as const)
export const unfollowSuccess = (userID: number) => ({type: UNFOLLOW, userID} as const)
export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users} as const)
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const setTotalUsersCount = (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)
export const toggleIsFollowingProgress = (value: boolean, userID: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    value, userID
} as const)

export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))
        const response = await (usersAPI.getUsers(page, pageSize))
        dispatch(setUsers(response.items))
        dispatch(setTotalUsersCount(response.totalCount))
        dispatch(toggleIsFetching(false))
    }
}
export const follow = (userId: number) => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, usersActionTypes>) => {
        let apiMethod=usersAPI.follow.bind(userId)
        dispatch(toggleIsFollowingProgress(true, userId))
        const response = await apiMethod(userId)
        if (response.data.resultCode === 0) {
            dispatch(followSuccess(userId))
        }
        dispatch(toggleIsFollowingProgress(false, userId))
    }
}
export const unfollow = (userId: number) => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, usersActionTypes>) => {
        let apiMethod=usersAPI.unfollow.bind(userId)
        dispatch(toggleIsFollowingProgress(true, userId))
        const response = await apiMethod(userId)
        if (response.data.resultCode === 0) {
            dispatch(unfollowSuccess(userId))
        }
        dispatch(toggleIsFollowingProgress(false, userId))
    }
}

type  followActionType = ReturnType<typeof followSuccess>
type  unfollowActionType = ReturnType<typeof unfollowSuccess>
type  setUsersActionType = ReturnType<typeof setUsers>
type setCurrentPageActionType = ReturnType<typeof setCurrentPage>
type setTotalUsersCountActionType = ReturnType<typeof setTotalUsersCount>
type toggleIsFetchingActionType = ReturnType<typeof toggleIsFetching>
type toggleIsFollowingProgressActionType = ReturnType<typeof toggleIsFollowingProgress>


type usersActionTypes =
    followActionType
    | unfollowActionType
    | setUsersActionType
    | setCurrentPageActionType
    | setTotalUsersCountActionType
    | toggleIsFetchingActionType
    | toggleIsFollowingProgressActionType