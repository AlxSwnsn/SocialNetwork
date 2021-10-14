import React from "react";
import classes from './Dialogs.module.css'
import DialogItem from "./dialogitem/DialogItem";
import Message from "./message/Message";
import {DialogsInitialStateType} from "../../Redux/DialogsReducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";


export type PropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessage: (message: string) => void
    dialogsPage: DialogsInitialStateType
    isAuth: boolean

}

type FormDataTypes = {
    newMessageBody: string
}
const Dialogs = (props: PropsType) => {
    let dialogsElements = props.dialogsPage.dialogs.map((dialog) => <DialogItem name={dialog.name} id={dialog.id}/>);
    let messagesElements = props.dialogsPage.messages
        .map((message) => <Message message={message.message} id={message.id}/>)

    const addNewMessage = (message: FormDataTypes) => {
        props.sendMessage(message.newMessageBody)
    }

    return (

        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>{messagesElements}</div>
                <AddMessageReduxForm onSubmit={addNewMessage}/>
            </div>
        </div>


    )
}
export const maxLength100 = maxLengthCreator(100)
const AddMessageForm: React.FC<InjectedFormProps<FormDataTypes>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       validate={[required, maxLength100]}
                       name={"newMessageBody"}
                       placeholder={"Enter a message"}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
const AddMessageReduxForm = reduxForm<FormDataTypes>({
    form: "Send"
})(AddMessageForm)

export default Dialogs