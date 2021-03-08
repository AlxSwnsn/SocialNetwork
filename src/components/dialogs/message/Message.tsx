import React from "react";
import classes from './../Dialogs.module.css'

type messageProps = {
    message: string
    id: number
}
const Message = (props: messageProps) => {
    return (
        <div className={classes.dialog}>{props.message}</div>
    )
}


export default Message