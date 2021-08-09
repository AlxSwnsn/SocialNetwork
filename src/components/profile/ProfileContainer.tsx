import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfileTC, getUserStatusTC, ProfileInfoType, updateUserStatusTC} from "../../Redux/ProfileReducer";
import {AppStateType} from "../../Redux/ReduxStore";
import {withRouter, RouteComponentProps} from "react-router-dom"
import {compose} from "redux";

type MapStateToPropsType = {
    profile: ProfileInfoType | null
    status: string
}

export type MapStateToPropsRedirectType = {
    isAuth: boolean
}

export type MapDispatchToPropsType = {
    getUserProfileTC: (userId: number | string) => void
    getUserStatusTC: (userId: number|string) => void
    updateUserStatusTC: (status: string) => void
}

type PathParamsType = {
    userId: string
}


export type ProfilePropsType =
    RouteComponentProps<PathParamsType>
    & MapDispatchToPropsType
    & MapStateToPropsType
    & MapStateToPropsRedirectType

class ProfileContainer extends React.Component<ProfilePropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = String(16033)
        }
        this.props.getUserProfileTC(userId)
        this.props.getUserStatusTC(userId)
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateUserStatusTC}/>
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.Profile.profile,
    status: state.Profile.status,
});


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfileTC, getUserStatusTC, updateUserStatusTC} ),
    withRouter,
    // withAuthRedirect
)(ProfileContainer)



