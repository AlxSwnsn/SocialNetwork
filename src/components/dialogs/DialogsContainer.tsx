import React from "react";
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../Redux/DialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/ReduxStore";
import {withAuthRedirect} from "../../HOC/AuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.Dialogs,
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        updateNewMessageBody: (body: any) => {
            dispatch(updateNewMessageBodyActionCreator(body))

        },
        sendMessage: () => {
            dispatch(sendMessageActionCreator())

        }
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs)


