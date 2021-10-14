import React from "react";
import {addPostAC} from "../../../Redux/ProfileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/ReduxStore";
import {Dispatch} from "redux";


const mapStateToProps = (state: AppStateType   ) => {
    return {
        posts: state.Profile.posts,
        newPostText: state.Profile.newPostText
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostAC(newPostText))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)


export default MyPostsContainer;


    

