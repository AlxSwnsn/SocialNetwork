import React from "react";
import {ActionPropsType, PostType, ProfilePageType} from "./Store";

export const ADD_POST = "ADD-POST"

export const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"

let initialState = {
        posts: [{id: 1, message: "Hi, how are you?", like: 12},
            {id: 2, message: "It's my first post.", like: 11}],
        newPostText: " "

    }

export const ProfileReducer = (state: ProfilePageType=initialState, action: ActionPropsType) => {

    switch (action.type)  {
        case ADD_POST:
            let newPost: PostType = {
                id: 5,
                message: state.newPostText,
                like: 6
            }
            state.posts.push(newPost)
            state.newPostText = " "
            break

        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText
            break
    }

    return state
}

export const addPostActionCreator = () => ({type: ADD_POST})

export const updateNewPostTextActionCreator = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newText: text})
