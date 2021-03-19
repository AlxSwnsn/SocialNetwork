import {ProfileReducer} from "./ProfileReducer";
import {DialogsReducer} from "./DialogsReducer";
import {SidebarReducer} from "./SidebarReducer";
import {CombinedState} from "redux";

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string

}

export type DialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody: string

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

export type ActionPropsType = {
    type: string
    newText: string
    body: string
}

export type StoreType = {
    _state: RootStateType
    _callSubscriber: (state: RootStateType) => void
    getState: () => RootStateType
    subscribe: (observer: (state: RootStateType) => void) => void
    dispatch: (action: ActionPropsType) => void
}


let store: StoreType = {
    _state: {
        profilePage: {
            posts: [{id: 1, message: "Hi, how are you?", like: 12},
                {id: 2, message: "It's my first post.", like: 11}],
            newPostText: " "

        },
        dialogsPage: {
            dialogs: [{id: 1, name: "Alex"},
                {id: 2, name: "Den"},
                {id: 3, name: "Lena"}],
            messages: [{id: 1, message: "Hi!"},
                {id: 2, message: "What's up?"},
                {id: 3, message: "Bye!"}],
            newMessageBody: ""

        },
        sidebar: {}

    },
    _callSubscriber() {
    },

    getState() {
        return this._state
    },
    subscribe(observer: (state: RootStateType) => void) {
        this._callSubscriber = observer
    },


    dispatch(action: ActionPropsType) {

        this._state.profilePage = ProfileReducer(this._state.profilePage, action)
        this._state.dialogsPage = DialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = SidebarReducer(this._state.sidebar, action)
        this._callSubscriber(this._state)

    }
}




export default store
