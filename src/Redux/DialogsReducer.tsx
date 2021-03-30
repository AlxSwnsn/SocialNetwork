import {DialogType, MessageType} from "./Store";

export const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW_MESSAGE_BODY"

export const SEND_MESSAGE = "SEND-MESSAGE"

let initialState = {
    dialogs: [{id: 1, name: "Alex"},
        {id: 2, name: "Den"},
        {id: 3, name: "Lena"}] as Array<DialogType>,
    messages: [{id: 1, message: "Hi!"},
        {id: 2, message: "What's up?"},
        {id: 3, message: "Bye!"}] as Array<MessageType>,
    newMessageBody: ""
}

export type DialogsInitialStateType = typeof initialState


export const DialogsReducer = (state: DialogsInitialStateType = initialState, action: DialogsActionTypes): DialogsInitialStateType => {


    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            }

        case SEND_MESSAGE:
            let body = state.newMessageBody
            return {
                ...state,
                newMessageBody: "",
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state
    }
}

export const updateNewMessageBodyActionCreator = (text: string) => ({
    type: UPDATE_NEW_MESSAGE_BODY,
    body: text
} as const)
export const sendMessageActionCreator = () => ({type: SEND_MESSAGE} as const)

type UpdateNewMessageBodyActionType = ReturnType<typeof updateNewMessageBodyActionCreator>
type SendMessageActionType = ReturnType<typeof sendMessageActionCreator>

type DialogsActionTypes = UpdateNewMessageBodyActionType | SendMessageActionType