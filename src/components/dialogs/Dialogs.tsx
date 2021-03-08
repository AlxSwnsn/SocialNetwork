import React from "react";
import classes from './Dialogs.module.css'
import DialogItem from "./dialogitem/DialogItem";
import Message from "./message/Message";
import {DialogsPageType} from "../../Redux/State";


const Dialogs = (props: DialogsPageType) => {


    let dialogsElements = props.dialogs
        .map((dialog) => <DialogItem name={dialog.name} id={dialog.id}/>);


    let messagesElements = props.messages
        .map((message) => <Message message={message.message} id={message.id}/>)
    return (

        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {dialogsElements}
            </div>

            <div className={classes.messages}>
                {messagesElements}

            </div>


        </div>


    )
}

export default Dialogs