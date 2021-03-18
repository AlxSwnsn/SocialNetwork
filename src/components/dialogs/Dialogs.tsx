import React from "react";
import classes from './Dialogs.module.css'
import DialogItem from "./dialogitem/DialogItem";
import Message from "./message/Message";
import {DialogsPageType} from "../../Redux/State";
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../Redux/DialogsReducer";

type PropsType={
    dialogsPage: DialogsPageType
    dispatch: (action: any)=> void
}
const Dialogs = (props: PropsType) => {



    // @ts-ignore
    let dialogsElements = props.dialogsPage.dialogs
        .map((dialog) => <DialogItem name={dialog.name} id={dialog.id}/>);


    let messagesElements = props.dialogsPage.messages
        .map((message) => <Message message={message.message} id={message.id}/>)

    let newMessageBody = props.dialogsPage.newMessageBody

    let onNewMessageChange= (e: any)=>{
      let body= e.currentTarget.value
    props.dispatch(updateNewMessageBodyActionCreator(body))
    }

    let onSendMessageClick= ()=>{
        props.dispatch(sendMessageActionCreator())
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
                     <div><button onClick={onSendMessageClick}>Send</button></div>
                 </div>

            </div>


        </div>


    )
}

export default Dialogs