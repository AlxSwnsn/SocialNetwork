import React from "react";
import {AppStateType} from "./ReduxStore";

export const getAllUsers = (state: AppStateType) => {
return state.Users.users
}
export const getPageSize = (state: AppStateType) => {
return state.Users.pageSize
}
export const getTotalItemsCount = (state: AppStateType) => {
    return state.Users.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.Users.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.Users.isFetching
}
export const getFollowingProgress = (state: AppStateType) => {
    return state.Users.followingProgress
}