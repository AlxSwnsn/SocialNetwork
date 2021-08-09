import React from "react";
import {addPostAC, updateNewPostTextAC} from "../../../Redux/ProfileReducer";
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
            let action = updateNewPostTextAC(text);
            dispatch(action)
        },

        addPost: () => {
            dispatch(addPostAC())
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)


export default MyPostsContainer;


    

