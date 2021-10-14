import React from "react";
import {sendMessageActionCreator} from "../../Redux/DialogsReducer";
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
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessageActionCreator(newMessageBody))

        }
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs)


