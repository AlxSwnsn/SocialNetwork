import React from "react";
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../Redux/DialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/ReduxStore";


let mapStateToProps = (state:AppStateType)=>{
return{
    dialogsPage: state.Dialogs
}
}

let mapDispatchToProps = (dispatch: any)=>{
return{
    updateNewMessageBody: (body: any)=>{
        dispatch(updateNewMessageBodyActionCreator(body))

    },
    sendMessage:()=>{
         dispatch(sendMessageActionCreator())

    }
}
}


const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer


