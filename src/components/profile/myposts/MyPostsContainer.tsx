import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../Redux/ProfileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/ReduxStore";


const mapStateToProps = (state: AppStateType   ) => {
    return {
        posts: state.Profile.posts,
        newPostText: state.Profile.newPostText
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        updateNewPostText: (text: any) => {
            let action = updateNewPostTextActionCreator(text);
            dispatch(action)
        },

        addPost: () => {
            dispatch(addPostActionCreator())
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)


export default MyPostsContainer;


    

