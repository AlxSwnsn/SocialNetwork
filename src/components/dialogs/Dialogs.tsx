import React from "react";
import classes from './Dialogs.module.css'
import DialogItem from "./dialogitem/DialogItem";
import Message from "./message/Message";
import {DialogsInitialStateType} from "../../Redux/DialogsReducer";


export type PropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
    dialogsPage: DialogsInitialStateType
    isAuth: boolean

}
const Dialogs = (props: PropsType) => {


    let dialogsElements = props.dialogsPage.dialogs.map((dialog) => <DialogItem name={dialog.name} id={dialog.id}/>);


    let messagesElements = props.dialogsPage.messages
        .map((message) => <Message message={message.message} id={message.id}/>)

    let newMessageBody = props.dialogsPage.newMessageBody

    let onNewMessageChange = (e: any) => {
        let body = e.currentTarget.value
        props.updateNewMessageBody(body)
    }

    let onSendMessageClick = () => {
        props.sendMessage()
    }



    return (

        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {dialogsElements}
            </div>

            <div className={classes.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea
                        onChange={onNewMessageChange}
                        value={newMessageBody}
                        placeholder={"Enter a message"}></textarea></div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>

            </div>


        </div>


    )
}

export default Dialogs