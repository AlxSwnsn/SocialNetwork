import React from "react";
import {connect} from "react-redux";
import {
    follow, getUsers,
    setCurrentPage,
    toggleIsFollowingProgress,
    unfollow,
    UserType
} from "../../Redux/UsersReducer";
import {AppStateType} from "../../Redux/ReduxStore";
import {Users} from "./Users";
import Preloader from "../common/preloader/Preloader";
import {withAuthRedirect} from "../../HOC/AuthRedirect";
import {compose} from "redux";


type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    isFetching: boolean
    followingProgress: Array<number>
}
type MapDispatchToPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setCurrentPage: (pageNumber: number) => void
    toggleIsFollowingProgress: (value: boolean, userID: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}
export type PropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    isFetching: boolean
    followingProgress: Array<number>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setCurrentPage: (pageNumber: number) => void
    toggleIsFollowingProgress: (value: boolean, userID: number) => void
    getUsers: (currentPage: number, pageSize: number) => void

}

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)

    }


    render() {
        return <>
            {this.props.isFetching ?
                <Preloader/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingProgress={this.props.followingProgress}

            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    users: state.Users.users,
    pageSize: state.Users.pageSize,
    totalUsersCount: state.Users.totalUsersCount,
    currentPage: state.Users.currentPage,
    onPageChanged: function () {
    },
    isFetching: state.Users.isFetching,
    followingProgress: state.Users.followingProgress
})

export default compose<React.ComponentType>(
    withAuthRedirect,
connect(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        toggleIsFollowingProgress,
        getUsers
    }))(UsersContainer)