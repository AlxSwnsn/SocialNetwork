import {DialogType, MessageType} from "./Store";

export const SEND_MESSAGE = "SEND-MESSAGE"

let initialState = {
    dialogs: [{id: 1, name: "Alex"},
        {id: 2, name: "Den"},
        {id: 3, name: "Lena"}] as Array<DialogType>,
    messages: [{id: 1, message: "Hi!"},
        {id: 2, message: "What's up?"},
        {id: 3, message: "Bye!"}] as Array<MessageType>,
}

export type DialogsInitialStateType = typeof initialState


export const DialogsReducer = (state: DialogsInitialStateType = initialState, action: DialogsActionTypes): DialogsInitialStateType => {


    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state
    }
}

export const sendMessageActionCreator = (newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody} as const)

type SendMessageActionType = ReturnType<typeof sendMessageActionCreator>

type DialogsActionTypes = SendMessageActionType