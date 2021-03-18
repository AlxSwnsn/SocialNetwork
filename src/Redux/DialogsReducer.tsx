import React from "react";
import {ActionPropsType, DialogsPageType} from "./State";

export const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW_MESSAGE_BODY"

export const SEND_MESSAGE = "SEND-MESSAGE"

export const DialogsReducer = (state: DialogsPageType, action: ActionPropsType) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body
            break
        case SEND_MESSAGE:
            let body = state.newMessageBody
            state.newMessageBody = ""
            state.messages.push({id: 6, message: body})
            break
    }

    return state
}

export const updateNewMessageBodyActionCreator = (text: string) => ({type: UPDATE_NEW_MESSAGE_BODY, body: text})

export const sendMessageActionCreator = () => ({type: SEND_MESSAGE})