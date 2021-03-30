import {PostType} from "./Store";

export const ADD_POST = "ADD-POST"

export const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"

let initialState = {
    posts: [{id: 1, message: "Hi, how are you?", like: 12},
        {id: 2, message: "It's my first post.", like: 11}],
    newPostText: " "

}

export const ProfileReducer = (state: any = initialState, action: ProfileActionTypes) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost: PostType = {
                id: 5,
                message: state.newPostText,
                like: 6
            }
            return  {
                ...state,
                posts: [...state.posts,newPost],
                newPostText: " "
            }
        }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        default:
            return state
    }
}

export const addPostActionCreator = () => ({type: ADD_POST} as const)
export const updateNewPostTextActionCreator = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newText: text} as const)



type  addPostActionType = ReturnType<typeof addPostActionCreator>
type updateNewPostTextActionType = ReturnType<typeof updateNewPostTextActionCreator>

type ProfileActionTypes = addPostActionType | updateNewPostTextActionType