import {rerenderEntireTree} from "../Render";

export type ProfilePageType = {
    posts: Array<PostType>
}


export type DialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

export type PostType = {
    message: string
    like: number
    id: number
}


export type DialogType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    message: string
}


export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: {}
}

let state: RootStateType = {
    profilePage: {
        posts: [{id: 1, message: "Hi, how are you?", like: 12},
            {id: 2, message: "It's my first post.", like: 11}],

    },
    dialogsPage: {
        dialogs: [{id: 1, name: "Alex"},
            {id: 2, name: "Den"},
            {id: 3, name: "Lena"}],
        messages: [{id: 1, message: "Hi!"},
            {id: 2, message: "What's up?"},
            {id: 3, message: "Bye!"}],

    },
    sidebar: {}

}


export let addPost = (postMessage: string) => {
    let newPost: PostType = {
        id: 5,
        message: postMessage  != null ? postMessage:"----",
        like: 6

    }
    state.profilePage.posts.push(newPost)
    rerenderEntireTree(state)

}
export default state
